import { getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
export async function cobroCode() {
    try {
        const db = getFirestore();

        const pzRef = collection(db, "Cobro"); // Reemplaza "opciones" con el nombre de tu colección
        const querySnapshot = await getDocs(pzRef);

        let maxId = 0;

        querySnapshot.forEach((doc) => {
            const datos = doc.data();
            const id = parseInt(datos.nuCobro, 10);
            if (id > maxId) {
                maxId = id;
            }
        });


        // Establecer el próximo ID disponible
        return maxId + 1;
    } catch (error) {
        console.error('Error al obtener el máximo ID:', error);
    }
};

export async function addCobro(data) {

    const db = getFirestore();

    const optionsRef = collection(db, "Cobro"); // Reemplaza "opciones" con el nombre de tu colección
    const collectionRef = collection(db, 'Ventas');
    const q = query(collectionRef, where("nuVenta", "==", parseInt(data.nuVenta)));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size === 0) {
            console.log('No se encontraron documentos con el ID proporcionado.');
            return false;
        } else {
            querySnapshot.forEach(async (queryDocumentSnapshot) => {
                const docRef = doc(collectionRef, queryDocumentSnapshot.id);

                // Realiza la actualización del atributo del documento
                const updateData = {
                    saldo: data.saldo
                };
                await updateDoc(docRef, updateData);
            })
        }
        await addDoc(optionsRef, data);
        return true;
    } catch (error) {
        alert('Error en la base de datos: al crear usuario ' + error)
        return false;

    }
}