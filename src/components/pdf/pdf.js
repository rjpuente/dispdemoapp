import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { DocumentPicker } from 'expo-document-picker';

import stylesJS from "../styles";

function PDFReader() {
    const [fileUri, setFileUri] = useState(null);

    const handleFilePick = async () => {
        try {
            const document = await DocumentPicker.getDocumentAsync({
                type: DocumentPicker.types.pdf,
            });
            setFileUri(document.uri);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveToFolder = async () => {
        if (!fileUri) {
            console.log("Seleccione un archivo PDF primero.");
            return;
        }

        // Aquí, simplemente utiliza el URI del archivo seleccionado (fileUri) para guardar en la carpeta.
        // Ya que la API de FileSystem está integrada en Expo, no necesitas importar nada adicional.

        const destinationPath = `${FileSystem.documentDirectory}mi_carpeta/uploadedFile.pdf`;

        try {
            // Crea la carpeta si no existe
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}mi_carpeta`, { intermediates: true });
            // Copia el archivo en la carpeta específica
            await FileSystem.copyAsync({ from: fileUri, to: destinationPath });
            console.log("Archivo PDF guardado en la carpeta:", destinationPath);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={stylesJS.container}>
            <View style={stylesJS.titleContainer}>
                <Text>Subir PDF</Text> {/* Agrega <Text> alrededor del texto */}
            </View>
            <View style={stylesJS.queryConsumerContainer}>
                <TouchableOpacity onPress={handleFilePick}>
                    <Text>Seleccionar PDF</Text>
                </TouchableOpacity>
                {fileUri && (
                    <TouchableOpacity onPress={handleSaveToFolder}>
                        <Text>Guardar en Carpeta</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default PDFReader;
