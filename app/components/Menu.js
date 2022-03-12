import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import THEMES from './../core/THEMES';
import { authAPI } from "../core/API";

const Menu = ({ navigation }) => {
    const tokken = useSelector((state) => state.RegistrationReducerName.tokken);
    const admin = useSelector((state) => state.RegistrationReducerName.admin);

    return (
        <View style={styles.menu}>

            <View>
                <Image
                    source={require("../assets/logo.png")}
                    style={{ width: 125, height: 40 }}
                />
            </View>

            <View style={styles.btns}>
                {admin ? <TouchableOpacity onPress={() => navigation.navigate("AdminScreen")} style={{ marginRight: 10 }}>
                    <SimpleLineIcons name="wrench" size={28} color="white" />
                </TouchableOpacity>
                    : null}
                {tokken ? <TouchableOpacity onPress={() => {
                    const auth = new authAPI()
                    auth.SignOut()
                }}>
                    <SimpleLineIcons name="logout" size={28} color="white" />
                </TouchableOpacity> :
                    <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
                        <SimpleLineIcons name="login" size={28} color="white" />
                    </TouchableOpacity>
                }
            </View>

        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    menu: {
        height: THEMES.MENU_HEIGHT,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: THEMES.PINK,
        paddingHorizontal: 10
    },
    btns: {
        flexDirection: "row",
    }
});