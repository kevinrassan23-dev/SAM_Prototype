import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import customTheme from "../theme/Theme";
import CheckBox from "react-native-check-box";


function SeleccionSinReceta() {
    const aceptar = () => {
        router.push({ pathname: "/pages/FormaPago", params: { total } });
    }
    
    const cancelar = () => {
        router.push("/pages/Home")
    }

    const [medicamentos, setMedicamentos] = useState<any[]>([]);

    const [MedElegido, setMedElegido] = useState<string[]>([]);

    const checks = (ID_Medicamento: string) => {
        setMedElegido((estadoAnterior) => {
            if (estadoAnterior.includes(ID_Medicamento)) {
                return estadoAnterior.filter((id) => id !== ID_Medicamento);
            }
            return [...estadoAnterior, ID_Medicamento];
        });
    };

    const MostrarMedicamentos = async () => {
        try {
            const query = await getDocs(collection(db, "Medicamentos"));
            const meds: any[] = [];

            query.forEach((doc) => {
                const data = doc.data();
                meds.push({
                    ...data,
                    id: doc.id,
                    Nombre: data.Nombre,
                    Marca: data.Marca,
                    Tipo: data.Tipo,
                    Precio: Number(data.Precio),
                });
            });

            setMedicamentos(meds);
        } catch (err) {
            console.error("No se encontraron medicamentos: ", err);
        }
    };

    useEffect(() => {
        MostrarMedicamentos();
    },[])

    const total = medicamentos
    .filter((medicamento) => MedElegido.includes(medicamento.id))
    .reduce((suma, medicamento) => suma + medicamento.Precio, 0);


    return (
        <View style={styles.container}>

            <Text style={styles.title}>Medicamentos Disponibles</Text>

            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    {medicamentos.length === 0 ? (
                        <Text>No hay medicamentos disponibles</Text>
                    ) : (
                        medicamentos.map((item) => (
                            <View key={item.id} style={styles.checkItem}>
                                <CheckBox isChecked={MedElegido.includes(item.id)} onClick={() => checks(item.id)} rightText={` ${item.Nombre} (${item.Tipo}, ${item.Marca})  ${item.Precio}€ `} rightTextStyle={styles.checkboxText}
                                />
                            </View>
                        ))
                    )}

                </ScrollView>
            </View>

            <Text style={styles.total}>Total: {total} €</Text>

            <View>
                <Pressable style={[styles.buttonCancelar]} onPress={cancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={aceptar}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>
            </View>
        </View >
    );
}

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
        color: customTheme.colors.primary,
        marginVertical: customTheme.spacing(3),
        textAlign: "center",
    },

    listContainer: {
        width: "90%",
        height: 450,
        borderWidth: 2,
        borderColor: customTheme.colors.primary,
        borderRadius: 10,
        backgroundColor: "#fff",
        paddingVertical: customTheme.spacing(1),
    },

    scrollContent: {
        alignItems: "flex-start",
        paddingHorizontal: customTheme.spacing(2),
    },

    checkItem: {
        marginVertical: customTheme.spacing(1),
    },

    checkboxText: {
        color: customTheme.colors.textPrimary,
        fontSize: customTheme.fontSize.normal,
        marginLeft: customTheme.spacing(1),
    },

    total: {
        marginTop: customTheme.spacing(3),
        fontSize: customTheme.fontSize.normal,
        color: customTheme.colors.primary,
        fontWeight: "bold",
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
});

export default SeleccionSinReceta;
