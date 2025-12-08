import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import { Text, View } from "react-native";
import Menu from "../components/Menu";

export default function SeleccionSinReceta() {


    const aceptar = () => {
        router.push("/pages/FormaPago")
    }

    const cancelar = () => {
        router.push("/pages/Home")
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Menu />

            <Text style={{ marginBottom: 25, fontSize: 20 }}>SeleccionSinReceta</Text>

            <View style={{ flexDirection: "row" }}>
                <Button style={{ marginTop: 25, width: 150 }} onPress={aceptar}>aceptar</Button>
                <Button style={{ marginTop: 25, width: 150 }} onPress={cancelar}>cancelar</Button>
            </View>
        </View>
    );
}