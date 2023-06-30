import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-web";

const apiKey = "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"

const BINARI_CONVERTER_ROL = "Convierte a binario el siguiente número: "
const CONTADOR_VOCALES_ROL = "Cuenta las vocales del siguiente texto:  "

const AppGpt = () => {
    
    const [data, setData] = useState([]);
    const [usage, setUsage] = useState([]);
    const [textInput, setTextInput] = useState("");    


    async function callOpenAiApi() {
        const prompt = textInput

        const ApiBody = {
            model: "text-davinci-003",
            prompt: BINARI_CONVERTER_ROL + prompt,
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        }

        await fetch("https://api.openai.com/v1/completions", {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey
            },
            body: JSON.stringify(ApiBody)
        }).then((data) => {
            return data.json();
        }).then((data) =>{
            console.log(data);
            setData(data.choices[0].text.trim());
            setUsage(data.usage.total_tokens);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Realizar pretición a ChatGPT
            </Text>
            {data !== "" ?
                <h3> La cantidad de tokens usada es: {usage}</h3>
                :
                null
            }
            {data !== "" ?                
                <h3>{data}</h3>
                :
                null
            }
            <TextInput
                style={styles.input}
                value={textInput}
                onChangeText = {text => setTextInput(text)}
                placeholder="Ingrese solo números"
            />
            <Button title="Preguntar" onPress={callOpenAiApi} />
        </View>
    )
}

const ChatGPT = () => {
    const [data, setData] = useState([]);
    const apiKey = "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"
    const apiUrl = "https://api.openai.com/v1/engines/text-davinci-002/completions"
    const [textInput, setTextInput] = useState("");

    const handleChangeText = (text) => {
        // Remover cualquier carácter que no sea un número utilizando una expresión regular
        const numericValue = text.replace(/[^0-9]/g, '');

        // Actualizar el estado con el valor numérico
        setTextInput(numericValue);
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Realizar pretición a ChatGPT
            </Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Text style={{ fontWeight: "bold", color: item.type === "user" ? "green" : "red" }}>
                            {item.type === "user" ? "Ninza" : "Bot"}
                        </Text>
                        <Text style={styles.bot}>
                            {item.text}
                        </Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                value={textInput}
                placeholder="Ingrese solo números"
            />
            <Button title="Preguntar" onPress={callOpenAiApi} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        height: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    body: {
        flex: 1,
        marginBottom: 20,
    },
    userText: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    botText: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
});


export default AppGpt