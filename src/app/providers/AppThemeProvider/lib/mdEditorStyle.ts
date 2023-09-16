import { ThemeName } from 'shared/consts/theme'

enum EditorCssVariables {
  MD_EDITOR_BACKGROUND_COLOR = '--md-editor-background-color',
  COLOR_BORDER_DEFAULT = '--color-border-default',
  COLOR_FG_DEFAULT = '--color-fg-default',
  COLOR_CANVAS_DEFAULT = '--color-canvas-default',
}

interface CssVariableThemeValues {
  dark: string
  light: string
}

const CssVarThemeValues: Record<EditorCssVariables, CssVariableThemeValues> = {
  [EditorCssVariables.MD_EDITOR_BACKGROUND_COLOR]: {
    dark: '#F2F2F2',
    light: '',
  },
  [EditorCssVariables.COLOR_BORDER_DEFAULT]: {
    dark: '#FFFFFF',
    light: '',
  },
  [EditorCssVariables.COLOR_FG_DEFAULT]: {
    dark: '',
    light: '',
  },
  [EditorCssVariables.COLOR_CANVAS_DEFAULT]: {
    dark: '',
    light: '',
  },
}

export function setMdEditorTheme(themeName: ThemeName) {
  const root = document.querySelector('#root') as HTMLElement
  root.setAttribute('data-color-mode', themeName)

  Object.entries<CssVariableThemeValues>(CssVarThemeValues).forEach((item) => {
    root.style.setProperty(item[0], item[1][themeName])
  })
}
