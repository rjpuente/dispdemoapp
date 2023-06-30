import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import axios from "axios"
import { Button } from "react-native-web";

const ChatGPT = () => {
    const [data, setData] = useState([]);
    const apiKey = "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"
    const apiUrl = "https://api.openai.com/v1/engines/text-davinci-002/completions"
    const [textInput, setTextInput] = useState("");

    const handleSend = async () => {
        const prompt = textInput
        const response = await axios.post(apiUrl, {
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey
            }
        });
        const text = response.data.choices[0].text;
        setData([...data, { type: "user", "text": textInput }, { type: "bot", "text": text }]);
        setTextInput("");
    }

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
                onChangeText={text => setTextInput(text)}
                placeholder="Pregúntame algo"
            />
            <Button title="Preguntar" onPress={handleSend}/>
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


export default ChatGPT