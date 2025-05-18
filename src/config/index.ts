/**
 * Application configuration
 */
export const AppConfig = {
  // PDF Page dimensions in mm (same as original application)
  pdf: {
    pageWidth: 340,
    pageHeight: 160,
    // Points per mm conversion factor (1mm ≈ 2.83 points in PDF)
    pointsPerMm: 2.83
  },
  
  // Default fonts
  fonts: {
    default: 'Helvetica',
    fallback: 'Arial',
    size: 10
  },
  
  // File validation
  validation: {
    // Required columns in the layout file
    requiredLayoutColumns: [
      'Column',
      'Position 1 from the left in mm',
      'Position 1 From the top in mm',
      'Position 2 From the right  in mm',
      'Position 2 From the top in mm',
      'Position 3 From the left in mm',
      'Position 3 from the top in mm'
    ]
  }
}; 