import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert } from "react-native";
import customTheme from "../theme/Theme"

// Importamos el tema
const styles = StyleSheet.create({
    
    mainContainer: {
        flex: 1,
        padding: customTheme.spacing(2),
        backgroundColor: customTheme.colors.background, // fondo blanco
    },
    
    title: {
        fontSize: customTheme.fontSize.title,
        fontWeight: "bold",
        marginVertical: customTheme.spacing(2),
        textAlign: "center",
        color: customTheme.colors.primary, // verde principal
    },

    label: {
        fontSize: customTheme.fontSize.normal,
        fontWeight: "bold",
        marginTop: customTheme.spacing(2),
        marginBottom: customTheme.spacing(1),
        color: customTheme.colors.primary, // verde principal
    },

    input: {
        borderWidth: 1,
        borderColor: customTheme.colors.secondary, // verde secundario
        borderRadius: 8,
        padding: 10,
        marginBottom: customTheme.spacing(1),
        fontSize: customTheme.fontSize.normal,
        color: customTheme.colors.primary, // texto que escribes
    },

    button: {
        backgroundColor: customTheme.colors.secondary, // verde secundario
        padding: 12,
        borderRadius: 8,
        marginVertical: customTheme.spacing(1),
    },

    buttonText: {
        color: customTheme.colors.textSecondary, // blanco para texto en botones
        fontSize: customTheme.fontSize.normal,
        fontWeight: "bold",
        textAlign: "center",
    },

    medicamentoItem: {
        padding: 12,
        borderWidth: 1,
        borderColor: customTheme.colors.secondary, // borde verde
        borderRadius: 6,
        marginVertical: customTheme.spacing(0.5),
        backgroundColor: "#f9f9f9",
        color: customTheme.colors.primary, // texto verde
    },

    medicamentoSeleccionado: {
        backgroundColor: customTheme.colors.primary, // verde principal
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


interface userType{
    dni?: string;
    numCartilla: string;
    nombre: string;
    numTarjeta: string;
    medicamentoId?: string;
}

interface MedicamentoType{
    id?: string;
    nombre: string;
    tipo: string;
    marca: string;
    precio: number;
}

const inicializarUser: userType = {
    dni: "",
    numCartilla: "",
    nombre: "",
    numTarjeta: "",
};

const inicializarMedicamento: MedicamentoType = {
    id: "",
    nombre: "",
    tipo: "",
    marca: "",
    precio: 0.0,
};


function Dashboard() {

    const [user, setUser] = useState<userType>(inicializarUser);
    const [tableData1, setTableData1] = useState<userType[]>([]);

    const [medicamento, setMedicamento] = useState<MedicamentoType>(inicializarMedicamento);
    const [tableData2, setTableData2] = useState<MedicamentoType[]>([]);

    
    // Crear/insertar usuarios
    const insertarUsuario = () => {
        if (!user.nombre || !user.numCartilla || !user.numTarjeta) {
                Alert.alert("Error", "Todos los campos del usuario son obligatorios");
            return;
        }

        const nuevo = { ...user };
        setTableData1([...tableData1, nuevo]);
        setUser(inicializarUser);

        Alert.alert("Éxito", "Usuario registrado");
    };

    // Insertar medicamentos
    const insertarMedicamento = () => {
        if (!medicamento.nombre || !medicamento.tipo || !medicamento.marca) {
                Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }

        const nuevo = {
            ...medicamento,
            id: Date.now().toString(),
        };

        setTableData2([...tableData2, nuevo]);
        setMedicamento(inicializarMedicamento);

        Alert.alert("Éxito", "Medicamento registrado");
    };

    const users: userType[] = [];
    const medicamentos: MedicamentoType[] = [];

    return(

        <ScrollView style={styles.mainContainer}>

            {/* ===================================================== */}
            {/* ============== FORMULARIO: INSERTAR USUARIOS ======== */}
            {/* ===================================================== */}

            <Text style={styles.title}>Registrar Usuario</Text>

            <TextInput
                style={styles.input}
                placeholder="DNI"
                value={user.dni}
                onChangeText={(text) => setUser({ ...user, dni: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Número Cartilla"
                value={user.numCartilla}
                onChangeText={(text) => setUser({ ...user, numCartilla: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={user.nombre}
                onChangeText={(text) => setUser({ ...user, nombre: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Número Tarjeta"
                secureTextEntry
                value={user.numTarjeta}
                onChangeText={(text) => setUser({ ...user, numTarjeta: text })}
            />

            {/* Selector de medicamento */}
            <Text style={styles.label}>Asignar medicamento:</Text>

            {medicamentos.map((med) => (
            <Pressable
                key={med.id}
                style={[
                styles.medicamentoItem,
                user.medicamentoId === med.id && styles.medicamentoSeleccionado,
                ]}
                onPress={() => setUser({ ...user, medicamentoId: med.id })}
            >
                <Text>{med.nombre} ({med.tipo})</Text>
            </Pressable>
            ))}

            <Pressable style={styles.button} onPress={insertarUsuario}>
                <Text style={styles.buttonText}>Guardar Usuario</Text>
            </Pressable>


            {/* ===================================================== */}
            {/* ============ FORMULARIO: INSERTAR MEDICAMENTOS ====== */}
            {/* ===================================================== */}

            <Text style={styles.title}>Registrar Medicamentos</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={medicamento.nombre}
                onChangeText={(text) => setMedicamento({ ...medicamento, nombre: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Tipo"
                value={medicamento.tipo}
                onChangeText={(text) => setMedicamento({ ...medicamento, tipo: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Marca"
                value={medicamento.marca}
                onChangeText={(text) => setMedicamento({ ...medicamento, marca: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Precio"
                keyboardType="numeric"
                value={medicamento.precio.toString()}
                onChangeText={(text) =>
                    setMedicamento({ ...medicamento, precio: parseFloat(text) })
                }
            />

            <Pressable style={styles.button} onPress={insertarMedicamento}>
            <Text style={styles.buttonText}>Guardar Medicamento</Text>
            </Pressable>


            {/* ===================================================== */}
            {/* ==================== TABLA DE USUARIOS ============== */}
            {/* ===================================================== */}
            <Text style={styles.title}>Usuarios Registrados</Text>

            <ScrollView horizontal={true}>
                <View style={styles.table}>
                    
                    {/* Encabezado de la tabla usuarios */}
                    <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.cell, styles.headerCell]}>DNI</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Nº Cartilla</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Nombre</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Nº Tarjeta</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Medicamento ID</Text>
                    </View>

                    {/* Filas de la tabla usuarios */}
                    {users.map((user, idx) => (
                    <View key={idx} style={styles.row}>
                        <Text style={styles.cell}>{user.dni}</Text>
                        <Text style={styles.cell}>{user.numCartilla}</Text>
                        <Text style={styles.cell}>{user.nombre}</Text>
                        <Text style={styles.cell}>{user.numTarjeta}</Text>
                        <Text style={styles.cell}>{user.medicamentoId}</Text>
                    </View>
                    ))}

                </View>
            </ScrollView>


            {/* ===================================================== */}
            {/* ==================== TABLA DE MEDICAMENTOS ========== */}
            {/* ===================================================== */}

            <Text style={styles.title}>Medicamentos Registrados</Text>

            <ScrollView horizontal={true}>
                <View style={styles.table}>
                    
                    {/* Encabezado de la tabla Medicamentos */}
                    <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.cell, styles.headerCell]}>ID</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Nombre</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Tipo</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Marca</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Precio</Text>
                    </View>

                    {/* Filas de la tabla Medicamentos */}
                    {medicamentos.map((m, idx) => (
                    <View key={idx} style={styles.row}>
                        <Text style={styles.cell}>{m.id}</Text>
                        <Text style={styles.cell}>{m.nombre}</Text>
                        <Text style={styles.cell}>{m.tipo}</Text>
                        <Text style={styles.cell}>{m.marca}</Text>
                        <Text style={styles.cell}>{m.precio}</Text>
                    </View>
                    ))}

                </View>

            </ScrollView>

        </ScrollView>

    );
}

export default Dashboard;