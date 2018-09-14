import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  doc = new jsPDF();
  constructor() { }

  savePdf(orientation: string, content: string) {
    this.doc.text('Hello world', 10, 10);
    this.doc.save('test.pdf');
  }
}
