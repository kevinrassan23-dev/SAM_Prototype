import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Menu from "../components/Menu";

export default function pagoEfectivo() {
    const [pagos, setpagos] = useState({
        pago: '',
    });

    const cambios = (e: any) => {
        setpagos(pagos => ({
            ...pagos,
            pago: e
        }));
    }


    const aceptar = () => {
        console.log(pagos.pago)
        router.push("/pages/Confirmacion")
    }

    const cancelar = () => {
        router.push("/pages/Home")
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Menu />

            <Text style={{ fontSize: 30 }} >Total a pagar: €</Text>

            <Text style={{ marginBottom: 15, marginTop: 15, fontSize: 25 }} >Ingrese el importe</Text>

            <TextInput placeholder="0.00 €" keyboardType='numeric' value={pagos.pago} onChangeText={cambios} style={{ borderWidth: 1, width: 300, fontSize: 30 }} />

            <View style={{ flexDirection: "row" }}>
                <Button style={{ marginTop: 25, marginRight: 35, width: 150 }} onPress={cancelar}>Cancelar</Button>

                <Button style={{ marginTop: 25, width: 150 }} onPress={aceptar}>Aceptar</Button>
            </View>
        </View>
    );
}