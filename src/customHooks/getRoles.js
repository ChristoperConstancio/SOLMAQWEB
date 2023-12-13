import { getFirestore, collection, query, where, getDocs,doc, updateDoc } from "firebase/firestore";


export  async function fetchData ()  {
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

export const  editR = async (selected, newRol) =>  {
    const db = getFirestore();
        const rolesRefCheck = collection(db, "Roles");
        const k = query(rolesRefCheck, where("cargo", "==", newRol));
        const querySnapshots = await getDocs(k);
        if(querySnapshots.size > 0 ) {
            alert('El rol ya existe!!');
            return false;
        }
    const rolesRef = collection(db, "Roles");
    
        const q = query(rolesRef, where("cargo", "==", selected));
        try {

            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach(async (queryDocumentSnapshot) => {
                const docRef = doc(rolesRef, queryDocumentSnapshot.id);

                // Realiza la actualización del atributo del documento
                const updateData = {
                    cargo: newRol
                };

                await updateDoc(docRef, updateData);
            })
            return true;

        } catch (error) {
            return false;
        }   
    
}