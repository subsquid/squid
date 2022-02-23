
export function unique<T>(items: Iterable<T>): T[] {
    let set = new Set(items)
    return Array.from(set)
}


export function timeInterval(seconds: number): string {
    if (seconds < 60) {
        return seconds + 's'
    }
    let minutes = Math.ceil(seconds/60)
    if (minutes < 60) {
        return  minutes+'m'
    }
    let hours = Math.floor(minutes / 60)
    minutes = minutes - hours * 60
    return hours + 'h ' + minutes + 'm'
}


export function hasProperties(obj?: object | null): boolean {
    for (let key in obj) {
        return true
    }
    return false
}
