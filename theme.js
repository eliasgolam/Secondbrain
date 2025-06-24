const theme = {
  colors: {
    // Grundstruktur
    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#D1D5DB',

    // Text
    text: '#1F2937',
    secondary: '#64748B',

    // Primär/Akzentfarben
    primary: '#4B6EF5',
    primaryLight: '#8FA8FF',
    success: '#28A745',
    danger: '#D32F2F',

    // Buttons
    buttonBackground: '#4B6EF5',
    buttonHover: '#3B5ADC',

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
    xxl: 48
  },

  borderRadius: {
    sm: 6,
    md: 12,
    lg: 20,
    xl: 32
  },

  // ➕ Alias für radius, damit theme.radius.lg auch funktioniert
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    xl: 32
  },

  typography: {
    fontSize: {
      xsmall: 11,
      small: 13,
      normal: 15,
      medium: 17,
      large: 20,
      title: 24
    },
    fontFamily: {
      regular: 'System',
      bold: 'System'
    }
  }
};

export default theme;
