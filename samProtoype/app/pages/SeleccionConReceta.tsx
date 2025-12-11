import { router, useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
import { db } from '../firebase/firebaseConfig';
import customTheme from "../theme/Theme";


function selecionarconreceta() {

    const { numCartilla } = useLocalSearchParams();

    const aceptar = () => {
        router.push({ pathname: "/pages/FormaPago", params: { total } });
    }

    const cancelar = () => {
        router.push("/pages/Home")
    }

    const [medicamentos, setMedicamentos] = useState<any[]>([]);

    const [MedElegido, setMedElegido] = useState<string[]>([]);

    const [total, setTotal] = useState(0);

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
            const statement = query(
                collection(db, "Medicamentos"), where("Cartilla_Asociada", "==", numCartilla)
            );

            const querys = await getDocs(statement);
            const medicamentos: any[] = [];

            querys.forEach((doc) => {
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

    useEffect(() => {
        const nuevoTotal = MedElegido.reduce((sum, medId) => {
            const medicamento = medicamentos.find(med => med.id === medId);
            return medicamento ? sum + medicamento.Precio : sum;
        }, 0);
        setTotal(nuevoTotal);
    }, [MedElegido, medicamentos]);

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

            <View style={{ flexDirection: 'column', gap: customTheme.spacing(2) }}>
                <Pressable style={[styles.buttonCancelar]} onPress={cancelar}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>

                <Pressable style={[styles.button, { backgroundColor: MedElegido.length === 0 ? '#ccc' : customTheme.colors.secondary },]} onPress={aceptar} disabled={MedElegido.length === 0}>
                    <Text style={styles.buttonText}>Aceptar</Text>
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
        color: customTheme.colors.primary,
        marginVertical: customTheme.spacing(3),
        textAlign: "center",
    },

    listContainer: {
        justifyContent: "center",
        alignContent: "center",
        width: "90%",
        height: 450,
        borderWidth: 2,
        borderColor: customTheme.colors.primary,
        borderRadius: 10,
        backgroundColor: "#fff",
        paddingVertical: customTheme.spacing(1),
    },

    scrollContent: {
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: customTheme.spacing(2),
    },

    checkItem: {
        flexDirection: "row",
        marginVertical: customTheme.spacing(1),
        justifyContent: "center",
        alignContent: "center",
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
        width: "100%",
    },

    buttonCancelar: {
        backgroundColor: customTheme.colors.error,
        paddingVertical: customTheme.spacing(2),
        borderRadius: 8,
        marginTop: customTheme.spacing(1),
        alignItems: "center",
        width: "100%",
    },

    buttonText: {
        color: customTheme.colors.textSecondary,
        fontSize: customTheme.fontSize.normal,
        fontWeight: "bold",
    },
});

export default selecionarconreceta;