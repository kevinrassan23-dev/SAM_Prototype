import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Menu from "../components/Menu";

export default function IngresarCart() {
    const [cartilla, setcartilla] = useState({
        Nºcart: '',
    });

    const cambios = (e: any) => {
        setcartilla(cartilla => ({
            ...cartilla,
            Nºcart: e
        }));
    }


    const aceptar = () => {
        console.log(cartilla.Nºcart)
        router.push("/pages/SeleccionConReceta")
    }

    const cancelar = () => {
        router.push("/pages/Home")
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Menu />

            <Text style={{ marginBottom: 25, fontSize: 20 }}>Ingrese el número de su cartilla sanitaria</Text>

            <TextInput placeholder="Nº Cartilla" value={cartilla.Nºcart} onChangeText={cambios} style={{ borderWidth: 1, width: 300, fontSize: 30 }} />

            <View style={{ flexDirection: "row" }}>
                <Button style={{ marginTop: 25, marginRight: 35, width: 150 }} onPress={cancelar}>Cancelar</Button>

                <Button style={{ marginTop: 25, width: 150 }} onPress={aceptar}>Aceptar</Button>

            </View>
        </View>
    );
}