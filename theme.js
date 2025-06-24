// theme.js

const theme = {
  colors: {
    background: '#F2F4F7',        // Sanftes hellgrau (professioneller als #fff)
    surface: '#FFFFFF',           // Für Cards, Inputs etc.
    primary: '#2563EB',           // Ein kräftiges, aber stilvolles Blau
    primaryLight: '#E0E7FF',      // Für flache Buttons, Hover-Effekt
    text: '#1F2937',              // Neutral-schwarz für gute Lesbarkeit
    secondary: '#64748B',         // Graublau – für Labels, Metadaten
    border: '#E5E7EB',            // Dezente Rahmenfarbe
    white: '#FFFFFF',
    transparent: 'transparent',
    error: '#DC2626',             // Für Fehlermeldungen
    success: '#16A34A',           // Für Bestätigungen

    buttonBackground: '#2563EB',  // Primärfarbe für Buttons
    buttonHover: '#1E40AF',       // Dunkler beim gedrückt halten
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },

  borderRadius: {
    sm: 6,
    md: 12,
    lg: 20,
    xl: 30
  },

  typography: {
    fontSize: {
      small: 12,
      normal: 16,
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
