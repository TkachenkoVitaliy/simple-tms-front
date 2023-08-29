type Mods = Record<string, boolean | ((...args: any[]) => boolean)>
export function classNames(
  cls: string,
  mods?: Mods,
  additional?: string[],
): string {
  const modsParam = mods || {}
  const additionalParam = additional || []

  return [
    cls,
    ...Object.entries(modsParam)
      .filter(([, value]) => {
        if (value instanceof Function) {
          return value()
        }
        return Boolean(value)
      })
      .map(([className, _]) => className),
    ...additionalParam,
  ].join(' ')
}
