import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from '../firebase/firebaseConfig';
import customTheme from "../theme/Theme";

function IngresarCart() {
    const [cartilla, setcartilla] = useState({
        Nºcart: '',
    });

    const cambios = (e: any) => {
        setcartilla(cartilla => ({
            ...cartilla,
            Nºcart: e
        }));
    }

    const BuscarUsuarioCartilla = async (numCartilla: string) => {
        try {
            const query = await getDocs(collection(db, "usuarios"));
            let UsuarioExiste = false;

            query.forEach((doc) => {
                const DatosDelusuario = doc.data();
                if (DatosDelusuario.NumCartilla === cartilla.Nºcart) {
                    UsuarioExiste = true;
                }
            });

            if (UsuarioExiste) {
                router.push({ pathname: "/pages/SeleccionConReceta", params: { numCartilla: cartilla.Nºcart } });
            } else {
                setError("No se ha encontrado su cartilla");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const aceptar = () => {
        BuscarUsuarioCartilla(cartilla.Nºcart);
    };

    const cancelar = () => {
        router.push("/pages/Home")
    }

    const [error, setError] = useState("");

    return (
        <View style={styles.container}>

            <Text style={styles.label}>Ingrese el número de su cartilla sanitaria</Text>


            <TextInput placeholder="Nº Cartilla" value={cartilla.Nºcart} onChangeText={cambios} style={styles.input} />

            {error !== "" && <Text style={styles.error}>{error}</Text>}

            <View style={{ flexDirection: 'column', gap: customTheme.spacing(2)  }}>

                <Pressable style={styles.button} onPress={aceptar}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>
                
                <Pressable style={[styles.buttonCancelar]} onPress={cancelar}>
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
        flexDirection: "row",
        width: "80%",
        paddingVertical: customTheme.spacing(2),
        borderRadius: 10,
        marginBottom: customTheme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
    },

    buttonCancelar: {
        backgroundColor: customTheme.colors.error,
        flexDirection: "row",
        width: "80%",
        paddingVertical: customTheme.spacing(2),
        borderRadius: 10,
        marginBottom: customTheme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: customTheme.colors.textSecondary,
        fontSize: customTheme.fontSize.normal,
        fontWeight: "bold",
        flex: 1,
        textAlign:"center",
    },

    error: {
        color: customTheme.colors.error,
        fontSize: customTheme.fontSize.small,
        marginBottom: customTheme.spacing(1),
        textAlign: "center",
    },
});

export default IngresarCart;