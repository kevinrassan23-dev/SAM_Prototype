import { router } from "expo-router";
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Menu from "../components/Menu";
import customTheme from "../theme/Theme";

function Home(){
    return(
        <View style={styles.container}>

            {/*Importamos el menú oculto */}
            <Menu/>

            {/* Texto arriba */}
            <Text style={styles.title}>Seleccione una opción:</Text>

            {/* Botones */}
            {/* Usamos router.push(/ruta) para navegar a la siguiente página */}
            <Pressable style={styles.button} onPress={() => router.push("/pages/IngresarCartilla")}>
                <Text style={styles.buttonText}>Con receta</Text>
            </Pressable>

            {/* Usamos router.push(/ruta) para navegar a la siguiente página */}
            <Pressable style={styles.button} onPress={() => router.push("/pages/IngresarDni")}>
                <Text style={styles.buttonText}>Sin receta</Text>
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
            fontWeight: "600",
        },
    });

export default Home;
