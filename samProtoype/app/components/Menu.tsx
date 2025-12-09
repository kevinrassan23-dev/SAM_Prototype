import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Appbar, Drawer } from 'react-native-paper';


export default function Menu() {

    const [menuNav, setmenuNav] = useState(false)

    const menudenavgacion = () => {
        setmenuNav(!menuNav)
        if (!menuNav) setmenuAdminuser(false);
    }

    const [menuAdminuser, setmenuAdminuser] = useState(false)

    return (
        <View style={{ flex: 1, alignItems: "center", position: "absolute", top: 0, left: 0, right: 0, zIndex: 1, elevation: 1 }}>
            <Appbar.Header>
                <Appbar.Action icon="magnify" onPress={menudenavgacion} />
                <Appbar.Content title="Barra de navegación del administrador" />
                <Appbar.Action icon="logout"  />
            </Appbar.Header>


            {menuNav && (
                <View>
                    <Drawer.Section style={{ backgroundColor: "white", marginRight: 160, zIndex: 1, elevation: 1 }}>
                        <Drawer.Item label="Home" onPress={() => router.push("/pages/Home")} />
                        <Drawer.Item label="Ingresar cartilla" onPress={() => router.push("/pages/IngresarCartilla")} />
                        <Drawer.Item label="Ingresar D.N.I" onPress={() => router.push("/pages/IngresarDni")} />
                        <Drawer.Item label="Selecionar Medicamentos(receta)" onPress={() => router.push("/pages/SeleccionConReceta")} />
                        <Drawer.Item label="Selecionar Medicamentos(sin receta)" onPress={() => router.push("/pages/SeleccionSinReceta")} />
                        <Drawer.Item label="Forma de pago" onPress={() => router.push("/pages/FormaPago")} />
                        <Drawer.Item label="Efectivo" onPress={() => router.push("/pages/PagoEfectivo")} />
                        <Drawer.Item label="Tarjeta" onPress={() => router.push("/pages/PagoTarjeta")} />
                        <Drawer.Item label="confirmación" onPress={() => router.push("/pages/Confirmacion")} />
                        <Drawer.Item label="login" onPress={() => router.push("/pages/LoginAdmin")} />
                        <Drawer.Item label="Añadir al sam" onPress={() => router.push("/pages/AdminSam")} />
                    </Drawer.Section>
                </View>
            )}
        </View>
    );
}
