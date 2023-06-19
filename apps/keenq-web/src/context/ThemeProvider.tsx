import { ComponentChildren } from 'preact'

import GlobalStyles from '@mui/material/GlobalStyles'
import { css, Theme as MUITheme, ThemeProvider as MUIThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material/styles'

import rawTheme from '@/ui/theme'


declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface Theme extends MUITheme {}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		default: true;
	}
}

declare module '@mui/material/styles' {
	interface Palette {
		'primary.light': Palette['primary']
		default: Palette['primary']
	}

	interface PaletteOptions {
		'primary.light': PaletteOptions['primary']
		default: Palette['primary']
	}
}

const globalStyles = css`
  :root {
		--appbar-height: 56px;
    --vertical-space: 40px;
  }
  html {
    box-sizing: border-box;
    max-width: 100vw;
    min-height: 100vh;
    user-select: none;
  }
  @media print {
    html,
    body {
      display: none;
    }
  }
  body {
    font-family: serif;
    color: ${rawTheme.color.base};
    background-color:#fefefe;
		min-height: 100vh;
  }
  a {
    text-decoration: none;
  }
  .grecaptcha-badge {
    visibility: hidden;
  }
  * {
    box-sizing: border-box;
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
		},
		default: {
			light: rawTheme.color.base,
			main: rawTheme.color.base,
			dark: rawTheme.color.base,
			contrastText: rawTheme.color.white,
		},
		'primary.light' : {
			light: rawTheme.color.primaryVeryLight,
			main: rawTheme.color.primaryLight,
			contrastText: rawTheme.color.base,
		}
	},
	shape: {
		borderRadius: 8
	},
	typography: {
		h4: {
			fontWeight: 700,
			padding: '8px',
			fontFamily: 'serif'
		},
		h5: {
			fontWeight: 700,
			fontFamily: 'serif'
		},
		h6: {
			fontWeight: 700,
			lineHeight: 1,
			fontFamily: 'serif'
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
		},
		caption: {
			opacity: 0.5,
		}
	},
	components: {
		MuiChip: {
			styleOverrides: {
				colorPrimary: rawTheme.color.primaryLight,
			}
		},
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

function ThemeProvider({ children }: { children: ComponentChildren }) {
	return (
		<MUIThemeProvider theme={theme}>
			<GlobalStyles styles={globalStyles} />
			{children}
		</MUIThemeProvider>
	)
}

export default ThemeProvider
