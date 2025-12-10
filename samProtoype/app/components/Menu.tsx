import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet } from "react-native";
import { MaterialIcons} from "@expo/vector-icons";
import theme from "../theme/Theme"; 

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: theme.spacing(2),
        backgroundColor: theme.colors.background,
    },
    headerTitle: {
        marginLeft: theme.spacing(2),
        fontSize: theme.fontSize.large,
        fontWeight: "bold",
        color: theme.colors.textPrimary,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#00000066",
    },
    drawer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: width * 0.7,
        backgroundColor: theme.colors.background,
        padding: theme.spacing(2.5),
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    drawerTitle: {
        fontSize: theme.fontSize.normal,
        fontWeight: "bold",
        marginBottom: theme.spacing(2),
        color: theme.colors.primary,
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing(2),
    },
    drawerText: {
        marginLeft: theme.spacing(1.5),
        fontSize: theme.fontSize.normal,
        color: theme.colors.primary,
    },
});

function Menu() {
    
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const positionH = useState(new Animated.Value(-width * 0.7))[0];

    const abrirMenu = () => {
        setOpen(true);
        Animated.timing(positionH, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
        }).start();
    };

    const cerrarMenu = () => {
        Animated.timing(positionH, {
        toValue: -width * 0.7,
        duration: 250,
        useNativeDriver: true,
        }).start(() => setOpen(false));
    };

    return (
        <View style={styles.container}>
            
            {/* APP BAR */}
            <View style={styles.header}>
                <TouchableOpacity onPress={abrirMenu}>
                    <MaterialIcons name="menu" size={30} color={theme.colors.primary} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Tablas de administración</Text>
            </View>

            {/* OVERLAY */}
            {open && (
                <TouchableOpacity style={styles.overlay} onPress={cerrarMenu} />
            )}

            {/* DRAWER */}
            <Animated.View style={[styles.drawer, { transform: [{ translateX: positionH }] }]}>
                <Text style={styles.drawerTitle}>Opciones de Administrador</Text>

                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => router.push("/pages/LoginAdmin")}
                >
                    <MaterialIcons name="security" size={24} color={theme.colors.primary} />
                    <Text style={styles.drawerText}>Admin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => router.push("/pages/Home")}
                >
                    <MaterialIcons name="logout" size={24} color={theme.colors.secondary} />
                    <Text style={[styles.drawerText, { color: theme.colors.secondary }]}>Salir</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

export default Menu;
