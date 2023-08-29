import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const FileUploadScreen = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const uploadFiles = async () => {
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of selectedFiles) {
        const existingPdfBytes = await file.arrayBuffer();
        const newPdf = await PDFDocument.load(existingPdfBytes);

        const pages = await pdfDoc.copyPages(newPdf, newPdf.getPageIndices());
        pages.forEach((page) => pdfDoc.addPage(page));
      }

      const mergedPdfBytes = await pdfDoc.save();

      // Crear un objeto Blob para el PDF resultante
      const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

      // Crear una URL para el Blob y mostrar el PDF en un visor
      const pdfUrl = URL.createObjectURL(mergedPdfBlob);

      const formData = new FormData();
      formData.append('pdfFile', mergedPdfBlob);
      formData.append('question', 'Tu pregunta aquí');

      // Realizar la solicitud POST al backend
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al fusionar los PDFs:', error);
    }
  };

  return (
    <div>
      <h1>Subir y Fusionar Archivos PDF</h1>
      <input type="file" accept=".pdf" multiple onChange={onDrop} />
      <button onClick={uploadFiles}>Fusionar y Mostrar PDF</button>
    </div>
  );
};

export default FileUploadScreen;
