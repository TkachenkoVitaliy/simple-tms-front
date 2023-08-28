type Mods = Record<string, boolean | ((...args: any[]) => boolean)>
export function classNames(cls: string, mods?: Mods, additional?: string[]): string {
    const modsParam = mods ? mods : {}
    const additionalParam = additional ? additional : []

    return [
        cls,
        ...Object.entries(modsParam)
            .filter(([, value]) => {
                if (value instanceof Function) {
                    return value()
                } else {
                    return Boolean(value)
                }
            })
            .map(([cls,_]) => cls),
        ...additionalParam,
    ].join(' ')
}