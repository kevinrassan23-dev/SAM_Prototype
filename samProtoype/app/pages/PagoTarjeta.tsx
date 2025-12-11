import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import customTheme from "../theme/Theme";

function PagoTarjeta() {

    const { total } = useLocalSearchParams();

    const [tarjeta, setTarjeta] = useState("");
    const [error, setError] = useState("");

    const validarTarjeta = (value: string) => {
        setTarjeta(value);

        if (!/^\d*$/.test(value)) {
                setError("Solo se permiten números");
            return false;
        }

        if (value.length != 4) {
                setError("Ingrese los 4 dígitos correctos para pagar");
            return false;
        }

        setError("");
        return true;
    };

    const handlePagar = () => {

        if (!validarTarjeta(tarjeta)) {
            return;
        }
        
        console.log("El usuario a pagado con la tarjeta con pin: ", tarjeta);
        router.push("/pages/Confirmacion");

    }

    return (
        <View style={styles.container}>
        
            <Text style={styles.label}>Total a pagar: {total} €</Text>

            <Text style={styles.label}>
                Ingrese el número de la tarjeta:
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Num tarjeta:"
                secureTextEntry={true}
                keyboardType="number-pad"
                value={tarjeta}
                onChangeText={validarTarjeta}
                maxLength={16}
            />

            {error !== "" && <Text style={styles.error}>{error}</Text>}

            <Pressable
                style={[styles.button, error !== "" && styles.buttonDeshabilitado]}
                onPress={handlePagar}
                disabled={error !== ""}
            >
                <Text style={styles.buttonText}>Aceptar</Text>
            </Pressable>

            <Pressable
                style={[styles.button, styles.buttonCancelar]}
                onPress={() => router.push("/pages/Home")}
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>

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
            marginBottom: customTheme.spacing(3),
            textAlign: "center",
            color: customTheme.colors.primary,
        },

        button: {
            backgroundColor: customTheme.colors.secondary,
            width: "80%",
            paddingVertical: customTheme.spacing(2),
            borderRadius: 10,
            marginBottom: customTheme.spacing(2),
            alignItems: "center",
            justifyContent: "center",
        },

        buttonText: {
            color: customTheme.colors.textSecondary,
            fontSize: customTheme.fontSize.normal,
            fontWeight: "bold",
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

        error: {
            color: customTheme.colors.error,
            fontSize: customTheme.fontSize.small,
            marginBottom: customTheme.spacing(1),
            textAlign: "center",
        },

        buttonDeshabilitado: {
            // Añadimos transparencia y opacidad al diseño
            backgroundColor: customTheme.colors.secondary + "55",
            width: "80%",
            paddingVertical: customTheme.spacing(2),
            borderRadius: 10,
            marginBottom: customTheme.spacing(2),
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.6,
        },

        buttonCancelar: {
            backgroundColor: customTheme.colors.error,
            width: "80%",
            paddingVertical: customTheme.spacing(2),
            borderRadius: 10,
            marginBottom: customTheme.spacing(2),
            alignItems: "center",
            justifyContent: "center",
        },

    });

export default PagoTarjeta;
