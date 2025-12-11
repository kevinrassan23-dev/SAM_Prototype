import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Dashboard from "../components/Dashboard";
import Menu from "../components/Menu";
import customTheme from "../theme/Theme";

function AdminSam() {

    return(
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
            <Menu/>
            <Dashboard/>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: customTheme.spacing(2),
        backgroundColor: customTheme.colors.background,
    }
})
export default AdminSam;
