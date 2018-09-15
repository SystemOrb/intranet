import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  public doc = new jsPDF('p', 'mm', 'a5');
  public render: boolean = false;
  constructor() { }
  loadPDF(DOM: any, filename: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.render = true;
      setTimeout( async () => {
        const data1 = await this.generateCanvas(DOM);
        this.doc.addImage(data1.data, 'PNG', 0, data1.position, data1.width, data1.height);
        this.doc.save(`${filename}.pdf`);
        this.render = false;
      }, 1000);
    });
  }
  generateCanvas(elementDOM: any): Promise<any> {
    return new Promise((resolve, reject) => {
      html2canvas(elementDOM).then(canvas => {
        const imgWidth = 200;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        resolve({
          render: true,
          data: contentDataURL,
          type: 'PNG',
          ref: 0,
          position: 0,
          width: imgWidth,
          height: imgHeight
        });
      });
    });
  }
}
