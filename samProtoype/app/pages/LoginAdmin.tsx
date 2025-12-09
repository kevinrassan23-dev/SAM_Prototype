import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Menu from "../components/Menu";

export default function adminlogin() {
    const [admin, setadmin] = useState({
        usuario: '',
        contraseña: ''
    });

    const cambiousuario = (e: any) => {
        setadmin(admin => ({
            ...admin,
            usuario: e,
        }));
    }

    const cambiocontraseña = (e: any) => {
        setadmin(admin => ({
            ...admin,
            contraseña: e
        }));
    }

    const Registrarse = () => {
        console.log(admin)
        router.push("/pages/AdminSam")
    }

    const cancelar = () => {
        router.push("/pages/Home")
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Menu />

            <Text style={{ marginBottom: 25, fontSize: 20 }}>Ingrese su nombre y contraseña de administrador</Text>

            <TextInput placeholder="Nombre" value={admin.usuario} onChangeText={cambiousuario} style={{ borderWidth: 1, width: 300, fontSize: 30 }} />

            <TextInput placeholder="Contraseña" value={admin.contraseña} onChangeText={cambiocontraseña} style={{ marginTop: 25, borderWidth: 1, width: 300, fontSize: 30 }} />

            <View style={{ flexDirection: "row" }}>
                <Button style={{ marginTop: 25, marginRight: 35, width: 150 }} onPress={cancelar}>Cancelar</Button>

                <Button style={{ marginTop: 25, width: 150 }} onPress={Registrarse}>Registrarse</Button>
            </View>
        </View>
    );
}