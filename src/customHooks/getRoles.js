import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


export default async function fetchData ()  {
    try {
        const db = getFirestore();

        const optionsRef = collection(db, "Roles"); // Reemplaza "opciones" con el nombre de tu colección
        const querySnapshot = await getDocs(optionsRef);

        const optionsData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            optionsData.push(data); // Ajusta según la estructura de tus documentos
        });

        return optionsData;
    } catch (error) {
        console.error("Error al obtener datos de Firebase:", error);
    }
};