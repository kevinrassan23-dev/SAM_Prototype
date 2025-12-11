import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {router} from "expo-router";
import customTheme from "../theme/Theme"


function Confirmacion() {

    const [proceso, setProceso] = useState(1);

    useEffect(() => {
        // Cambiamos al proceso 2 después de 4 segundos
        setTimeout(() => setProceso(2), 4000);

        // Cambiamos al proceso 3 después de 8 segundos
        setTimeout(() => setProceso(3), 8000);

        // Regresamos a home automáticamente después de 15 segundos al terminar el proceso 3
        setTimeout(() => {
            router.push("/pages/Home");

        }, 15000);

    }, []);

    return(

        <View style={styles.container}>
            <Text style={styles.titulo}>Estado del Pedido</Text>

            {/* Proceso 1: procesamos pedido cambiando a estado inicial */}
            <View style={styles.item}>

                <Text style={styles.texto}>
                    Procesando pedido...
                </Text>

                {proceso === 1 && <ActivityIndicator size="small" />}
                {proceso > 1 && <Text style={styles.check}>✔</Text>}
            </View>

            {/* Proceso 2: el estado del pedido cambia a cargando se está a punto de entregar */}
            <View style={styles.item}>

                <Text style={styles.texto}>
                    Cargando pedido para la entrega...
                </Text>

                {proceso === 2 && <ActivityIndicator size="small" />}
                {proceso > 2 && <Text style={styles.check}>✔</Text>}
            </View>

            {/* Proceso 3: El estado del pedido cambia a entregado (su estado final) */}
            <View style={styles.item}>

                <Text style={styles.texto}>
                    Pedido entregado
                </Text>

                {proceso === 3 && <Text style={styles.check}>✔</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: customTheme.spacing(2),
        backgroundColor: customTheme.colors.background,
    },

    titulo: {
        fontSize: customTheme.fontSize.title,
        fontWeight: "bold",
        color: customTheme.colors.primary,
        marginBottom: customTheme.spacing(2),
        textAlign: "center",
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: customTheme.colors.background,
        borderWidth: 2,
        borderColor: customTheme.colors.secondary,
        padding: customTheme.spacing(2),
        borderRadius: 12,
        marginBottom: customTheme.spacing(2),
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },

    texto: {
        fontSize: customTheme.fontSize.normal,
        color: customTheme.colors.primary,
        fontWeight: "500",
    },

    check: {
        fontSize: customTheme.fontSize.large,
        fontWeight: "bold",
        color: customTheme.colors.secondary,
    }
});

export default Confirmacion;
