import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: 'class',
  theme: {
    extend: {

      // ─── COLORS ───────────────────────────────────────────────
      colors: {

        // ── Semantic tokens — light/dark aware ──────────────────
        // These switch automatically between light & dark mode.
        // Use them like any normal Tailwind class:
        //
        //   bg-background         → page background
        //   bg-card               → card / panel background
        //   bg-surface-inset      → input background
        //   bg-sidebar            → sidebar background
        //   bg-primary            → gold button background
        //   text-foreground       → primary text
        //   text-foreground-sub   → secondary text
        //   text-foreground-muted → hints / placeholders
        //   text-foreground-gold  → gold accent text
        //   border-border         → default border
        //   border-ring           → focus ring / gold border

        background: 'var(--color-bg)',

        foreground: {
          DEFAULT: 'var(--color-text)',
          sub:     'var(--color-text-sub)',
          muted:   'var(--color-text-muted)',
          gold:    'var(--color-text-gold)',
          inverse: 'var(--color-text-inverse)',
        },

        card: {
          DEFAULT:    'var(--color-bg-raised)',
          foreground: 'var(--color-text)',
        },

        popover: {
          DEFAULT:    'var(--color-bg-overlay)',
          foreground: 'var(--color-text)',
        },

        surface: {
          DEFAULT: 'var(--color-bg)',
          raised:  'var(--color-bg-raised)',
          overlay: 'var(--color-bg-overlay)',
          inset:   'var(--color-bg-inset)',
          subtle:  'var(--color-bg-subtle)',
        },

        sidebar: {
          DEFAULT:       'var(--color-sb-bg)',
          item:          'var(--color-sb-item)',
          active:        'var(--color-sb-active)',
          border:        'var(--color-sb-border)',
          text:          'var(--color-sb-text)',
          'text-active': 'var(--color-sb-text-active)',
        },

        topbar: {
          DEFAULT: 'var(--color-topbar-bg)',
          border:  'var(--color-topbar-border)',
        },

        primary: {
          DEFAULT:    'var(--color-btn-primary-bg)',
          foreground: 'var(--color-btn-primary-text)',
          hover:      'var(--color-btn-primary-hover)',
        },

        border: 'var(--color-border)',
        input:  'var(--color-bg-inset)',
        ring:   'var(--color-border-gold)',

        // ── Raw palette — fixed shades ───────────────────────────
        // Use when you need a specific shade regardless of mode:
        //   bg-navy-900  text-gold-400  etc.
        navy: {
          50:  '#eef1f7',
          100: '#d5dcec',
          200: '#aab8d8',
          300: '#7f94c4',
          400: '#5470af',
          500: '#2a4d9b',
          600: '#1e3a7a',
          700: '#152c5e',
          800: '#0e1e42',
          900: '#080f26',
          950: '#040814',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },

        // ── Room / status colors ─────────────────────────────────
        occupied:    '#f43f5e',
        available:   '#10b981',
        reserved:    '#f59e0b',
        maintenance: '#a78bfa',
        checkout:    '#38bdf8',
        success:     '#10b981',
        warning:     '#f59e0b',
        error:       '#f43f5e',
        info:        '#38bdf8',
      },

      // ─── TYPOGRAPHY ───────────────────────────────────────────
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Didot', 'Georgia', 'serif'],
        heading:  ['"Playfair Display"', '"Libre Baskerville"', 'Georgia', 'serif'],
        body:     ['"DM Sans"', 'Outfit', 'sans-serif'],
        mono:     ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },

      fontSize: {
        '2xs': '0.625rem',
        xs:    '0.75rem',
        sm:    '0.875rem',
        base:  '1rem',
        md:    '1.0625rem',
        lg:    '1.125rem',
        xl:    '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },

      // ─── BORDER RADIUS ────────────────────────────────────────
      borderRadius: {
        none:  '0px',
        xs:    '2px',
        sm:    '4px',
        md:    '6px',
        lg:    '10px',
        xl:    '14px',
        '2xl': '20px',
        '3xl': '28px',
        full:  '9999px',
        card:  '12px',
        btn:   '8px',
        input: '8px',
        badge: '6px',
        modal: '16px',
        chip:  '9999px',
      },

      // ─── SHADOWS ──────────────────────────────────────────────
      boxShadow: {
        xs:        '0 1px 2px 0 rgb(0 0 0 / 0.4)',
        sm:        '0 2px 6px 0 rgb(0 0 0 / 0.45)',
        md:        '0 4px 12px 0 rgb(0 0 0 / 0.5)',
        lg:        '0 8px 24px 0 rgb(0 0 0 / 0.55)',
        xl:        '0 16px 40px 0 rgb(0 0 0 / 0.6)',
        '2xl':     '0 24px 64px 0 rgb(0 0 0 / 0.65)',
        'gold-sm': '0 0 12px 0 rgb(245 158 11 / 0.2)',
        'gold-md': '0 0 24px 0 rgb(245 158 11 / 0.25)',
        'gold-lg': '0 0 40px 0 rgb(245 158 11 / 0.3)',
        'gold-btn':'0 4px 20px 0 rgb(245 158 11 / 0.4)',
        card:      'var(--shadow-card)',
        modal:     'var(--shadow-modal)',
        sidebar:   'var(--shadow-sidebar)',
      },

      // ─── SPACING (layout extras) ──────────────────────────────
      spacing: {
        sidebar:        '260px',
        'sidebar-mini': '72px',
        topbar:         '64px',
        panel:          '380px',
        'content-max':  '1440px',
      },

      // ─── TRANSITIONS ──────────────────────────────────────────
      transitionDuration: {
        instant: '50ms',
        fast:    '100ms',
        normal:  '200ms',
        slow:    '350ms',
        slower:  '500ms',
        page:    '600ms',
      },

      // ─── Z-INDEX ──────────────────────────────────────────────
      zIndex: {
        base:     '0',
        raised:   '10',
        dropdown: '100',
        sticky:   '200',
        sidebar:  '300',
        topbar:   '400',
        overlay:  '500',
        modal:    '600',
        popover:  '700',
        toast:    '800',
        tooltip:  '900',
      },

    },
  },
  plugins: [],
}

export default config