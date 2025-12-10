import { router, useLocalSearchParams } from "expo-router";
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
        width: "100%",
        backgroundColor: customTheme.colors.secondary,
        paddingVertical: customTheme.spacing(2),
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: customTheme.spacing(1),
    },

    buttonCancelar: {
        width: "100%",
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
    error: {
        color: customTheme.colors.error,
        fontSize: customTheme.fontSize.small,
        marginBottom: customTheme.spacing(1),
        textAlign: "center",
    },
});

function pagoEfectivo() {

    const [cambio, setcambio] = useState("");

    const { total } = useLocalSearchParams();

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

        if (pagoN > totalN) {
            const diferencia = pagoN - totalN;
            setcambio(`Devolviendo ${diferencia}€`);
            setTimeout(() => { router.push("/pages/Confirmacion") }, 2000);
        } else {
            router.push("/pages/Confirmacion")
        }
    }

    const cancelar = () => {
        router.push("/pages/Home")
    }

    const totalN = parseFloat(total as string) || 0;
    const pagoN = parseFloat(pagos.pago) || 0;
    const pagovalido = pagoN >= totalN;
    return (
        <View style={styles.container}>

            <Text style={styles.label}>Total a pagar: {total}€</Text>

            <Text style={styles.label}>Ingrese el importe</Text>

            <TextInput placeholder="0.00 €" keyboardType='numeric' value={pagos.pago} onChangeText={cambios} style={styles.input} />

            <View style={{ flexDirection: 'column', gap: customTheme.spacing(2) }}>

                {cambio !== "" && <Text style={styles.error}>{cambio}</Text>}

                <Pressable style={styles.buttonCancelar} onPress={cancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>

                <Pressable style={[styles.button, { backgroundColor: pagovalido ? customTheme.colors.secondary : '#ccc' }]} onPress={aceptar} disabled={!pagovalido}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>

            </View>
        </View>
    );
}

export default pagoEfectivo;