const theme = {
  colors: {
    // Grundstruktur
    background: '#F5F7FA',       // Hellgrauer Hintergrund
    surface: '#FFFFFF',          // Weiß für Karten und Boxen
    border: '#D1D5DB',           // Dezente Rahmenfarbe

    // Text
    text: '#1F2937',             // Dunkelgrauer Standardtext
    secondary: '#6B7280',        // Sekundärtext (leicht heller)

    // Primär/Akzentfarben (von BauMaster)
    primary: '#F9B000',          // BauMaster-Gelb (Call to Action)
    primaryLight: '#FFD65A',     // Helleres Gelb für Hover
    success: '#34A853',          // Grün für Status-Icons (z. B. Check)
    danger: '#D93025',           // Rot für Warnungen/Fehler

    // Buttons
    buttonBackground: '#F9B000',
    buttonHover: '#FFD65A',

    // Utility
    white: '#FFFFFF',
    transparent: 'transparent',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 6,
    md: 12,
    lg: 20,
    xl: 32,
  },

  // ➕ Alias für radius
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    xl: 32,
  },

  typography: {
    fontSize: {
      xsmall: 11,
      small: 13,
      normal: 15,
      medium: 17,
      large: 20,
      title: 24,
    },
    fontFamily: {
      regular: 'System',
      bold: 'System',
    },
  },
};

export default theme;
