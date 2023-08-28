type Mods = Record<string, boolean | (() => boolean)>
export function classNames(cls: string, mods?: Mods, additional?: string[]): string {
    return [
        cls,
        ...Object.entries(mods)
            .filter(([, value]) => {
                if (value instanceof Function) {
                    return value()
                } else {
                    return Boolean(value)
                }
            })
            .map(([cls,_]) => cls),
        ...additional,
    ].join(' ')
}