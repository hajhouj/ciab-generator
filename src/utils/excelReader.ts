import * as XLSX from 'xlsx';

interface ExcelRow {
  [key: string]: string | number | Date | null;
}

/**
 * Read Excel file and return structured data
 */
export async function readExcelData(file: File): Promise<ExcelRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const rows = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);
        
        // Sanitize data
        const sanitizedRows = sanitizeExcelData(rows);
        
        resolve(sanitizedRows);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Sanitize Excel data to prevent security issues
 */
function sanitizeExcelData(rows: ExcelRow[]): ExcelRow[] {
  return rows.map(row => {
    const sanitizedRow: ExcelRow = {};
    
    Object.entries(row).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Remove control characters and potentially dangerous characters
        sanitizedRow[key] = value
          .replace(/[\x00-\x1F\x7F]/g, '') // Remove control chars
          .replace(/[<>&;]/g, '') // Remove potentially dangerous chars
          .trim();
      } else {
        sanitizedRow[key] = value;
      }
    });
    
    return sanitizedRow;
  });
}

/**
 * Validate layout file structure
 */
export function validateLayoutFile(rows: ExcelRow[]): boolean {
  const requiredColumns = [
    'Column',
    'Position 1 from the left in mm',
    'Position 1 From the top in mm',
    'Position 2 From the right  in mm',
    'Position 2 From the top in mm',
    'Position 3 From the left in mm',
    'Position 3 from the top in mm'
  ];
  
  if (rows.length === 0) {
    throw new Error('Layout file is empty');
  }
  
  const firstRow = rows[0];
  const missingColumns = requiredColumns.filter(col => !(col in firstRow));
  
  if (missingColumns.length > 0) {
    throw new Error(`Layout file missing required columns: ${missingColumns.join(', ')}`);
  }
  
  return true;
}

/**
 * Format date values consistently
 */
export function formatDate(value: any): string {
  if (value == null) {
    return '';
  }
  
  if (value instanceof Date) {
    return value.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  return String(value);
} 