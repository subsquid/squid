import {  Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import queryString from 'query-string';
import * as fetch from 'node-fetch';

import { parseNameAndVersion } from '../../utils';
import { baseUrl } from '../../rest-client/baseUrl';
import { getCreds } from '../../creds';
import { request } from '../../rest-client/request';

export enum Level {
    Error = 'ERROR',
    Debug = 'DEBUG',
    Info = 'INFO',
    Notice = 'NOTICE',
    Warning = 'WARNING',
}
type Payload = string | Record<string, unknown>

type Log = {
    timestamp: string
    level: Level
    payload: Payload
}

type LogsResponse = {
    logs: Log[];
    nextPage: string;
};

function getLevel(level: Level) {
    switch (level) {
        case Level.Debug:
            return chalk.gray(level)
        case Level.Info:
        case Level.Notice:
            return chalk.cyan(level)
        case Level.Warning:
            return chalk.yellow(level)
        case Level.Error:
            return chalk.red(level)
    }
}

function getPayload(payload: Payload ) {
    if (typeof payload === 'string') {
       return payload || ''
    }

    const { message, ...rest } = payload;
    const res = [message];
    // on empty message or additional data we log it
    if(!message || Object.keys(rest).length !== 0) {
        res.push(chalk.dim(JSON.stringify(rest)))
    }
    return res.filter(v => Boolean(v)).join(' ')
}

export default class Logs extends Command {
    static description = 'Getting logs about version';
    static args = [
        {
            name: 'nameAndVersion',
            description: 'name@version',
            required: true,
        },
    ];

    static flags = {
        follow: Flags.boolean({
            char: 'f',
            description: 'will continue streaming the new logs',
            required: false,
            default: false,
        }),
    };

    async run(): Promise<void> {
        const { flags, args } = await this.parse(Logs);
        const nameAndVersion = args.nameAndVersion;
        const { squidName, versionName } = parseNameAndVersion(
            nameAndVersion,
            this
        );
        const follow = flags.follow;

        this.log('Fetching logs...')

        if (follow) {
            const apiUrl = `${baseUrl}/client/squid/${squidName}/versions/${versionName}/logs/tail`;
            const params = queryString.stringify({

            });

            // FIXME refactor request
            // using not wrapped fetch fro better streaming (.clone in wrap breaks body stream)
            const response = await fetch.default(`${apiUrl}?${params}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `token ${getCreds()}`,
                },
            });

            response.body.on('data', (data) => {
                const dataString = data.toString();
                if (dataString.length > 0) {
                    this.prettyPrint(JSON.parse(dataString))
                }
            });
        } else {
            const apiUrl = `${baseUrl}/client/squid/${squidName}/versions/${versionName}/logs/history`;
            const params = queryString.stringify({

            });

            // FIXME refactor request
            // using not wrapped fetch fro better streaming (.clone in wrap breaks body stream)
            const response = await request(`${apiUrl}?${params}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `token ${getCreds()}`,
                },
            });

            const responseBody: LogsResponse = await response.json();
            if (responseBody.logs.length === 0) {
                this.log('No logs found');
                return;
            }

            responseBody.logs.map(l => {
                this.prettyPrint(l)
            });
        }
    }

    prettyPrint(log: Log) {
        this.log(`${chalk.dim(log.timestamp)} ${getLevel(log.level)} ${getPayload(log.payload)}`);
    }
}
