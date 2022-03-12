import { View, Image, StyleSheet, TouchableOpacity, TextInput, Text, ToastAndroid, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CONSTS from '../core/CONSTS';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pickImage, uploadImage } from './../components/PickImage';
import { setHouseImageAction, setHouseNameAction, setHouseDescriptionAction, setHouseRentCostAction, setHouseSaleCostAction, setHouseResetAdminAction } from './../store/OffersReducer';
import THEMES from './../core/THEMES';
import { adminAPI } from '../core/API';
import HouseItem from '../components/HouseItem';

const AdminScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const name = useSelector((state) => state.OffersReducerName.name);
    const image = useSelector((state) => state.OffersReducerName.image);
    const description = useSelector((state) => state.OffersReducerName.description);
    const rentCost = useSelector((state) => state.OffersReducerName.rentCost);
    const saleCost = useSelector((state) => state.OffersReducerName.saleCost);
    const offers = useSelector((state) => state.OffersReducerName.offers);
    const [rentOpen, setRentOpen] = useState(false);
    const [saleOpen, setSaleOpen] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const onPressImg = async () => {
        await pickImage()
            .then(async (res) => {
                const { formData, name } = res
                if (formData !== null) await uploadImage(formData)
                    .then(() => {
                        dispatch(setHouseImageAction(name));
                    })
            })
    }

    const addHouse = () => {
        const admin = new adminAPI()
        admin.AddHouse().then(res => {
            if (res.status === 200) {
                ToastAndroid.show("You added house", ToastAndroid.SHORT)
                navigation.navigate("MainScreen")
                dispatch(setHouseResetAdminAction())
                setSaleOpen(false)
                setRentOpen(false)
                setErrMsg("")
            }
            else {
                setErrMsg(res.message)
            }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView>
                <View style={styles.container}>
                    <View style={{
                        width: "100%",
                        marginBottom: 10
                    }}>
                        <Text style={styles.title}>Add</Text>
                    </View>

                    <TouchableOpacity onPress={onPressImg}>
                        <View style={styles.photo}>
                            {image ?
                                <Image
                                    source={{
                                        uri: `${CONSTS.BACKEND_URL}/${image}`
                                    }}
                                    style={{ width: 280, height: 210, borderRadius: 16 }}
                                />
                                : <MaterialCommunityIcons name="camera" size={48} color="black" />}
                        </View>
                    </TouchableOpacity>

                    <TextInput
                        placeholder='Name of house'
                        placeholderTextColor='#808e9b'
                        style={styles.input}
                        autoCapitalize={"sentences"}
                        autoCorrect={false}
                        onChangeText={(prev) => dispatch(setHouseNameAction(prev))}
                        value={name}
                        maxLength={50}
                    />

                    <TextInput
                        placeholder='Description of house'
                        placeholderTextColor='#808e9b'
                        style={styles.input}
                        autoCapitalize={"sentences"}
                        autoCorrect={false}
                        onChangeText={(prev) => dispatch(setHouseDescriptionAction(prev))}
                        value={description}
                        multiline={true}
                        numberOfLines={4}
                        maxLength={255}

                    />

                    <View style={styles.btnsContainer}>

                        <TouchableOpacity onPress={() => {
                            setRentOpen(!rentOpen)
                            dispatch(setHouseRentCostAction(""))
                        }}>
                            <View style={!rentOpen ? styles.openBtn : styles.closeBtn}>
                                <Text style={!rentOpen ? styles.openText : styles.closeText}>Rent</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setSaleOpen(!saleOpen)
                            dispatch(setHouseSaleCostAction(""))
                        }}
                            style={saleOpen ? styles.openBtn : styles.closeBtn}
                        >
                            <View style={!saleOpen ? styles.openBtn : styles.closeBtn}>
                                <Text style={!saleOpen ? styles.openText : styles.closeText}>Sale</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.btnsContainer}>

                        {rentOpen ? <View style={styles.itemsContainer}>
                            <TextInput
                                placeholder='$'
                                placeholderTextColor='#808e9b'
                                style={styles.numberInput}
                                keyboardType="number-pad"
                                onChangeText={(prev) => dispatch(setHouseRentCostAction(prev))}
                                value={rentCost}
                            />
                            {rentCost ? <Text style={styles.numberInput}>$</Text> : null}
                        </View>
                            : <View></View>}

                        {saleOpen ? <View style={styles.itemsContainer}>
                            <TextInput
                                placeholder='$'
                                placeholderTextColor='#808e9b'
                                style={styles.numberInput}
                                keyboardType="number-pad"
                                onChangeText={(prev) => dispatch(setHouseSaleCostAction(prev))}
                                value={saleCost}
                            />
                            {saleCost ? <Text style={styles.numberInput}>$</Text> : null}
                        </View>
                            : <View></View>}
                    </View>

                    {errMsg ? <Text style={{ color: "red" }}>{errMsg}</Text> : null}

                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                        <View></View>

                        <TouchableOpacity onPress={addHouse} >
                            <View style={styles.saveBtn}><Text style={styles.saveTxt}>+</Text></View>
                        </TouchableOpacity>
                    </View>



                    {offers.length ?
                        <View style={{
                            marginTop: 30,
                            width: "100%",
                        }}>
                            <Text style={styles.title}>Offers</Text>
                        </View>
                        : null}

                    <View>
                        {offers.map(offer => <HouseItem
                            key={offer._id}
                            data={offer}
                            isAdmin={true}
                        />)}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdminScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: THEMES.BACKGROUND,
        alignItems: "center",
        minHeight: Dimensions.get('window').height
    },
    photo: {
        borderRadius: 16,
        width: 280,
        height: 210,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 2,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#808e9b',
    },
    openBtn: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEMES.PINK,
        borderRadius: 10,
    },
    openText: {
        color: "white",
        fontSize: 18,
        fontFamily: "Montserrat-Regular",
    },
    closeBtn: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
    closeText: {
        color: THEMES.PINK,
        fontSize: 18,
        fontFamily: "Montserrat-Bold",
    },

    numberInput: {
        height: 45,
        color: 'white',
        fontSize: 40
    },
    btnsContainer: {
        flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-around", marginTop: 15
    },

    itemsContainer: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#333"
    },
    saveBtn: {
        borderRadius: 6,
        backgroundColor: "#82E0AA",
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginTop: 25,
    },
    saveTxt: {
        color: "white",
        fontSize: 36,
        fontFamily: "Montserrat-Bold",
    },
    title: {
        textAlign: 'left',
        color: 'white',
        fontSize: 32,
        fontFamily: "Montserrat-Bold",
    }
})