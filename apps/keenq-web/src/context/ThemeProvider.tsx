import { FC, ReactNode } from 'react'

import GlobalStyles from '@mui/material/GlobalStyles'
import { css,Theme as MUITheme, ThemeProvider as MUIThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material/styles'

import rawTheme from '@/ui/theme'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MUITheme {}
}

const globalStyles = css`
  :root {
    --appbar-height: 64px;
  }
  html {
    box-sizing: border-box;
    max-width: 100vw;
    min-height: 100vh;
  }
  body {
    font-family: system-ui,serif;
    color: ${rawTheme.color.base};
    background-color:#fefefe;
  }
  a {
    text-decoration: none;
  }
  .grecaptcha-badge {
    visibility: hidden;
  }
`

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    common: {
      black: rawTheme.color.base,
    },
    primary: {
      light: rawTheme.color.primaryLight,
      main: rawTheme.color.primary,
      contrastText: rawTheme.color.white,
    },
    secondary: {
      light: rawTheme.color.secondaryLight,
      main: rawTheme.color.secondary,
      contrastText: rawTheme.color.white,
    },
    text: {
      primary: rawTheme.color.base,
    },
    error: {
      light: rawTheme.color.errorLight,
      main: rawTheme.color.error,
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    h4: {
      fontWeight: 700,
      padding: '8px'
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
      lineHeight: 1
    },
    subtitle1: {
      fontWeight: 700,
      lineHeight: 1
    },
    body1: {
      lineHeight: 1.15
    },
    body2: {
      fontWeight: 300
    },
    overline: {
      lineHeight: 1,
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'
        }
      }
    }
  }
})

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MUIThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      {children}
    </MUIThemeProvider>
  )
}

export default ThemeProvider
