import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { setEmailAction, setPasswordAction } from './../store/RegistrationReducer';
import { authAPI } from '../core/API';
import THEMES from './../core/THEMES';

const SignInScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.RegistrationReducerName.email);
    const password = useSelector((state) => state.RegistrationReducerName.password);

    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        try {
            if (!isFocused) {
                dispatch(setEmailAction(""))
                dispatch(setPasswordAction(""))
                setErrMsg("")
            }
        } catch (e) { console.log(e) }
    }, [isFocused])


    const signIn = () => {
        try {
            const auth = new authAPI()
            auth.SignIn().then(res => {
                if (res.status === 200) {
                    navigation.navigate("MainScreen")
                }
                else {
                    dispatch(setPasswordAction(""))
                    setErrMsg(res.message)
                }
            })
        } catch (e) { console.log(e) }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.loginText}>Login</Text>

            <TextInput
                placeholder='Email'
                placeholderTextColor='#808e9b'
                style={styles.input}
                autoCapitalize={"none"}
                autoCorrect={false}
                autoCompleteType='email'
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText={(prev) => dispatch(setEmailAction(prev))}
                value={email}
            />

            <TextInput
                placeholder='Password'
                placeholderTextColor='#808e9b'
                style={styles.input}
                autoCapitalize={"none"}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={(prev) => dispatch(setPasswordAction(prev))}
                value={password}
            />
            {errMsg ? <Text style={styles.errText}>{errMsg}</Text> : null}
            <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signUpTextView}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
                    <Text style={[styles.signUpText, { color: THEMES.PINK }]}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: THEMES.BACKGROUND
    },
    welcomeText: {
        fontSize: 30,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: "Montserrat-Bold"
    },
    loginText: {
        color: '#fff',
        fontSize: 28,
        fontFamily: "Montserrat-Bold",
        marginTop: 20,
        marginBottom: 10,
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
    loginButton: {
        backgroundColor: '#833471',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 20,
    },
    loginButtonText: {
        fontSize: 20,
        color: '#fafafa',
        alignSelf: 'center',
        fontFamily: "Montserrat-Regular",
    },
    signUpTextView: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpText: {
        color: '#808e9b',
        fontSize: 20,
        fontFamily: "Montserrat-Regular",
    },
    errText: {
        color: "red",
        marginTop: 10,
    }
});