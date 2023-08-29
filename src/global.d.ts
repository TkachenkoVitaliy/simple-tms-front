declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react'

  // eslint-disable-next-line no-unused-vars
  const SVG: (props: SVGProps<SVGElement>) => ReactElement
  export default SVG

  // const content: React.ElementType<React.ComponentPropsWithRef<'svg'>>;
  // export default content;

  // import React from 'react'
  // const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  // export default SVG
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

declare const __IS_DEV__: boolean
