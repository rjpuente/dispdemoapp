import React from "react";
import { Linking, View } from "react-native";

const instagram_username = <Icon name="instagram" size={30} color="black" />

const Profile = ({ task }) => {
    return (
        <View>
            <View style={styles.supimage}>
                <View style={styles.leftSide}>
                    <Image style={styles.image} source={{ uri: task.urls.raw }} />
                </View>
                <View style={styles.rightSide}>
                    <Text style={{ color: 'blue' }} onPress={() => {
                        Linking.openURL(task.user.portfolio_url)
                    }}>
                        {task.user.name}
                    </Text>
                    <View style={styles.redes}>
                        <Text style={{ color: 'blue' }} onPress={() => {
                            Linking.openURL(task.user.social.instagram_username)
                        }}>
                            {instagram_username}
                        </Text>

                        <Text style={{ color: 'blue' }} onPress={() => {
                            Linking.openURL(task.user.social.portfolio_url)
                        }}>
                            {portfolio_url}
                        </Text>
                    </View>
                    <View style={styles.containerkpi}>
                        <Image style={styles.image} source={require('../../')} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    items: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "20",
        display: "flex",
        justifyContent: "center",
        alighItems: "center"
    },
    supimage: {
        height: "100%",
        width: "100%",
        flexBasis: "70%",
        display: "flex",
        flexDirection: "row"
    },
    leftSide: {
        flex: "50%",
        display: "flex",
        justifyContent: "center",
        alighItems: "center"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    rightSide: {
        flexBasis: "50%",
        display: "flex",
        alighItems: "center",
        flexDirection: "column",
        justifyContent: "space-evenly"
    },
    redes: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alighItems: "center",
        flexDirection: "row"
    },
    containerkpi: {
        width: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    kpiR: {
        width: 20
    },
    image2: {
        width: 20,
        height: 20
    }
})

export default Profile;