import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../theme/Theme"; 
import React from "react";

const { width } = Dimensions.get("window");

function Menu() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const positionX = useState(new Animated.Value(-width))[0]; // Cambiado a -width

    const abrirMenu = () => {
        setOpen(true);
        Animated.timing(positionX, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const cerrarMenu = () => {
        Animated.timing(positionX, {
            toValue: -width, // Cambiado para que se oculte completamente
            duration: 250,
            useNativeDriver: true,
        }).start(() => setOpen(false));
    };

    return (
        <>
            {/* Header fijo en la parte superior */}
            <View style={styles.header}>
                <TouchableOpacity onPress={abrirMenu}>
                    <MaterialIcons name="menu" size={25} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>

            {/* OVERLAY - debe estar por encima de todo excepto el drawer */}
            {open && (
                <TouchableOpacity 
                    style={styles.overlay} 
                    onPress={cerrarMenu} 
                    activeOpacity={1}
                />
            )}

            {/* DRAWER - fuera del flujo normal con position absolute */}
            <Animated.View 
                style={[
                    styles.drawer, 
                    { 
                        transform: [{ translateX: positionX }],
                        display: open ? 'flex' : 'none' // Ocultar cuando no esté abierto
                    }
                ]}
            >
                <Text style={styles.drawerTitle}>Opciones de Administrador</Text>

                <View style={styles.itemsContainer}>
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => {
                            cerrarMenu();
                            router.push("/pages/LoginAdmin");
                        }}
                    >
                        <MaterialIcons name="security" size={24} color={theme.colors.primary} />
                        <Text style={styles.drawerText}>Admin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => {
                            cerrarMenu();
                            router.push("/pages/Home");
                        }}
                    >
                        <MaterialIcons name="logout" size={24} color={theme.colors.secondary} />
                        <Text style={[styles.drawerText, { color: theme.colors.secondary }]}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    // REMOVIDO el container con flex: 1
    
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 30, // Altura fija para el encabezado
        backgroundColor: theme.colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        zIndex: 1000,
        elevation: 3, // Sombra para Android
        shadowColor: "#000", // Sombra para iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#00000066",
        zIndex: 998, // Debajo del drawer pero encima de todo lo demás
    },

    drawer: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: width * 0.3, // 70% del ancho de la pantalla
        backgroundColor: theme.colors.background,
        paddingTop: 60, // Espacio para el header
        paddingHorizontal: theme.spacing(2.5),
        zIndex: 999, // Encima del overlay
        elevation: 10, // Para Android
        shadowColor: "#000", // Para iOS
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    drawerTitle: {
        fontSize: theme.fontSize.normal,
        fontWeight: "bold",
        marginBottom: theme.spacing(3),
        color: theme.colors.primary,
        paddingBottom: theme.spacing(2),
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    itemsContainer: {
        flexDirection: "column",
        gap: 25,
        alignItems: "flex-start",
        width: "100%",
    },

    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing(1.5),
        width: "100%",
    },

    drawerText: {
        marginLeft: 15,
        fontSize: theme.fontSize.normal,
        color: theme.colors.primary,
        fontWeight: '500',
    },
});

export default Menu;