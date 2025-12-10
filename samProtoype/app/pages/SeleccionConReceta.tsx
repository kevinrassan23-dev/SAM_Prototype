import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
import { db } from '../firebase/firebaseConfig';
import customTheme from "../theme/Theme";


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

function selecionarconreceta() {

    const aceptar = () => {
        router.push("/pages/FormaPago")
    }

    const cancelar = () => {
        router.push("/pages/Home")
    }

    const [medicamentos, setMedicamentos] = useState<any[]>([]);


    const [MedElegido, setMedElegido] = useState<string[]>([]);

    const checks = (Medi: any) => {
        setMedElegido(MediEstado => {
            if (MediEstado.includes(Medi)) {
                return MediEstado.filter(MediAdded => MediAdded !== Medi);
            }
            return [...MediEstado, Medi];
        });
    };

        const BuscarMedicamentos = async () => {
            try {
                const query = await getDocs(collection(db, "Medicamentos"));
                const medicamentos: any[] = [];
                query.forEach((doc) => {
                    const medicamento = doc.data();
                    medicamentos.push({ ...medicamento, id: doc.id, cartillaAsociada: medicamento.Cartilla_Asociada, Nombre: medicamento.Nombre, Marca: medicamento.Marca, Tipo: medicamento.Tipo, Precio: medicamento.Precio });
                });
                setMedicamentos(medicamentos);
            } catch (err) {
                console.error("No se encontraron medicamentos: ", err);
            }
        };

    useEffect(() => {
        BuscarMedicamentos();
    }, []);

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

            <Text style={styles.total}>Total: €</Text>

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

export default selecionarconreceta;
