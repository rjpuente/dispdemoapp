import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button, View } from "react-native-web";
import { TextInput, Text } from "react-native";
import stylesJS from "../styles"

const FileUploadScreen = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

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

      const formData = new FormData();
      formData.append('pdfFile', mergedPdfBlob);
      formData.append('question', question);

      // Realizar la solicitud POST al backend
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResponse(data.message);

    } catch (error) {
      console.error('Error al fusionar los PDFs:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Subir y Fusionar Archivos PDF</Text>
      </View>

      <View style={styles.inputContainer}>
        {/* Utiliza el componente <input> de React Native Web */}
        <input type="file" accept=".pdf" multiple onChange={onDrop} />
      </View>

      <View style={styles.inputContainer}>
        {/* Utiliza el componente <TextInput> de React Native Web */}
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={(text) => setQuestion(text)}
          placeholder="Haga la pregunta acerca de su pdf"
        />
      </View>

      {response && (
        <View style={styles.responseContainer}>
          {/* Utiliza un elemento <Text> en lugar de <div> */}
          <Text style={styles.responseText}>Respuesta: {response}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {/* Utiliza el componente <Button> de React Native Web */}
        <Button title="Preguntar" onPress={uploadFiles} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Cambio de height a minHeight
    backgroundColor: '#f2f2f2',
    padding: 20, // Agregado de padding
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%', // Cambio de width a 100%
  },

  inputContainer: {
    marginBottom: 20,
    width: '100%', // Cambio de width a 100%
  },

  responseContainer: {
    marginTop: 20,
  },
  responseText: {
    fontSize: 16,
    color: 'green',
  },

  buttonContainer: {
    marginTop: 20,
  },
};

export default FileUploadScreen;
