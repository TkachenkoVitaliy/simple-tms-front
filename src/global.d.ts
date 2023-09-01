declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.svg' {
  // const SVG: React.ElementType<React.ComponentPropsWithRef<'svg'>>
  // export default SVG

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
/* global */
declare const __IS_DEV__: boolean

declare const theme: {
  palette: {
    primary: {
      main: string
    }
  }
}
