type Mods = Record<string, boolean | string>
export function classNames(cls: string, mods?: Mods, additional?: string[]): string {
    return [
        cls,
        ...Object.entries(mods)
            .filter(([cls, value]) => Boolean(value))
            .map(([cls]) => cls),
        ...additional,
    ].join(' ')
}

const s = classNames('btn', {hovered: true, selectable: true, red: false}, ['additional']);
console.log(s);