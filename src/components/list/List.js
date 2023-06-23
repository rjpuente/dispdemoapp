import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Task from "./Task";
import { StatusBar } from "expo-status-bar";
import Profile from "./Profile";
const ListComponent = () => {

    const [taskItems, setTaskItems] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [task, setTask] = useState();

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const response = await fetch("https://api.unsplash.com/photos/?client_id=ZXjOAAdwefwfYGtyhjJmAerkWnGDxNNnEwTlnHkSqk4")
            const jsonData = await response.json()
            setTaskItems(jsonData)
        } catch (e) {
            console.log("error: ", e)
        }
    }

    const ItemList = ({ task, i }) => {
        const getProfile = (task) => {

        }
        return (
            <View>
                <Text>
                    {i}
                </Text>
                <TouchableOpacity style={styles.periten} key={i} onPress={() => getProfile(task)}>
                    <Task task={task} />
                </TouchableOpacity>
            </View>
        )
    }

    const Item = ({ task, i }) => {
        return (
            <TouchableOpacity style={styles.periten} key={i} onPress={() => getProfile(task)}>
                <Task task={task} />
            </TouchableOpacity>
        )
    }

    const closeProfile = () => {
        setShowProfile(!showProfile)
    }

    const getProfile = () => {
        setShowProfile(true)
    }

    return (taskItems && taskItems.length > 0 ?
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>
                    Se listan perfiles
                </Text>
                <View style={styles.items}>
                    <SafeAreaView>
                        <FlatList data={taskItems} renderItem={({ item, i }) => (<ItemList task={item} i={i} />)} >
                        </FlatList>
                    </SafeAreaView>
                </View>
            </View>
            <Modal animationType="slide" transparent="true" visible={showProfile}
                onRequestClose={() => {
                    Alert.alert("modal has been closed.")
                    setShowProfile(!showProfile)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            <Profile task={task} closeProfile={closeProfile} />
                        </Text>
                    </View>
                </View>
            </Modal>
        </View> :
        <View>
            <Text>
                No hay datos
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E8EAED",
        margingTop: StatusBar.currentHeight || 0,
        display: "flex"
    },
    taskWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
        height: 900
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold"
    },
    items: {

    },
    periten: {

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: "100%",
        height: 300,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
export default ListComponent