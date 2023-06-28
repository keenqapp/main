const isLarge = document.body.offsetWidth > 1600

const theme = {
	unit: 'rem',
	gap: isLarge ? 1.5 : 1,
	fontFamily: 'Source sans',
	boxShadow: 'box-shadow: 1px 3px 4px rgba(0,0,0,0.07)',
	fontSize: {
		text: '0.9rem',
		sub: '0.8rem',
		smallSub: '0.6rem',
		heading1: 'calc(1.45rem + 1.25vw)',
		heading2: 'calc(1.3rem + 1vw)',
		heading3: 'calc(1.25rem + .7vw)',
		heading4: 'calc(1.2rem + .45vw)',
		heading5: 'calc(1.15rem + .2vw)',
		heading6: 'calc(1rem + .1vw)'
	},
	color: {
		white: '#fff',
		// base: 'rgb(57,67,91)', // #28344D
		base: 'rgb(73,62,93)', // #28344D
		baseLight: 'rgb(194,188,188)', // #FEFEFE
		primary: 'rgb(54, 179, 126)', // #36B37E
		primaryLight: 'rgb(220, 244, 227)', // #DCF5E3
		primaryVeryLight: 'rgb(242,250,244)', // #DCF5E3
		secondary: 'rgb(206, 147, 216)', // #CE93D8
		secondaryLight: 'rgb(240,211,245)', // #F6F7FA
		secondaryVeryLight: 'rgba(240,211,245,0.33)', // #F6F7FA
		background: 'rgba(246, 247, 250, 1)', // #F6F7FA
		error: '#f44336',
		errorLight: 'rgb(255, 235, 238)', // #FFEBEE
	},
	fonts: {},
	space(...args: any[]) {
		const result = (args.length ? [...args] : [1]).reduce((str, curr) => `${str} ${curr * theme.gap}rem`, '')
		return result
	},
	css: {
		centered: 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);',
		transition: 'all 300ms ease-in-out;',
	}
} as const

export default theme
