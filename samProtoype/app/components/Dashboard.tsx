import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import customTheme from "../theme/Theme";
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";


interface userType{
    DNI?: string;
    NumCartilla?: string;
    NumTarjeta: string;
}

interface MedicamentoType{
    ID_Medicamento?: string;
    Nombre: string;
    Tipo: string;
    Marca: string;
    Precio: number;
    Cartilla_Asociada?: string;
}

const inicializarUser: userType = {
    DNI: "",
    NumCartilla: "",
    NumTarjeta: "",
};

const inicializarMedicamento: MedicamentoType = {
    ID_Medicamento: "",
    Nombre: "",
    Tipo: "",
    Marca: "",
    Precio: 0.0,
    Cartilla_Asociada: "",
};


function Dashboard() {

    const [user, setUser] = useState<userType>(inicializarUser);
    const [tableData1, setTableData1] = useState<userType[]>([]);

    const [medicamento, setMedicamento] = useState<MedicamentoType>(inicializarMedicamento);
    const [tableData2, setTableData2] = useState<MedicamentoType[]>([]);


    const getUsuarios = async () => {
        try {
            const snapshot = await getDocs(collection(db, "usuarios"));

            const lista = snapshot.docs.map(doc => ({
                DNI: doc.id,
                ...doc.data()
            })) as userType[];

            setTableData1(lista);

        } catch (error) {
            console.log("Error obteniendo usuarios:", error);
        }
    };

    const insertarUsuario = async () => {
        if (!user.DNI || !user.NumCartilla || !user.NumTarjeta) {
                Alert.alert("Error", "Todos los campos del usuario son obligatorios");
            return;
        }

        try {
            await setDoc(doc(db, "usuarios", user.DNI), user);

            Alert.alert("Éxito", "Usuario guardado en Firebase");

            setUser(inicializarUser);
            getUsuarios();

        } catch (error) {
            Alert.alert("Firebase Error", (error as any).message);
        }
    };

    const eliminarUsuario = async (DNI: string) => {
        try {
            await deleteDoc(doc(db, "usuarios", DNI));
            getUsuarios();
        } catch (error) {
            console.error(error);
        }
    };

    const getMedicamentos = async () => {
        try {
            const snapshot = await getDocs(collection(db, "Medicamentos"));

            const lista = snapshot.docs.map(doc => ({
                ID_Medicamento: doc.id,
                ...doc.data()
            })) as MedicamentoType[];

            setTableData2(lista);

        } catch (error) {
            console.log("Error obteniendo medicamentos:", error);
        }
    };

    const insertarMedicamento = async () => {
        if (!medicamento.ID_Medicamento || !medicamento.Nombre || !medicamento.Tipo ||
            !medicamento.Marca || !medicamento.Precio || !medicamento.Cartilla_Asociada) {

            Alert.alert("Error", "Todos los campos del medicamento son obligatorios");
            return;
        }

        try {
            await addDoc(collection(db, "Medicamentos"), medicamento);

            Alert.alert("Éxito", "Medicamento guardado en Firebase");

            setMedicamento(inicializarMedicamento);
            getMedicamentos();

        } catch (error) {
            Alert.alert("Error", (error as any).message);
        }
    };


    const eliminarMedicamento = async (ID_Medicamento: string) => {
        try {
            await deleteDoc(doc(db, "Medicamentos", ID_Medicamento));
            getMedicamentos();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsuarios();
        getMedicamentos();
    }, []);

    const users = tableData1;
    const medicamentos = tableData2;

    return(

        <ScrollView style={styles.mainContainer} 
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
        >

            {/* ===================================================== */}
            {/* ============== FORMULARIO: INSERTAR USUARIOS ======== */}
            {/* ===================================================== */}

            <Text style={styles.title}>Registrar Usuario</Text>

            <TextInput
                style={styles.input}
                placeholder="DNI"
                value={user.DNI}
                onChangeText={(text: any) => setUser({ ...user, DNI: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Num_Cartilla"
                value={user.NumCartilla}
                onChangeText={(text: any) => setUser({ ...user, NumCartilla: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Num_Tarjeta"
                secureTextEntry
                value={user.NumTarjeta}
                onChangeText={(text: any) => setUser({ ...user, NumTarjeta: text })}
            />

            {/* Selector de medicamento */}
            <Text style={styles.label}>Relaciones registradas:</Text>

            {medicamentos.map((med) => (
            <Pressable
                key={med.ID_Medicamento}
                style={[
                styles.medicamentoItem,
                user.NumCartilla === med.Cartilla_Asociada && styles.medicamentoSeleccionado,
                ]}
                onPress={() => setUser({ ...user, NumCartilla: med.Cartilla_Asociada })}
            >
                <Text>{med.Nombre} ({med.Tipo})</Text>
            </Pressable>
            ))}

            <Pressable style={styles.button} onPress={insertarUsuario}>
                <Text style={styles.buttonText}>Guardar Usuario</Text>
            </Pressable>


            {/* ===================================================== */}
            {/* = FORMULARIO: INSERTAR MEDICAMENTOS CON RECETA ====== */}
            {/* ===================================================== */}

            <Text style={styles.title}>Registrar Medicamentos</Text>

            <TextInput
                style={styles.input}
                placeholder="ID_Medicamento"
                value={medicamento.ID_Medicamento}
                onChangeText={(text: any) => setMedicamento({ ...medicamento, ID_Medicamento: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={medicamento.Nombre}
                onChangeText={(text: any) => setMedicamento({ ...medicamento, Nombre: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Tipo"
                value={medicamento.Tipo}
                onChangeText={(text: any) => setMedicamento({ ...medicamento, Tipo: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Marca"
                value={medicamento.Marca}
                onChangeText={(text: any) => setMedicamento({ ...medicamento, Marca: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Cartilla_Asociada"
                value={medicamento.Cartilla_Asociada}
                onChangeText={(text: any) => setMedicamento({ ...medicamento, Cartilla_Asociada: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Precio"
                keyboardType="numeric"
                value={medicamento.Precio.toString()}
                onChangeText={(text: string) =>
                    setMedicamento({ ...medicamento, Precio: text === "" ? 0 : parseFloat(text) })
                }
            />

            <Pressable style={styles.button} onPress={insertarMedicamento}>
                <Text style={styles.buttonText}>Guardar Medicamento</Text>
            </Pressable>


            {/* ===================================================== */}
            {/* ==================== TABLA DE USUARIOS ============== */}
            {/* ===================================================== */}
            <Text style={styles.title}>Usuarios Registrados</Text>

            <ScrollView horizontal={true} 
                showsHorizontalScrollIndicator
            >
                <View style={styles.table}>
                    
                    {/* Encabezado de la tabla usuarios */}
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.headerCell]}>DNI</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Nº Cartilla</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Nº Tarjeta</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Medicamentos</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Eliminar</Text>
                    </View>

                    {/* Filas de la tabla usuarios */}
                    {users.map((user) => (
                        <View key={user.DNI} style={styles.row}>
                            <Text style={styles.cell}>{user.DNI}</Text>
                            <Text style={styles.cell}>{user.NumCartilla}</Text>
                            <Text style={styles.cell}>{user.NumTarjeta}</Text>

                            <Text style={styles.cell}>
                                {medicamentos
                                    .filter(med => med.Cartilla_Asociada === user.NumCartilla)
                                    .map(med => med.Nombre)
                                    .join(", ")}
                            </Text>

                            <View style={styles.cell}>
                                <Pressable style={styles.button} onPress={() => {
                                    if (user.DNI) {
                                        eliminarUsuario(user.DNI);
                                    }}}
                            >
                                    <Text style={styles.buttonText}>Eliminar</Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}

                </View>
            </ScrollView>


            {/* ===================================================== */}
            {/* ==================== TABLA DE MEDICAMENTOS ========== */}
            {/* ===================================================== */}

            <Text style={styles.title}>Medicamentos Registrados</Text>

            <ScrollView horizontal={true} 
                showsHorizontalScrollIndicator
            >
                <View style={styles.table}>
                    
                    {/* Encabezado de la tabla Medicamentos */}
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Nombre</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Tipo</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Marca</Text>
                        <Text style={[styles.cell, styles.headerCell]}>NºCartilla</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Precio</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Eliminar</Text>
                    </View>

                    {/* Filas de la tabla Medicamentos */}
                    {medicamentos.map((medi) => (
                        <View key={medi.ID_Medicamento} style={styles.row}>
                            <Text style={styles.cell}>{medi.ID_Medicamento}</Text>
                            <Text style={styles.cell}>{medi.Nombre}</Text>
                            <Text style={styles.cell}>{medi.Tipo}</Text>
                            <Text style={styles.cell}>{medi.Marca}</Text>
                            <Text style={styles.cell}>{medi.Cartilla_Asociada}</Text>
                            <Text style={styles.cell}>{medi.Precio}</Text>


                            <View style={styles.cell}>
                                    <Pressable style={styles.button} onPress={() => medi.ID_Medicamento && eliminarMedicamento(medi.ID_Medicamento)}>
                                        <Text style={styles.buttonText}>Eliminar</Text>
                                    </Pressable>
                            </View>
                        </View>
                    ))}

                </View>
            </ScrollView>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    
    mainContainer: {
        flex: 1,
        padding: customTheme.spacing(4),
        backgroundColor: customTheme.colors.background, 
    },
    
    title: {
        fontSize: customTheme.fontSize.title,
        fontWeight: "bold",
        marginVertical: customTheme.spacing(2),
        textAlign: "center",
        color: customTheme.colors.primary,
    },

    label: {
        fontSize: customTheme.fontSize.normal,
        fontWeight: "bold",
        marginTop: customTheme.spacing(2),
        marginBottom: customTheme.spacing(1),
        color: customTheme.colors.primary,
        textAlign:"center",
    },

    input: {
        borderWidth: 1,
        borderColor: customTheme.colors.secondary, 
        borderRadius: 8,
        padding: 10,
        marginBottom: customTheme.spacing(1),
        fontSize: customTheme.fontSize.normal,
        color: customTheme.colors.primary, 
    },

    button: {
        backgroundColor: customTheme.colors.secondary, 
        padding: 12,
        borderRadius: 8,
        marginVertical: customTheme.spacing(1),
    },

    buttonText: {
        color: customTheme.colors.textSecondary, 
        fontSize: customTheme.fontSize.normal,
        fontWeight: "bold",
        textAlign: "center",
    },

    medicamentoItem: {
        padding: 12,
        borderWidth: 1,
        borderColor: customTheme.colors.secondary, 
        borderRadius: 6,
        marginVertical: customTheme.spacing(0.5),
        backgroundColor: "#f9f9f9",
        color: customTheme.colors.primary, 
    },

    medicamentoSeleccionado: {
        backgroundColor: customTheme.colors.primary, 
        borderColor: customTheme.colors.secondary, 
    },

    table: {
        borderWidth: 1,
        borderColor: customTheme.colors.secondary,
        marginBottom: customTheme.spacing(4),
    },
    
    row: {
        flexDirection: "row",
    },

    headerRow: {
        backgroundColor: customTheme.colors.secondary,
    },

    cell: {
        padding: 10,
        borderWidth: 1,
        borderColor: customTheme.colors.secondary,
        minWidth: 140,
        textAlign: "center",
        color: customTheme.colors.primary, // texto verde
    },

    headerCell: {
        fontWeight: "bold",
        color: customTheme.colors.textSecondary, // texto blanco en header
    },
});

export default Dashboard;