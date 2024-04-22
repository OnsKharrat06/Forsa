import axios from "axios";
import  AsyncStorage  from "@react-native-async-storage/async-storage";

export const setToken = async (token) => {
    await AsyncStorage.setItem("token",token);
    axios.defaults.headers["Authorization"] = "Bearer "+ token;
}

export const getToken = async () =>{
    console.log("starting get token");
    try {
        const storage = await AsyncStorage.getItem("token");
        return storage;
    } catch (error) {
        console.error("error getting token", error);
    }
    return null;
}

export const logOut = async () => {
    try {
        await AsyncStorage.removeItem("token");
        axios.defaults.headers["Authorization"] = "";
    } catch (error) {
        
    }
}