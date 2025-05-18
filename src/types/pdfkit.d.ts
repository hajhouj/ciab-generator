declare module 'pdfkit' {
  import { EventEmitter } from 'events';
  
  namespace PDFDocument {
    interface PDFDocumentOptions {
      size?: [number, number] | string;
      margin?: number;
      margins?: { top: number; left: number; bottom: number; right: number };
      layout?: 'portrait' | 'landscape';
      info?: {
        Title?: string;
        Author?: string;
        Subject?: string;
        Keywords?: string;
        Creator?: string;
        Producer?: string;
        CreationDate?: Date;
        ModDate?: Date;
      };
      autoFirstPage?: boolean;
      font?: string;
      fontSize?: number;
    }
    
    interface PDFPage {
      width: number;
      height: number;
    }
  }
  
  class PDFDocument extends EventEmitter {
    constructor(options?: PDFDocument.PDFDocumentOptions);
    
    save(): this;
    restore(): this;
    scale(xFactor: number, yFactor: number): this;
    translate(x: number, y: number): this;
    rotate(angle: number, options?: { origin?: [number, number] }): this;
    
    addPage(options?: PDFDocument.PDFDocumentOptions): this;
    switchToPage(pageNumber: number): this;
    font(font: string): this;
    fontSize(size: number): this;
    text(text: string, x?: number, y?: number, options?: any): this;
    
    fillColor(color: string, opacity?: number): this;
    strokeColor(color: string, opacity?: number): this;
    
    widthOfString(text: string, options?: { font?: string; size?: number }): number;
    
    end(): void;
    
    page: PDFDocument.PDFPage;
  }
  
  export = PDFDocument;
} 