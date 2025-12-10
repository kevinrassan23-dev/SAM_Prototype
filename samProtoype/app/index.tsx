import { Redirect } from "expo-router";

function Index() {
  return (

    // Importamos la ruta padre el índice de la aplicación 
    // como la primera que aparece
    <Redirect href="../pages/Home"/>
  );
}
export default Index;
