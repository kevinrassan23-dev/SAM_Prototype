import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import customTheme from "../theme/Theme";

// Importamos el tema

    const styles = StyleSheet.create({
            container: {
                flex: 1,
                padding: customTheme.spacing(2),
                backgroundColor: customTheme.colors.background,
            },

            categoriaContainer: {
                marginBottom: customTheme.spacing(3),
                padding: customTheme.spacing(2),
                backgroundColor: "#F7F7F7",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: customTheme.colors.primary + "55",
            },

            categoriaTitle: {
                fontSize: customTheme.fontSize.large,
                fontWeight: "bold",
                color: customTheme.colors.primary,
                marginBottom: customTheme.spacing(1),
            },

            // Estilo del Picker (Android requiere wrapper)
            pickerContainer: {
                borderWidth: 1,
                borderColor: customTheme.colors.primary,
                borderRadius: 8,
                backgroundColor: "#fff",
                marginBottom: customTheme.spacing(1),
            },

            picker: {
                height: 45,
                color: customTheme.colors.textPrimary,
            },

            // Contador cantidad
            cantidadContainer: {
                flexDirection: "row",
                alignItems: "center",
                marginTop: customTheme.spacing(1),
            },

            cantidadButton: {
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: customTheme.colors.secondary,
                borderRadius: 6,
            },

            cantidadButtonText: {
                color: customTheme.colors.textSecondary,
                fontSize: customTheme.fontSize.large,
                fontWeight: "bold",
            },

            cantidadText: {
                marginHorizontal: 12,
                fontSize: customTheme.fontSize.large,
                color: customTheme.colors.textPrimary,
                fontWeight: "bold",
            },

            // Total
            total: {
                fontSize: customTheme.fontSize.large,
                fontWeight: "bold",
                color: customTheme.colors.primary,
                marginVertical: customTheme.spacing(3),
                textAlign: "center",
            },

            // Botones finales
            botonesContainer: {
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: customTheme.spacing(2),
                marginBottom: customTheme.spacing(4),
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
    });


interface Medicamento {
    id: string;
    nombre: string;
    categoria: string;
    precio: number;
    }

interface Seleccion {
    medicamentoId: string;
    cantidad: number;
}


function SeleccionSinReceta() {
    const categorias = [
        "Analgesicos",
        "Antiinflamatorios",
        "Dermatologia y Cosmética",
        "Higiene Bucodental",
    ];

    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [seleccion, setSeleccion] = useState<Record<string, Seleccion | null>>(
        {
        Analgesicos: null,
        Antiinflamatorios: null,
        Dermatologia: null,
        "Cosmetica e Higiene Bucodental": null,
        }
    );

    // Cargar medicamentos desde la Firebase
    useEffect(() => {
        const fetchMedicamentos = async () => {
        const snapshot = await getDocs(collection(db, "Medicamentos"));
        const data: Medicamento[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Medicamento[];
        setMedicamentos(data);
        };
        fetchMedicamentos();
    }, []);

    // Calcular el total
    const total = Object.values(seleccion).reduce(
        (acc, sel) => acc + (sel ? sel.cantidad * (medicamentos.find(m => m.id === sel.medicamentoId)?.precio || 0) : 0),
        0
    );

    const handleCantidad = (categoria: string, incremento: number) => {
        setSeleccion((prev) => {
        const sel = prev[categoria];
        if (!sel) return prev;
        const nuevaCantidad = Math.max(sel.cantidad + incremento, 1);
        return { ...prev, [categoria]: { ...sel, cantidad: nuevaCantidad } };
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
            <Text style={styles.title}>Opciones disponibles</Text>

            {categorias.map((cat) => {
                const medsPorCat = medicamentos.filter((m) => m.categoria === cat);
                return (
                <View key={cat} style={styles.categoriaContainer}>
                    <Text style={styles.categoriaTitle}>{cat}</Text>

                    <Picker
                    selectedValue={seleccion[cat]?.medicamentoId || ""}
                    onValueChange={(itemValue) => {
                        if (!itemValue) {
                        setSeleccion((prev) => ({ ...prev, [cat]: null }));
                        return;
                        }
                        setSeleccion((prev) => ({
                        ...prev,
                        [cat]: { medicamentoId: itemValue, cantidad: 1 },
                        }));
                    }}
                    >
                    <Picker.Item label={`Seleccione ${cat}`} value="" />
                    {medsPorCat.map((m) => (
                        <Picker.Item
                        key={m.id}
                        label={`${m.nombre} (€${m.precio})`}
                        value={m.id}
                        />
                    ))}
                    </Picker>

                    {/* Contador de cantidad */}
                    {seleccion[cat] && (
                    <View style={styles.cantidadContainer}>
                        <Pressable
                        style={styles.cantidadButton}
                        onPress={() => handleCantidad(cat, -1)}
                        >
                        <Text style={styles.cantidadButtonText}>-</Text>
                        </Pressable>
                        <Text style={styles.cantidadText}>
                        {seleccion[cat]?.cantidad}
                        </Text>
                        <Pressable
                        style={styles.cantidadButton}
                        onPress={() => handleCantidad(cat, 1)}
                        >
                        <Text style={styles.cantidadButtonText}>+</Text>
                        </Pressable>
                    </View>
                    )}
                </View>
                );
            })}

            <Text style={styles.total}>Total a pagar: €{total.toFixed(2)}</Text>

            <View style={styles.botonesContainer}>
                <Pressable style={styles.button} onPress={() => router.push("/pages/FormaPago")}>
                <Text style={styles.buttonText}>Aceptar</Text>
                </Pressable>
                <Pressable style={styles.buttonCancelar} onPress={() => router.push("/pages/Home")}>
                <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default SeleccionSinReceta;
