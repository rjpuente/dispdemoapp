import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-web";
import stylesJS from "../styles"

const apiKey = "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"

const BINARI_CONVERTER_ROL = "Convierte a binario el siguiente número: "
const CONTADOR_VOCALES_ROL = "Cuenta la cantidad de cada una de las vocales del siguiente texto:  "

const AppGpt = () => {

    const [data, setData] = useState([]);
    const [usage, setUsage] = useState([]);
    const [textInput, setTextInput] = useState("");

    const [dataContar, setDataContar] = useState([]);
    const [usageContar, setUsageContar] = useState([]);
    const [textInputCOntar, setTextInputContar] = useState("");

    const handleChangeText = (text) => {
        const numericValue = text.replace(/[^0-9]/g, '');

        setTextInput(numericValue);
    };


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
        }).then((data) => {
            console.log(data);
            setData(data.choices[0].text.trim());
            setUsage(data.usage.total_tokens);
        });
    }

    async function callOpenAiApiContar() {
        const prompt = textInputCOntar

        const ApiBody = {
            model: "text-davinci-003",
            prompt: CONTADOR_VOCALES_ROL + prompt,
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
        }).then((data) => {
            console.log(data);
            setDataContar(data.choices[0].text.trim());
            setUsageContar(data.usage.total_tokens);
        });
    }

    return (
        <View style={stylesJS.container}>
            <View style={stylesJS.titleContainer}>

                <Text style={styles.title}>
                    Realizar pretición a ChatGPT
                </Text>
            </View>

            <View style={stylesJS.queryConsumerContainer}>
                <View>
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
                        onChangeText={text => handleChangeText(text)}
                        placeholder="Ingrese solo números"
                    />
                    <Button title="Preguntar" onPress={callOpenAiApi} />
                </View>
                <View>
                    {dataContar !== "" ?
                        <h3> La cantidad de tokens usada es: {usageContar}</h3>
                        :
                        null
                    }
                    {dataContar !== "" ?
                        <h3>{dataContar}</h3>
                        :
                        null
                    }
                    <TextInput
                        style={styles.input}
                        value={textInputCOntar}
                        onChangeText={text => setTextInputContar(text)}
                        placeholder="Ingrese una frase"
                    />
                    <Button title="Preguntar" onPress={callOpenAiApiContar} />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        height: 200,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
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