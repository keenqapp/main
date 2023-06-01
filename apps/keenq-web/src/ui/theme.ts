const isLarge = document.body.offsetWidth > 1600

const theme = {
  unit: 'rem',
  gap: isLarge ? 1.5 : 1,
  fontFamily: 'Source sans',
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
    base: 'rgb(40,52,77)', // #28344D
    primary: 'rgb(54, 179, 126)', // #36B37E
    primaryLight: 'rgb(220, 244, 227)', // #36B37E // #DCF5E3
    secondary: 'rgb(206, 147, 216)', // #CE93D8
    secondaryLight: 'rgb(240,211,245)', // #F6F7FA
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
