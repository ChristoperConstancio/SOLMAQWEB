
import { getFirestore, collection, query, where, updateDoc, getDocs, doc } from "firebase/firestore";


export default async function inactivateClient(id) {

    // Obtén la referencia a la colección
    const db = getFirestore();

    const collectionRef = collection(db, 'Clientes');
    console.log(id)
    // Realiza una consulta para buscar el documento con el atributo "nombre" igual a "Ejemplo"
    const q = query(collectionRef, where("id", "==", id));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) {
            console.log('No se encontraron documentos con el ID proporcionado.');
        } else {
            querySnapshot.forEach(async (queryDocumentSnapshot) => {
                const docRef = doc(collectionRef, queryDocumentSnapshot.id);

                // Realiza la actualización del atributo del documento
                const updateData = {
                    Status : "Inactivo"
                };
                await updateDoc(docRef, updateData);
                return true;
            })
        }
    } catch (error) {
        return false;
    }
}