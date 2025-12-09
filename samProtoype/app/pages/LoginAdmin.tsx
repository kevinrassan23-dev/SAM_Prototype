import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Menu from "../components/Menu";

import customTheme from "../theme/Theme";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: customTheme.spacing(2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: customTheme.colors.background,
    },

    label: {
        fontSize: customTheme.fontSize.normal,
        fontWeight: "600",
        marginBottom: customTheme.spacing(1),
        color: customTheme.colors.primary,
    },

    input: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: customTheme.colors.primary,
        borderRadius: 8,
        padding: customTheme.spacing(1.5),
        fontSize: customTheme.fontSize.normal,
        color: customTheme.colors.textPrimary,
        marginBottom: customTheme.spacing(2),
    },

    button: {
        backgroundColor: customTheme.colors.secondary,
        paddingVertical: customTheme.spacing(2),
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: customTheme.spacing(1),
    },

    buttonCancelar: {
        backgroundColor: customTheme.colors.error,
        paddingVertical: customTheme.spacing(2),
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: customTheme.spacing(1),
    },

    buttonText: {
        color: customTheme.colors.textSecondary,
        fontSize: customTheme.fontSize.normal,
        fontWeight: "bold",
    },
});


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
        <View style={styles.container}>

            <Menu />

            <Text style={styles.label}>Ingrese su nombre y contraseña de administrador</Text>

            <TextInput placeholder="Nombre" value={admin.usuario} onChangeText={cambiousuario} style={styles.input}/>

            <TextInput placeholder="Contraseña" value={admin.contraseña} onChangeText={cambiocontraseña} style={styles.input}/>

            <View>

                <Pressable style={styles.buttonCancelar} onPress={cancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={Registrarse}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </Pressable>

            </View>
        </View>
    );
}