import {createOrmConfig} from "@subsquid/typeorm-config"
import {assertNotNull} from "@subsquid/util-internal"
import assert from "assert"
import {Connection, createConnection} from "typeorm"
import {Store} from "./store"
import {createTransaction, Tx} from "./tx"


export type IsolationLevel = 'SERIALIZABLE' | 'READ COMMITTED' | 'REPEATABLE READ'


export interface TypeormDatabaseOptions {
    isolationLevel?: IsolationLevel
}


export class TypeormDatabase {
    private statusSchema: string
    private isolationLevel: IsolationLevel
    private con?: Connection
    private lastCommitted = -1

    constructor(name: string, options?: TypeormDatabaseOptions) {
        assert(/^[a-z][a-z0-9_]*$/.test(name), `name '${name}' is invalid`)
        this.statusSchema = `${name}_status`
        this.isolationLevel = options?.isolationLevel || 'SERIALIZABLE'
    }

    async connect(): Promise<number> {
        if (this.con != null) {
            throw new Error('Already connected')
        }
        let cfg = createOrmConfig()
        let con = await createConnection(cfg)
        try {
            let height = await con.transaction('SERIALIZABLE', async em => {
                await em.query(`CREATE SCHEMA IF NOT EXISTS "${this.statusSchema}"`)
                await em.query(`
                    CREATE TABLE IF NOT EXISTS "${this.statusSchema}".status (
                        id int primary key,
                        height int not null
                    )
                `)
                let status: {height: number}[] = await em.query(
                    `SELECT height FROM "${this.statusSchema}".status WHERE id = 0`
                )
                if (status.length == 0) {
                    await em.query(`INSERT INTO "${this.statusSchema}".status (id, height) VALUES (0, -1)`)
                    return -1
                } else {
                    return status[0].height
                }
            })
            this.con = con
            return height
        } catch(e: any) {
            await con.close().catch(err => {}) // ignore error
            throw e
        }
    }

    async close(): Promise<void> {
        let con = this.con
        this.con = undefined
        this.lastCommitted = -1
        if (con) {
            await con.close()
        }
    }

    async transact(height: number, cb: (store: Store) => Promise<void>): Promise<void> {
        let retries = 3
        while (true) {
            try {
                return await this.runTransaction(height, cb)
            } catch(e: any) {
                if (e.code == '40001' && retries) {
                    retries -= 1
                } else {
                    throw e
                }
            }
        }
    }

    private async runTransaction(height: number, cb: (store: Store) => Promise<void>): Promise<void> {
        let tx: Promise<Tx> | undefined
        let open = true

        let store = new Store(() => {
            assert(open, `Transaction was already closed`)
            tx = tx || this.createTx(height)
            return tx.then(tx => tx.em)
        })

        try {
            await cb(store)
        } catch(e: any) {
            open = false
            if (tx) {
                await tx.then(t => t.rollback()).catch(err => null)
            }
            throw e
        }

        open = false
        if (tx) {
            await tx.then(t => t.commit())
            this.lastCommitted = height
        }
    }

    private async createTx(height: number): Promise<Tx> {
        let con = assertNotNull(this.con, 'not connected')
        let tx = await createTransaction(con, this.isolationLevel)
        try {
            await tx.em.query(
                `UPDATE "${this.statusSchema}".status SET height = $1 WHERE id = 0 AND height < $1`,
                [height]
            )
            // if (status[0].height >= height) {
            //     throw new Error(
            //         `Seems like multiple concurrent processors are running. Wanted to commit block ${height}, but block ${height} was already committed.`
            //     )
            // }
            return tx
        } catch(e: any) {
            await tx.rollback().catch(err => null)
            throw e
        }
    }

    async advance(height: number): Promise<void> {
        if (this.lastCommitted == height) return
        let tx = await this.createTx(height)
        await tx.commit()
    }
}
