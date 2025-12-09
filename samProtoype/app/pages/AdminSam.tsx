import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Dashboard from "../components/Dashboard";
import Menu from "../components/Menu";
import customTheme from "../theme/Theme";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: customTheme.spacing(2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: customTheme.colors.background,
    }
})

function AdminSam() {

    return(
        //ScrollView es un componente que lo que hace es 
        // extender la pantalla deslizable hacia abajo si 
        // se añade muchos componentes en la pantalla, ideal para el Dashboard
        // Posible reciclar en selección con medicamentos sin receta y con receta
        <ScrollView style={styles.container}>
            <Menu/>
            <Dashboard/>

        </ScrollView>
    );


}
export default AdminSam;
