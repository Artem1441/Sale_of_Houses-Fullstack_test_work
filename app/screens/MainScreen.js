import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react"
import { authAPI, offersAPI } from './../core/API';
import { useSelector, useDispatch } from 'react-redux';
import { setAdminAction } from './../store/RegistrationReducer';
import Menu from './../components/Menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import HouseItem from '../components/HouseItem';
import THEMES from './../core/THEMES';

const MainScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const tokken = useSelector((state) => state.RegistrationReducerName.tokken);
    const offers = useSelector((state) => state.OffersReducerName.offers);
    const [isReady, setIsReady] = useState(false);
    const [errMsg, setErrMsg] = useState("")

    useEffect(async () => {
        try {
            const auth = new authAPI()
            const offers = new offersAPI()
            const { result, status } = await auth.StartApp(tokken)

            status !== 200 ? setErrMsg(result) : dispatch(setAdminAction(result.admin))

            status === 200 && offers.GetOffers()

            setIsReady(true)
            !isFocused && setErrMsg("")
        } catch (e) { console.log(e) }

    }, [isFocused, tokken])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Menu navigation={navigation} />
            <ScrollView>
                <View style={styles.container}>

                    {isReady
                        ?
                        <>
                            {errMsg
                                ?
                                <View style={styles.center}>
                                    <Text style={styles.errMsg}>{errMsg}</Text>
                                </View>
                                :
                                <>
                                    {offers.length ?
                                        <View style={styles.flatlist}>
                                            {offers.map(offer => <HouseItem
                                                key={offer._id}
                                                data={offer}
                                            />)}
                                        </View>
                                        : <View style={styles.center}>
                                            <Text style={styles.errMsg}>No offers yet</Text>
                                        </View>}
                                </>
                            }
                        </>
                        :
                        <View style={styles.center}>
                            <ActivityIndicator size="large" color="#C262C4" />
                        </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEMES.BACKGROUND,
        alignItems: "center",
        minHeight: Dimensions.get('window').height - THEMES.MENU_HEIGHT
    },
    flatlist: {
        marginVertical: 15,
        paddingHorizontal: 10,
        width: "100%",
    },
    center: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    errMsg: {
        fontSize: 20,
        color: "white",
        fontFamily: "Montserrat-Regular"
    }
})