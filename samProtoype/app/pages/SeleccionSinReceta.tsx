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
                        <Text>No hay medicamentos disponibles a su numero de cartilla</Text>
                    ) : (
                        medicamentos.map((item) => (
                            <View key={item.id} style={styles.checkItem}>
                                <CheckBox isChecked={MedElegido.includes(item.id)} onClick={() => checks(item.id)} />
                                <Text style={styles.checkboxText}>{`${item.Nombre} (${item.Tipo}, ${item.Marca}) ${item.Precio}€`}</Text>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>

            <Text style={styles.total}>Total: {total}€</Text>

            <View style={{ flexDirection: 'column', gap: customTheme.spacing(1) }}>

                <Pressable style={[styles.button, { backgroundColor: MedElegido.length === 0 ? '#ccc' : customTheme.colors.secondary },]} onPress={aceptar} disabled={MedElegido.length === 0}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>

                <Pressable style={[styles.buttonCancelar]} onPress={cancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
            </View>
        </View >
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
        textAlign: "center",
        marginBottom: customTheme.spacing(3),
        color: customTheme.colors.primary,
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
        flexDirection: "row",
        alignItems: "center",
        marginVertical: customTheme.spacing(1),
    },

    checkboxText: {
        marginLeft: customTheme.spacing(1),
        fontSize: customTheme.fontSize.normal,
        color: customTheme.colors.textPrimary,
    },

    total: {
        marginTop: customTheme.spacing(3),
        fontSize: customTheme.fontSize.normal,
        fontWeight: "bold",
        color: customTheme.colors.primary,
        marginBottom: customTheme.spacing(2),
    },

    button: {
        backgroundColor: customTheme.colors.secondary,
        flexDirection: "row",
        width: "80%",
        paddingVertical: customTheme.spacing(2),
        borderRadius: 10,
        marginBottom: customTheme.spacing(2),
        alignItems: "center",
        justifyContent: "center",
    },

    buttonCancelar: {
        backgroundColor: customTheme.colors.error,
        flexDirection: "row",
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
        flex: 1,
        textAlign:"center",
    },
});

export default SeleccionSinReceta;
