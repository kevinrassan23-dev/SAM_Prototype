import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import { Text, View } from "react-native";
import Menu from "../components/Menu";

export default function FormasPago() {

    const efectivo = () => {
        router.push("/pages/PagoEfectivo");
    }

    const tarjeta = () => {
        router.push("/pages/PagoTarjeta")
    }

    const cancelar = () => {
        router.push("/pages/Home")
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Menu />

            <Text style={{ marginBottom: 25, fontSize: 40 }}>¿Como desea pagar?</Text>

            <Button style={{ marginTop: 25, width: 300 }} onPress={efectivo}>Efectivo</Button>
            <Button style={{ marginTop: 25, width: 300 }} onPress={tarjeta}>Tarjeta</Button>
            <Button style={{ marginTop: 25, width: 300 }} onPress={cancelar}>Cancelar</Button>

        </View>
    );
}