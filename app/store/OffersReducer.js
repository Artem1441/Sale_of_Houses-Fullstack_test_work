const RESET_ADMIN = "RESET_ADMIN"

const SET_NAME = "SET_NAME"
const SET_IMAGE = "SET_IMAGE"
const SET_DESCR = "SET_DESCR"
const SET_RENT_COST = "SET_RENT_COST"
const SET_SALE_COST = "SET_SALE_COST"

const SET_OFFERS = "SET_OFFERS"
const REMOVE_OFFER = "REMOVE_OFFER"

const defaultState = {
    name: "",
    image: "",
    description: "",
    rentCost: "",
    saleCost: "",
    offers: [],
};

const OffersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case RESET_ADMIN: {
            return {
                ...state,
                name: "",
                image: "",
                description: "",
                rentCost: "",
                saleCost: "",
            };
        }
        case SET_NAME: {
            return {
                ...state,
                name: action.payload,
            };
        }
        case SET_IMAGE: {
            return {
                ...state,
                image: action.payload,
            };
        } case SET_DESCR: {
            return {
                ...state,
                description: action.payload,
            };
        } case SET_RENT_COST: {
            return {
                ...state,
                rentCost: action.payload,
            };
        } case SET_SALE_COST: {
            return {
                ...state,
                saleCost: action.payload,
            };
        } case SET_OFFERS: {
            return {
                ...state,
                offers: [...action.payload],
            };
        } case REMOVE_OFFER: {
            return {
                ...state,
                offers: [...state.offers.filter(item => item._id !== action.payload)],
            };
        }
        default:
            return state;
    }
}

export default OffersReducer;


export const setHouseResetAdminAction = () => ({
    type: RESET_ADMIN,
});

export const setHouseNameAction = (str) => ({
    type: SET_NAME,
    payload: str,
});

export const setHouseImageAction = (str) => ({
    type: SET_IMAGE,
    payload: str,
});

export const setHouseDescriptionAction = (str) => ({
    type: SET_DESCR,
    payload: str,
});

export const setHouseRentCostAction = (number) => ({
    type: SET_RENT_COST,
    payload: number,
});

export const setHouseSaleCostAction = (number) => ({
    type: SET_SALE_COST,
    payload: number,
});

export const setOffersAction = (arr) => ({
    type: SET_OFFERS,
    payload: arr,
});

export const removeOfferAction = (id) => ({
    type: REMOVE_OFFER,
    payload: id,
});

