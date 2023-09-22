export function setResizeCssVars(element: HTMLElement) {
  const root = document.documentElement

  const { top, left } = element.getBoundingClientRect()

  root.style.setProperty('--resize-top', `${top + 1}px`)
  root.style.setProperty('--resize-left', `${left + 2}px`)
}
