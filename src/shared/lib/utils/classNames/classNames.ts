type Mods = Record<string, boolean | ((...args: unknown[]) => boolean)>
export function classNames(
  cls: string,
  mods?: Mods,
  additional?: (string | undefined)[],
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
