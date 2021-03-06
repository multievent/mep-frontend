import { createTheme, styled, ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles'

interface Gradient {
  gradient1: string
}

interface Height {
  header: string
  mobileHeader: string
  footer: string
}

interface Width {
  drawer: string
}

interface TextColor {
  text1: string
  text2: string
  text3: string
  text4: string
  text5: string
}

interface BgColor {
  bg1: string
  bg2: string
  bg3: string
  bg4: string
  bg5: string
}

declare module '@mui/material/styles' {
  interface Theme {
    textColor: TextColor
    bgColor: BgColor
    gradient: Gradient
    height: Height
    width: Width
  }
  interface DeprecatedThemeOptions {
    textColor: TextColor
    bgColor: BgColor
    gradient: Gradient
    height: Height
    width: Width
  }
}

declare module '@mui/material/styles/createTheme' {
  interface DeprecatedThemeOptions {
    textColor: TextColor
    bgColor: BgColor
    gradient: Gradient
    height: Height
    width: Width
  }
  interface ThemeOptions {
    textColor: TextColor
    bgColor: BgColor
    gradient: Gradient
    height: Height
    width: Width
  }
  interface Theme {
    textColor: TextColor
    bgColor: BgColor
    gradient: Gradient
    height: Height
    width: Width
  }
}

export const theme = {
  typography: {
    fontFamily: [
      'Lexend Deca',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    primary: {
      light: 'rgba(22, 22, 22, 0.5)',
      main: '#161616',
      dark: '#000000',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#DEDEDF70',
      main: ' #DEDEDF',
      dark: '#16161650',
      contrastText: '#00000080'
    },
    error: {
      main: '#EB1312'
    },
    warning: {
      main: '#9867FF'
    },
    info: {
      main: '#9867FF'
    },
    success: {
      main: '#3AC261'
    },
    background: {
      default: '#F2F3FB',
      paper: '#F8F9FF'
    },
    text: {
      primary: '#212121',
      secondary: '#16161640',
      disabled: '#999999'
    },
    action: {
      disabledOpacity: 0.8
    },
    grey: {
      A700: '#191919',
      A400: '#252525',
      A200: '#303030',
      A100: '#A1A1A1'
    }
  },
  textColor: {
    text1: '#848484',
    text2: '#474E66',
    text3: '#B3BACC',
    text4: '#727272',
    text5: '#333333'
  },
  bgColor: {
    bg1: '#000000',
    bg2: '#F8EC4E',
    bg3: '#9867FF',
    bg4: '#303030',
    bg5: '#A1A1A1'
  },
  gradient: {
    gradient1: '#000000 linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)'
  },
  height: {
    header: '88px',
    mobileHeader: '77px',
    footer: '60px'
  },
  width: {
    drawer: '270px'
  },
  shape: {
    border: '1px solid',
    borderRadius: 10
  },
  spacing: (factor: number) => `${1 * factor}px`
}

export const override: any = {
  MuiCssBaseline: {
    styleOverrides: {
      body: { backgroundColor: theme.palette.background.default, fontSize: 16 },
      'html, input, textarea, button': {
        fontFamily: 'Lexend Deca',
        fontDisplay: 'fallback'
      },
      '@supports (font-variation-settings: normal)': {
        'html, input, textarea, button ': {
          fontFamily: 'Lexend Deca',
          fontDisplay: 'fallback'
        }
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        color: theme.palette.primary.contrastText,
        fontWeight: 500,
        borderRadius: theme.shape.borderRadius,
        transition: '.3s',
        textTransform: 'none' as const
      },
      contained: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: 'unset',
        '&:hover, :active': {
          boxShadow: 'unset',
          backgroundColor: theme.palette.primary.dark
        },
        '&:disabled': {
          backgroundColor: theme.palette.primary.light,
          color: '#464647'
        }
      },
      containedSecondary: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        boxShadow: 'unset',
        '&:hover, :active': {
          boxShadow: 'unset',
          backgroundColor: theme.palette.secondary.dark
        },
        '&:disabled': {
          backgroundColor: theme.palette.secondary.light,
          color: '#412E6A'
        }
      },
      outlined: {
        borderColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.contrastText,
        '&:hover, :active': {
          backgroundColor: 'transparent',
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main
        }
      },
      outlinedPrimary: {
        backgroundColor: 'transparent',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover, :active': {
          backgroundColor: 'transparent',
          borderColor: theme.palette.primary.dark,
          color: theme.palette.primary.dark
        }
      },
      text: {
        backgroundColor: 'transparent',
        color: theme.palette.primary.contrastText,
        '&:hover, :active': {
          backgroundColor: 'transparent',
          color: theme.palette.primary.main
        }
      },
      textPrimary: {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        '&:hover, :active': {
          backgroundColor: 'transparent',
          color: theme.palette.primary.dark
        }
      },
      textSecondary: {
        color: theme.palette.secondary.main,
        backgroundColor: 'transparent',
        '&:hover, :active': {
          backgroundColor: 'transparent',
          color: theme.palette.secondary.dark
        }
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: 'Lexend Deca'
      },
      body1: {
        fontSize: 14
      },
      body2: {
        fontSize: 12
      },
      h5: {
        fontSize: 28
      },
      h6: {
        fontSize: 22
      },
      caption: {
        fontSize: 12,
        color: theme.textColor.text3
      },
      subtitle1: {},
      subtitle2: {}
    }
  }
}

export const HideOnMobile = styled('div', {
  shouldForwardProp: () => true
})<{ breakpoint?: 'sm' | 'md' }>(({ theme, breakpoint }) => ({
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'none'
  }
}))

export const ShowOnMobile = styled('div', {
  shouldForwardProp: () => true
})<{ breakpoint?: 'sm' | 'md' }>(({ theme, breakpoint }) => ({
  display: 'none',
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'block'
  }
}))

export default createTheme({
  ...theme,
  components: {
    ...override
  }
})

export function ThemeProvider({ children, theme }: any) {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StyledEngineProvider>
  )
}
