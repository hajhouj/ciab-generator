import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { formatDate } from './excelReader';
import { getPositionAdjustment, applyPositionAdjustment } from './positionAdjustments';

interface ExcelRow {
  [key: string]: string | number | Date | null;
}

interface LayoutRow {
  Column: string;
  'Position 1 from the left in mm': number;
  'Position 1 From the top in mm': number;
  'Position 2 From the right  in mm': number;
  'Position 2 From the top in mm': number;
  'Position 3 From the left in mm': number;
  'Position 3 from the top in mm': number;
  [key: string]: any;
}

// Constants exactly matching the Python ReportLab implementation
const MM_TO_POINTS = 2.83; // 1mm = 2.83 points
const DEFAULT_FONT_SIZE = 10; // Default font size from the original
const PAGE_WIDTH_MM = 340; // Page width in mm
const PAGE_HEIGHT_MM = 160; // Page height in mm

/**
 * Generate PDF from Excel data
 */
export async function generatePDF(
  dataRows: ExcelRow[], 
  layoutRows: ExcelRow[], 
  isDuplicata: boolean = false,
  debugMode: boolean = false // Kept for backward compatibility but not used
): Promise<Blob> {
  // Validate layout file
  const layoutData = layoutRows as LayoutRow[];
  
  try {
    // Define page size (340mm x 160mm)
    const pageWidth = PAGE_WIDTH_MM * MM_TO_POINTS;
    const pageHeight = PAGE_HEIGHT_MM * MM_TO_POINTS;
    
    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Set document metadata
    pdfDoc.setTitle(`CIAB ${isDuplicata ? 'Duplicata' : 'New'} Documents`);
    pdfDoc.setAuthor('CIAB PDF Generator');
    pdfDoc.setCreator('Astro CIAB Printer');
    
    // Embed a standard font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // For each row in data file
    for (const dataRow of dataRows) {
      // Generate verso page (with position 1 and 2)
      const versoPage = pdfDoc.addPage([pageWidth, pageHeight]);
      
      generateVerso(versoPage, dataRow, layoutData, pageWidth, pageHeight, isDuplicata, helveticaFont);
      
      // Generate recto page (with position 3)
      const rectoPage = pdfDoc.addPage([pageWidth, pageHeight]);
      
      generateRecto(rectoPage, dataRow, layoutData, pageWidth, pageHeight, isDuplicata, helveticaFont);
    }
    
    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();
    
    // Convert to Blob
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

/**
 * Generate the verso page with two positions
 */
function generateVerso(
  page: any, // Using any type to avoid TypeScript errors
  dataRow: ExcelRow,
  layoutData: LayoutRow[],
  pageWidth: number,
  pageHeight: number,
  isDuplicata: boolean,
  font: any // Using any type to avoid TypeScript errors
): void {
  // Add duplicata watermark if needed
  if (isDuplicata) {
    addDuplicataWatermark(page, font, pageWidth, pageHeight);
  }
  
  // For each field in layout
  for (const layout of layoutData) {
    const fieldName = layout.Column;
    if (!(fieldName in dataRow)) {
      continue;
    }
    
    const value = formatDate(dataRow[fieldName]);
    
    // Position 1 (from left) - X,Y coordinates in mm
    const x1 = layout['Position 1 from the left in mm'];
    const y1 = layout['Position 1 From the top in mm'];
    
    if (x1 != null && y1 != null) {
      // Get position adjustment for this field on verso (odd) page
      const adjustment = getPositionAdjustment('verso', fieldName);
      
      // Apply position adjustment (in mm)
      const [adjustedX1, adjustedY1] = applyPositionAdjustment(x1, y1, adjustment);
      
      // Convert from mm to points
      const x1Points = adjustedX1 * MM_TO_POINTS;
      const y1Points = pageHeight - (adjustedY1 * MM_TO_POINTS);
      
      page.drawText(value, {
        x: x1Points,
        y: y1Points,
        size: DEFAULT_FONT_SIZE,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    // Position 2 (from right) - X,Y coordinates in mm
    const x2 = layout['Position 2 From the right  in mm'];
    const y2 = layout['Position 2 From the top in mm'];
    
    if (x2 != null && y2 != null) {
      const textWidth = font.widthOfTextAtSize(value, DEFAULT_FONT_SIZE);
      
      // Get position adjustment for this field on verso (odd) page
      const adjustment = getPositionAdjustment('verso', fieldName);
      
      // Apply position adjustment (in mm)
      const [adjustedX2, adjustedY2] = applyPositionAdjustment(x2, y2, adjustment);
      
      // Calculate from right edge with adjustment
      const x2Points = pageWidth - (adjustedX2 * MM_TO_POINTS);
      const y2Points = pageHeight - (adjustedY2 * MM_TO_POINTS);
      
      page.drawText(value, {
        x: x2Points - textWidth,
        y: y2Points,
        size: DEFAULT_FONT_SIZE,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
  }
}

/**
 * Generate the recto page with one position
 */
function generateRecto(
  page: any, // Using any type to avoid TypeScript errors
  dataRow: ExcelRow,
  layoutData: LayoutRow[],
  pageWidth: number,
  pageHeight: number,
  isDuplicata: boolean,
  font: any // Using any type to avoid TypeScript errors
): void {
  // Add duplicata watermark if needed
  if (isDuplicata) {
    addDuplicataWatermark(page, font, pageWidth, pageHeight);
  }
  
  // For each field in layout
  for (const layout of layoutData) {
    const fieldName = layout.Column;
    if (!(fieldName in dataRow)) {
      continue;
    }
    
    // Position 3 (from left) - X,Y coordinates in mm
    const x3 = layout['Position 3 From the left in mm'];
    const y3 = layout['Position 3 from the top in mm'];
    
    if (x3 != null && y3 != null) {
      const value = formatDate(dataRow[fieldName]);
      
      // Get position adjustment for this field on recto (even) page
      const adjustment = getPositionAdjustment('recto', fieldName);
      
      // Apply position adjustment (in mm)
      const [adjustedX3, adjustedY3] = applyPositionAdjustment(x3, y3, adjustment);
      
      // Convert from mm to points
      const x3Points = adjustedX3 * MM_TO_POINTS;
      const y3Points = pageHeight - (adjustedY3 * MM_TO_POINTS);
      
      page.drawText(value, {
        x: x3Points,
        y: y3Points,
        size: DEFAULT_FONT_SIZE,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
  }
}

/**
 * Add a "DUPLICATA" watermark
 */
function addDuplicataWatermark(page: any, font: any, pageWidth: number, pageHeight: number): void {
  const text = 'DUPLICATA';
  const fontSize = 60;
  const textWidth = font.widthOfTextAtSize(text, fontSize);
  
  page.drawText(text, {
    x: (pageWidth - textWidth) / 2,
    y: pageHeight / 2,
    size: fontSize,
    font: font,
    color: rgb(0.9, 0.9, 0.9),
    opacity: 0.5,
    rotate: {
      type: 'degrees',
      angle: -45,
    },
  });
} 