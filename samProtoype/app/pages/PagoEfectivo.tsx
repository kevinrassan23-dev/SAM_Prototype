import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
        <View style={styles.container}>

            <Text style={styles.label}>Total a pagar: €</Text>

            <Text style={styles.label}>Ingrese el importe</Text>

            <TextInput placeholder="0.00 €" keyboardType='numeric' value={pagos.pago} onChangeText={cambios} style={styles.input} />

            <View>

                <Pressable style={styles.buttonCancelar} onPress={cancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={aceptar}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>

            </View>
        </View>
    );
}