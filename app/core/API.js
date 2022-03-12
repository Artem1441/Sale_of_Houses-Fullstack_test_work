import axios from "axios";
import CONSTS from "./CONSTS";
import store from './../store/index';
import { setTokkenAction } from "../store/RegistrationReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAdminAction } from './../store/RegistrationReducer';
import { setOffersAction, removeOfferAction } from './../store/OffersReducer';

export class startAppAPI {
    async SaveJWT(jwtTokken) {
        await store.dispatch(setTokkenAction(jwtTokken))
    }
}

export class authAPI {
    async SignUp() {
        const state = store.getState();
        const email = state.RegistrationReducerName.email;
        const password = state.RegistrationReducerName.password;
        return await axios.post(`${CONSTS.BACKEND_URL}/SignUp`, { email, password }).then(async res => {
            const { tokken } = res.data
            await store.dispatch(setTokkenAction(tokken))
            await AsyncStorage.setItem('@JWT', tokken);

            return { status: res.status }
        }).catch(err => {
            return { status: err.response.status, message: err.response.data.message }
        })
    }

    async SignIn() {
        const state = store.getState();
        const { email, password } = state.RegistrationReducerName;
        return await axios.post(`${CONSTS.BACKEND_URL}/SignIn`, { email, password }).then(async res => {
            const { tokken } = res.data
            await store.dispatch(setTokkenAction(tokken))
            await AsyncStorage.setItem('@JWT', tokken);
            return { status: res.status }
        }).catch(err => {
            return { status: err.response.status, message: err.response.data.message }
        })
    }

    async SignOut() {
        store.dispatch(setTokkenAction(""))
        store.dispatch(setAdminAction(false))
        AsyncStorage.removeItem('@JWT');
        return true
    }

    async StartApp(jwtTokken) {
        const jwt = await AsyncStorage.getItem("@JWT")

        return await axios.get(`${CONSTS.BACKEND_URL}/test`, {
            headers: {
                'Authorization': `Bearer ${jwtTokken}`,
            }
        }).then(res => {
            return { status: res.status, result: res.data }
        }).catch(err => {
            return { status: err.response.status, result: err.response.data.message }
        })
    }
}

export class offersAPI {
    async GetOffers() {
        const state = store.getState();
        const { tokken } = state.RegistrationReducerName

        const result = await axios.get(`${CONSTS.BACKEND_URL}/GetHouses`, {
            headers: {
                'Authorization': `Bearer ${tokken}`
            }
        })

        if (result.status === 200) store.dispatch(setOffersAction(result.data))

        else return false

        return true
    }
}

export class adminAPI {
    async AddHouse() {
        const state = store.getState();
        const { tokken } = state.RegistrationReducerName
        const { name, image, description, rentCost, saleCost } = state.OffersReducerName

        return await axios.post(`${CONSTS.BACKEND_URL}/AddHouse`, {
            name, image, description, rentCost, saleCost
        }, {
            headers: {
                'Authorization': `Bearer ${tokken}`
            }
        }).then((res) => {
            return { status: res.status }
        }).catch((err) => {
            console.log(err)
            return { status: err.response.status, message: err.response.data.message }
        })
    }

    async RemoveHouse(_id) {
        const state = store.getState();
        const { tokken } = state.RegistrationReducerName

        return await axios.post(`${CONSTS.BACKEND_URL}/RemoveHouse`, { _id }, {
            headers: {
                'Authorization': `Bearer ${tokken}`
            }
        }).then((res) => {
            store.dispatch(removeOfferAction(_id))
            return { status: res.status }
        }).catch((err) => {
            console.log(err)
            return { status: err.response.status, message: err.response.data.message }
        })
    }
}