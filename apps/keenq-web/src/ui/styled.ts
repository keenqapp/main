// import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import _styled from '@emotion/styled'
// import { OverridableComponent } from '@mui/material/OverridableComponent'
// import { BottomNavigationTypeMap } from '@mui/material'


// type IntrinsicElements = EmotionJSX.IntrinsicElements & any

// TODO Fight typings
export default function styled(component: any) {
  return function ( template: TemplateStringsArray) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return _styled(component, {
      shouldForwardProp: (prop: string) => !prop.startsWith('$')
    })(template)
  }
}
