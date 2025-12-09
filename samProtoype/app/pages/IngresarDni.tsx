import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import customTheme from "../theme/Theme";

// Importamos el tema

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
                paddingVertical: customTheme.spacing(2),
                borderRadius: 8,
                marginBottom: customTheme.spacing(2),
                alignItems: "center",
                justifyContent: "center",
            },

            buttonCancelar: {
                backgroundColor: customTheme.colors.error,
                paddingVertical: customTheme.spacing(2),
                borderRadius: 8,
                marginTop: customTheme.spacing(1),
                alignItems: "center",
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

    });

function IngresarDni() {

    const [dni, setDni] = useState("");
    const [error, setError] = useState("");

    const validadDNI = () => {

        const regex = /^[0-9]{8}[A-Za-z]$/;

        if (!regex.test(dni)) {
            setError("Debe ingresar un formato de DNI válido");
            return false;
        }

        const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        const numero = parseInt(dni.substring(0,8));
        const letraCorrecta = letras[numero % 23];

        if (dni[8].toUpperCase() !== letraCorrecta) {
            setError("ERROR: los datos no coinciden");

            return false;
        }

        setError("");
        return true;
    };

    const handleContinue = () => {

        if (validadDNI()) {

            console.log("DNI correcto: ", dni);
            // Aquí tengo que comprobar que esté registrado en el backend (investigar)


            // Navegamos a la siguiente página
            router.push("/pages/SeleccionSinReceta")
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Introduzca su DNI:</Text>

            <TextInput
                style={styles.input}
                placeholder=" Ejemplo: (12345678Z)"
                value={dni}
                onChangeText={setDni}
                autoCapitalize="characters"
                maxLength={9}
            />

            {error !== "" && <Text style={styles.error}>{error}</Text>}

            <Pressable style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continuar</Text>
            </Pressable>

            {/* Volvemos a home */}
            <Pressable style={styles.buttonCancelar} onPress={() => router.push("/pages/Home")}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
        </View>
    );
}


export default IngresarDni;
