import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface exportAsPdfProps {
  idSelector: string;
}

export const exportAsPDF = ({ idSelector }: exportAsPdfProps) => {
  const element = document.getElementById(idSelector);
  if (element) {
    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate the scale factor to fit the image within the A4 page
      const scaleFactor = Math.min(
        pdfWidth / canvas.width,
        pdfHeight / canvas.height
      );

      // Calculate the dimensions of the image on the PDF
      const imgWidth = canvas.width * scaleFactor;
      const imgHeight = canvas.height * scaleFactor;

      // Calculate the position to center the image
      const xPosition = (pdfWidth - imgWidth) / 2;
      const yPosition = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', xPosition, yPosition, imgWidth, imgHeight);
      pdf.save('직업심리상담결과표.pdf');
    });
  }
};
