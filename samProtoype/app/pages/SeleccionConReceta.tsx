import { Button } from "@react-navigation/elements";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CheckBox from "react-native-check-box";
import Menu from "../components/Menu";

export default function selecionarconreceta() {

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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Menu />

            <Text style={{ marginBottom: 25, fontSize: 30 }}>Medicamentos Disponibles</Text>

            <View style={{ width: 300, height: 500, borderWidth: 1 }}>
                <ScrollView contentContainerStyle={{ flexDirection: "column", alignItems: "center" }} >

                    {placeholder.map((Medis) => (
                        <View key={Medis.id}>
                            <CheckBox isChecked={MedElegido.includes(Medis.id)} onClick={() => checks(Medis.id)} rightText={Medis.label} />
                        </View>
                    ))}

                </ScrollView>
            </View>
            <Text style={{ marginTop: 20, fontSize: 30 }} >Total: €</Text>

            <View style={{ flexDirection: "row" }}>
                <Button style={{ marginTop: 25, marginRight: 35, width: 150 }} onPress={cancelar}>Cancelar</Button>

                <Button style={{ marginTop: 25, width: 150 }} onPress={aceptar}>Aceptar</Button>
            </View>
        </View >
    );
}


