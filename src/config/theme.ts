import { createTheme } from '@mui/material/styles'

// ─── Custom palette token definitions ────────────────────────────────────────
// Add every app-specific color here. Access via theme.palette.custom.X anywhere.

const lightCustom = {
  // Layout
  sidebarBg: '#172b4d',
  sidebarActiveBg: '#0052cc',
  navbarBg: '#ffffff',
  navbarShadow: '0 2px 6px rgba(0,0,0,0.08)',
  pageBg: '#f4f5f7',

  // Surfaces
  cardBg: '#ffffff',
  cardShadow: '0 2px 8px rgba(0,0,0,0.07)',
  stickyBg: '#ffffff',

  // Borders & dividers
  border: '#f0f0f0',
  borderInput: '#c1c7d0',

  // Text
  labelText: '#37474f',
  mutedText: '#8993a4',
  valueText: '#172b4d',
  errorText: '#c62828',

  // Search box
  searchBg: '#ffffff',
  searchIcon: '#8993a4',

  // Pagination bar
  paginationBg: '#ffffff',

  // Forbidden page
  forbiddenBg: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
  forbiddenCardBg: '#ffffff',
}

const darkCustom: typeof lightCustom = {
  // Layout
  sidebarBg: '#131720',
  sidebarActiveBg: '#0052cc',
  navbarBg: '#1a1d27',
  navbarShadow: '0 2px 6px rgba(0,0,0,0.4)',
  pageBg: '#0f1117',

  // Surfaces
  cardBg: '#1a1d27',
  cardShadow: '0 2px 8px rgba(0,0,0,0.3)',
  stickyBg: '#1a1d27',

  // Borders & dividers
  border: '#2a2d3a',
  borderInput: '#3a3f52',

  // Text
  labelText: '#a0aab8',
  mutedText: '#6b7280',
  valueText: '#e2e8f0',
  errorText: '#f87171',

  // Search box
  searchBg: '#1a1d27',
  searchIcon: '#6b7280',

  // Pagination bar
  paginationBg: '#1a1d27',

  // Forbidden page
  forbiddenBg: 'linear-gradient(135deg, #0f1117 0%, #1a1d27 100%)',
  forbiddenCardBg: '#1a1d27',
}

// ─── TypeScript augmentation ──────────────────────────────────────────────────
declare module '@mui/material/styles' {
  interface Palette {
    custom: typeof lightCustom
  }
  interface PaletteOptions {
    custom?: Partial<typeof lightCustom>
  }
}

// ─── Theme factory ────────────────────────────────────────────────────────────
export const buildTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#4c35b5',
      },
      background: {
        default: mode === 'light' ? lightCustom.pageBg : darkCustom.pageBg,
        paper: mode === 'light' ? lightCustom.cardBg : darkCustom.cardBg,
      },
      custom: mode === 'light' ? lightCustom : darkCustom,
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  })
