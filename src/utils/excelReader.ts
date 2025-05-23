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
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        
        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const rows = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { 
          raw: false,
          dateNF: 'dd/mm/yyyy' 
        });
        
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
  
  // Handle Date objects
  if (value instanceof Date) {
    return value.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  // Handle numeric Excel dates (Excel stores dates as serial numbers)
  if (typeof value === 'number' && !isNaN(value)) {
    try {
      // Convert Excel serial date to JavaScript Date
      // Excel's epoch starts on January 0, 1900
      const excelEpoch = new Date(1899, 11, 30);
      const millisPerDay = 24 * 60 * 60 * 1000;
      const date = new Date(excelEpoch.getTime() + value * millisPerDay);
      
      // Check if it's a reasonable date (between 1950 and 2050)
      const year = date.getFullYear();
      if (year >= 1950 && year <= 2050) {
        return date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    } catch (error) {
      console.error('Error converting numeric date:', error);
    }
  }
  
  // Handle string that might contain a date
  if (typeof value === 'string') {
    const dateMatch = value.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})$/);
    if (dateMatch) {
      try {
        const day = parseInt(dateMatch[1], 10);
        const month = parseInt(dateMatch[2], 10) - 1; // JS months are 0-indexed
        const year = parseInt(dateMatch[3], 10);
        const fullYear = year < 100 ? (year < 50 ? 2000 + year : 1900 + year) : year;
        
        const date = new Date(fullYear, month, day);
        return date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      } catch (error) {
        console.error('Error parsing date string:', error);
      }
    }
  }
  
  return String(value);
} 