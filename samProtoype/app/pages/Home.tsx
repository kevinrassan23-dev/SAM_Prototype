import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import { Text, View } from "react-native";
import Menu from "../components/Menu";

export default function home() {


    const receta = () => {
        router.push("/pages/IngresarCartilla")
    }
    const sinreceta = () => {
        router.push("/pages/IngresarDni")
    }

    const admin = () => {
        router.push("/pages/LoginAdmin")
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Menu />

            <Text style={{ marginBottom: 25, fontSize: 20 }}>Home</Text>

            <View style={{ flexDirection: "row" }}>
                <Button style={{ marginTop: 25, width: 150 }} onPress={receta}>receta</Button>
                <Button style={{ marginTop: 25, width: 150 }} onPress={sinreceta}>sin receta</Button>
                <Button style={{ marginTop: 25, width: 150 }} onPress={admin}>admin</Button>
            </View>
        </View>
    );
}