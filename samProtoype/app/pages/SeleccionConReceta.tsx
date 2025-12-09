import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
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

    const placeholder = [
        {
            id: '1',
            label: 'med',
        },
        {
            id: '2',
            label: 'med',
        },
        {
            id: '3',
            label: 'med',
        }, {
            id: '4',
            label: 'med',
        },
        {
            id: '5',
            label: 'med',
        },
        {
            id: '6',
            label: 'med',
        }, {
            id: '7',
            label: 'med',
        },
        {
            id: '8',
            label: 'med',
        },
        {
            id: '9',
            label: 'med',
        }, {
            id: '10',
            label: 'med',
        },
        {
            id: '11',
            label: 'med',
        },
        {
            id: '12',
            label: 'med',
        }, {
            id: '13',
            label: 'med',
        },
        {
            id: '14',
            label: 'med',
        },
        {
            id: '15',
            label: 'med',
        }, {
            id: '16',
            label: 'med',
        },
        {
            id: '17',
            label: 'med',
        },
        {
            id: '18',
            label: 'med',
        }, {
            id: '19',
            label: 'med',
        },
        {
            id: '20',
            label: 'med',
        }, {
            id: '21',
            label: 'med',
        },
        {
            id: '22',
            label: 'med',
        },
        {
            id: '23',
            label: 'med',
        }, {
            id: '24',
            label: 'med',
        },
        {
            id: '25',
            label: 'med',
        },
    ];

    const [MedElegido, setMedElegido] = useState<string[]>([]);

    const checks = (Medi: any) => {
        setMedElegido(MediEstado => {
            if (MediEstado.includes(Medi)) {
                return MediEstado.filter(MediAdded => MediAdded !== Medi);
            }
            return [...MediEstado, Medi];
        });
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Medicamentos Disponibles</Text>

            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    {placeholder.map((item) => (
                        <View key={item.id} style={styles.checkItem}>
                            <CheckBox isChecked={MedElegido.includes(item.id)} onClick={() => checks(item.id)} rightText={item.label} rightTextStyle={styles.checkboxText} />
                        </View>
                    ))}

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
