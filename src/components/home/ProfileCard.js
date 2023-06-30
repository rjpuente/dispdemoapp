import React from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import styles from "../styles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTiktok } from '@fortawesome/free-brands-svg-icons'

const tk = <FontAwesomeIcon icon={faTiktok} style={{fontSize: '30px', color: 'black'}} />


const tw = <Icon name="twitter" size={30} color="black" />
const fb = <Icon name="facebook" size={30} color="black"/>
const lk = <Icon name="linkedin" size={30} color="black"/>
const ig = <Icon name="instagram" size={30} color="black"/>


const ProfileCard = () => {
    const user = {
        avatar: "https://yt3.googleusercontent.com/vRF8BHREiJ3Y16AbMxEi_oEuoQlnNNqGpgULuZ6zrWSAi24HcxX3Vko42RN8ToctH-G0qlWd=s900-c-k-c0x00ffffff-no-rj",
        coverPhoto: "https://i.pinimg.com/originals/f2/a2/c5/f2a2c5c324b2b490706d35ed28310613.png",
        name: "Avatar Aang"
    }
    return (
        <View style={styles.container}>
            <Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} />
            <View style={styles.avatarContainer}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Text style={{ color: "blue" }} onPress={() => Linking.openURL("https://www.twitter.com")}>
                    {tw}
                </Text>
                <Text style={[{ color: "blue" }, styles.hover]} onPress={() => Linking.openURL("https://www.facebook.com")}>
                    {fb}
                </Text>
                <Text style={[{ color: "blue" }, styles.hover]} onPress={() => Linking.openURL("https://www.instagram.com")}>
                    {ig}
                </Text>
                <Text style={[{ color: "blue" }, styles.hover]} onPress={() => Linking.openURL("https://www.linkedin.com")}>
                    {lk}
                </Text>
                <Text style={[{ color: "blue" }, styles.hover]} onPress={() => Linking.openURL("https://www.tiktok.com/")}>
                    {tk}
                </Text>
            </View>
        </View>
    )
}


export default ProfileCard