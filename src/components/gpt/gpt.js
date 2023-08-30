import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import stylesJS from '../styles';

const apiKey = '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';

const BINARI_CONVERTER_ROL = 'Convierte a binario el siguiente número: ';
const CONTADOR_VOCALES_ROL =
    'Cuenta la cantidad de cada una de las vocales del siguiente texto: ';

const AppGpt = () => {
    const [data, setData] = useState('');
    const [usage, setUsage] = useState(0);
    const [textInput, setTextInput] = useState('');

    const [dataContar, setDataContar] = useState('');
    const [usageContar, setUsageContar] = useState(0);
    const [textInputCOntar, setTextInputContar] = useState('');

    const handleChangeText = (text) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setTextInput(numericValue);
    };

    async function callOpenAiApi() {
        const prompt = textInput;

        const ApiBody = {
            model: 'text-davinci-003',
            prompt: BINARI_CONVERTER_ROL + prompt,
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        };

        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + apiKey,
            },
            body: JSON.stringify(ApiBody),
        });

        const responseData = await response.json();
        setData(responseData.choices[0].text.trim());
        setUsage(responseData.usage.total_tokens);
    }

    async function callOpenAiApiContar() {
        const prompt = textInputCOntar;

        const ApiBody = {
            model: 'text-davinci-003',
            prompt: CONTADOR_VOCALES_ROL + prompt,
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        };

        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + apiKey,
            },
            body: JSON.stringify(ApiBody),
        });

        const responseData = await response.json();
        setDataContar(responseData.choices[0].text.trim());
        setUsageContar(responseData.usage.total_tokens);
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Realizar petición a ChatGPT</Text>
            </View>

            <View style={styles.queryConsumerContainer}>
                <View style={styles.inputContainer}>
                    {data !== '' && (
                        <Text>La cantidad de tokens usada es: {usage}</Text>
                    )}
                    {data !== '' && <Text>{data}</Text>}
                    <TextInput
                        style={styles.input}
                        value={textInput}
                        onChangeText={(text) => handleChangeText(text)}
                        placeholder="Ingrese solo números"
                        keyboardType="numeric"
                    />
                    <Button title="Preguntar" onPress={callOpenAiApi} />
                </View>

                <View style={styles.inputContainer2}>
                    {dataContar !== '' && (
                        <Text>La cantidad de tokens usada es: {usageContar}</Text>
                    )}
                    {dataContar !== '' && <Text>{dataContar}</Text>}
                    <TextInput
                        style={styles.input}
                        value={textInputCOntar}
                        onChangeText={(text) => setTextInputContar(text)}
                        placeholder="Ingrese una frase"
                    />
                    <Button title="Preguntar" onPress={callOpenAiApiContar} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    queryConsumerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        marginBottom: 20,
        width: '80%',
        maxWidth: 400,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default AppGpt;
