import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import styles from "../styles";

const Task = ({ task }) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Image source={{uri: task?.urls?.raw}} style={styles.image}/>
                <Text style={styles.itemText}>
                    { task?.alt_description }
                </Text>
            </View>
        </View>
    )
}

export default Task