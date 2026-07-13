/**
 * App color palette tokens.
 * Use these as the single source of truth for all colors across the app.
 */
export const colors = {
    // Brand (matches auth gradient)
    brand: {
        bg: '#ede9ff',
        text: '#4c35b5',
    },

    // Semantic
    info: {
        bg: '#e3f2fd',
        text: '#1565c0',
    },
    success: {
        bg: '#e8f5e9',
        text: '#2e7d32',
    },
    successLight: {
        bg: '#f1f8e9',
        text: '#558b2f',
    },
    warning: {
        bg: '#fff8e1',
        text: '#e65100',
    },
    error: {
        bg: '#fce4ec',
        text: '#c62828',
    },
    errorStrong: {
        bg: '#ffebee',
        text: '#b71c1c',
    },

    // Neutrals
    neutral: {
        bg: '#f5f5f5',
        text: '#616161',
    },
    neutralDark: {
        bg: '#eceff1',
        text: '#37474f',
    },

    // Teal (fresh / new)
    teal: {
        bg: '#e0f2f1',
        text: '#00695c',
    },

    // Orange (action needed / reopened)
    orange: {
        bg: '#fff3e0',
        text: '#e65100',
    },

    // Purple (escalated / critical)
    purple: {
        bg: '#f3e5f5',
        text: '#6a1b9a',
    },
} as const;
