import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Button, Alert } from 'react-native'
import CONSTS from '../core/CONSTS';
import { AntDesign } from '@expo/vector-icons';
import { adminAPI } from '../core/API';
import { memo } from "react"


const HouseItem = ({ data, isAdmin = false }) => {
    const { _id, name, image, description, rentCost, saleCost } = data

    const removeHouse = () => {
        try {
            const admin = new adminAPI()
            admin.RemoveHouse(_id)
        } catch (e) { console.log(e) }
    }

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: `${CONSTS.BACKEND_URL}/${image}`
                }}
                style={styles.image}
            />
            <Text style={[styles.text, styles.name]}>{name}</Text>
            <Text style={[styles.text, styles.description]}>{description}</Text>
            {rentCost ? <View style={styles.priceContainer}><Text style={[styles.text, styles.cost]}>Minimal rent cost - <Text style={[styles.text, styles.costPrice]}>{rentCost}$</Text> per day</Text></View> : null}
            {saleCost ? <Text style={[styles.text, styles.cost]}>Minimal sale cost - <Text style={[styles.text, styles.costPrice]}>{saleCost}$</Text></Text> : null}


            {isAdmin ? <TouchableOpacity onPress={removeHouse}>
                <AntDesign name="delete" size={32} color="white" style={{ textAlign: 'right' }} />
            </TouchableOpacity> :
                <View style={{ marginTop: 15, marginBottom: 10 }}>
                    <Button title={"Learn more"} onPress={() => Alert.alert(
                        "Ups...",
                        "Logic for connecting user and saler will be here",
                        [
                            { text: "OK" }
                        ]
                    )} />
                </View>
            }
        </View>
    )
}

export default memo(HouseItem)


const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: "100%"
    },
    image: {
        width: (Dimensions.get('window').width - 40), height: (Dimensions.get('window').width - 40) * 3 / 4, borderRadius: 16
    },
    text: {
        color: "white",
    },
    name: {
        fontSize: 24,
        marginTop: 5,
        fontFamily: "Montserrat-Bold",
    },
    description: {
        marginVertical: 8,
        fontSize: 16,
        fontFamily: "Montserrat-Regular",
    },
    cost: {
        marginVertical: 5,
        fontSize: 18,
        fontFamily: "Montserrat-Regular",
    },
    costPrice: {
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
    },
    deleteContainer: {
    }
})


//     "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
//     "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),