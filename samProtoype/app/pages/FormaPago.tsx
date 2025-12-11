import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import customTheme from "../theme/Theme";

function FormasPago() {

    const { total } = useLocalSearchParams();

    const efectivo = () => {
        router.push({ pathname: "/pages/PagoEfectivo", params: { total } });
    }

    const tarjeta = () => {
        router.push({ pathname: "/pages/PagoTarjeta", params: { total } });
    }

    const cancelar = () => {
        router.push("/pages/Home")
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>¿Cómo desea pagar?</Text>

            <View style={{ flexDirection: 'column', gap: customTheme.spacing(2) }}>
                <Pressable style={styles.button} onPress={efectivo}>
                    <Text style={styles.buttonText}>Efectivo</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={tarjeta}>
                    <Text style={styles.buttonText}>Tarjeta</Text>
                </Pressable>

                <Pressable style={styles.buttonCancelar} onPress={cancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: customTheme.spacing(2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: customTheme.colors.background,
    },
    title: {
        fontSize: customTheme.fontSize.title,
        fontWeight: "bold",
        color: customTheme.colors.primary,
        marginVertical: customTheme.spacing(3),
        textAlign: "center",
    },

    button: {
        width: "100%",
        backgroundColor: customTheme.colors.secondary,
        paddingVertical: customTheme.spacing(2),
        borderRadius: 8,
        marginTop: customTheme.spacing(2),
        alignItems: "center",
        justifyContent: "center",
    },

    buttonCancelar: {
        width: "100%",
        backgroundColor: customTheme.colors.error,
        paddingVertical: customTheme.spacing(2),
        borderRadius: 8,
        marginTop: customTheme.spacing(2),
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: customTheme.colors.textSecondary,
        fontSize: customTheme.fontSize.normal,
        fontWeight: "bold",
    },
});

export default FormasPago;