import { getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";


export async function fetchRFQ() {
    try {
        const db = getFirestore();

        const optionsRef = collection(db, "Rfq"); // Reemplaza "opciones" con el nombre de tu colección
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
export async function fetchRFQV(id) {
    try {
        const db = getFirestore();
        const optionsRef = collection(db, "Rfq"); // Reemplaza "opciones" con el nombre de tu colección
        const q = query(optionsRef, where("nuVenta", "==", parseInt(id)));
        const querySnapshot = await getDocs(q);

        const optionsData = [];
        if(querySnapshot.size <= 0) return false;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            optionsData.push(data); // Ajusta según la estructura de tus documentos
        });

        return optionsData;
    } catch (error) {
        console.error("Error al obtener datos de Firebase:", error);
    }
};
export async function fetchRFQVenta(id) {
    try {
        const db = getFirestore();

        const optionsRef = collection(db, "Rfq"); // Reemplaza "opciones" con el nombre de tu colección
        const q = query(optionsRef, where("RFC", "==", id));
        const querySnapshot = await getDocs(q);

        const optionsData = [];
        if(querySnapshot.size <= 0) return false;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            optionsData.push(data); // Ajusta según la estructura de tus documentos
        });

        return optionsData;
    } catch (error) {
        console.error("Error al obtener datos de Firebase:", error);
    }
};
export async function fetchRFQPiezas(id) {
    try {
        const db = getFirestore();

        const pzRef = collection(db, "Rfq_pz"); // Reemplaza "opciones" con el nombre de tu colección
        const q = query(pzRef, where("idRFQ", "==", id));
        const querySnapshot = await getDocs(q);
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
export async function fetchRFQSer(id) {
    try {
        const db = getFirestore();

        const pzRef = collection(db, "Rfq_mant"); // Reemplaza "opciones" con el nombre de tu colección
        const q = query(pzRef, where("idRFQ", "==", id));
        const querySnapshot = await getDocs(q);
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
export async function addRFQs(data) {

    const db = getFirestore();

    const optionsRef = collection(db, "Rfq"); // Reemplaza "opciones" con el nombre de tu colección
    try {
        await addDoc(optionsRef, data);
        return true;
    } catch (error) {
        alert('Error en la base de datos: al crear usuario ' + error)
        return false;

    }
}

export async function addRFQPieza(data, total) {
    const db = getFirestore();
    console.log(data)

    const optionsRef = collection(db, "Rfq_pz"); // Reemplaza "opciones" con el nombre de tu colección
    const rfqOptions = collection(db, "Rfq"); // Reemplaza "opciones" con el nombre de tu colección
    const q = query(rfqOptions, where("Id_rfq", "==", data[0].idRFQ));
    try {
        const querySnapshot = await getDocs(q);

        data.map(async item => {
            await addDoc(optionsRef, item);
        })
        if (querySnapshot.size === 0) {
            console.log('No se encontraron documentos con el ID proporcionado.');
            return false;
        } else {
            querySnapshot.forEach(async (queryDocumentSnapshot) => {
                const docRef = doc(rfqOptions, queryDocumentSnapshot.id);

                // Realiza la actualización del atributo del documento
                const updateData = {
                    Total: total
                };
                await updateDoc(docRef, updateData);
            })
        }
        return true;
    } catch (error) {
        alert('Error en la base de datos: al crear usuario ' + error)
        return false;

    }
}
export async function addRFQServicio(data) {
    const db = getFirestore();
    console.log(data)

    const optionsRef = collection(db, "Rfq_mant"); // Reemplaza "opciones" con el nombre de tu colección
    const rfqOptions = collection(db, "Rfq"); // Reemplaza "opciones" con el nombre de tu colección
    const q = query(rfqOptions, where("Id_rfq", "==", data.idRFQ));
    try {
        const querySnapshot = await getDocs(q);

        await addDoc(optionsRef, data);

        if (querySnapshot.size === 0) {
            console.log('No se encontraron documentos con el ID proporcionado.');
            return false;
        } else {
            querySnapshot.forEach(async (queryDocumentSnapshot) => {
                const docRef = doc(rfqOptions, queryDocumentSnapshot.id);

                // Realiza la actualización del atributo del documento
                const updateData = {
                    Total: data.total
                };
                await updateDoc(docRef, updateData);
            })
        }
        return true;
    } catch (error) {
        alert('Error en la base de datos: al crear usuario ' + error)
        return false;

    }
}


export async function inactivateRFQ(id) {

    // Obtén la referencia a la colección
    const db = getFirestore();

    const collectionRef = collection(db, 'Rfq');
    console.log(id)
    // Realiza una consulta para buscar el documento con el atributo "nombre" igual a "Ejemplo"
    const q = query(collectionRef, where("Id_rfq", "==", id));

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
                    state: "Inactivo"
                };
                await updateDoc(docRef, updateData);
            })
            return true;

        }
    } catch (error) {
        return false;
    }
}
export async function fetchRFQPiezasEditar(id) {
    try {
        const db = getFirestore();

        const pzRef = collection(db, "Rfq_pz"); // Reemplaza "opciones" con el nombre de tu colección
        const q = query(pzRef, where("name", "==", id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size <= 0) return false;
        const data = [];
        querySnapshot.forEach(doc => {
            const datos = doc.data()
            data.push(datos)
        });
        return data;
    } catch (error) {
        console.error("Error al obtener datos de Firebase:", error);
    }
};
export async function editingRFQPieza(data) {
    // Obtén la referencia a la colección
    const db = getFirestore();
    const collectionRef = collection(db, 'Rfq_pz');
    // Realiza una consulta para buscar el documento con el atributo "nombre" igual a "Ejemplo"
    const q = query(collectionRef, where("name", "==", data.name));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) {
            return false;
        } else {
            querySnapshot.forEach(async (queryDocumentSnapshot) => {
                const docRef = doc(collectionRef, queryDocumentSnapshot.id);
                // Realiza la actualización del atributo del documento
                const updateData = {
                    manufacture: data.manufacture,
                    rev: data.rev,
                    special: data.special,
                    specification: data.specification,
                    opp: data.opp,
                    costo: data.costo,
                    material: data.material
                };
                await updateDoc(docRef, updateData);

            })
            console.log("cambiado")
            return true;

        }
    } catch (error) {
        return false;
    }
}
export async function editingRFQServicio(data) {
    // Obtén la referencia a la colección
    const db = getFirestore();
    const collectionRef = collection(db, 'Rfq_mant');
    // Realiza una consulta para buscar el documento con el atributo "nombre" igual a "Ejemplo"
    const q = query(collectionRef, where("idRFQ", "==", data.idRFQ));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) {
            return false;
        } else {
            querySnapshot.forEach(async (queryDocumentSnapshot) => {
                const docRef = doc(collectionRef, queryDocumentSnapshot.id);
                // Realiza la actualización del atributo del documento
                const updateData = {
                    nombre: data.nombre,
                    fecha: data.fecha,
                    descripcion: data.descripcion,
                    horaentrada: data.horaentrada,
                    horasalida: data.horasalida,
                    telefono: data.telefono,
                };
                await updateDoc(docRef, updateData);

            })
            console.log("cambiado")
            return true;

        }
    } catch (error) {
        return false;
    }
}
export async function fetchRFQServiEditar(id) {
    try {
        const db = getFirestore();

        const pzRef = collection(db, "Rfq_mant"); // Reemplaza "opciones" con el nombre de tu colección
        const q = query(pzRef, where("idRFQ", "==", id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size <= 0) return false;
        const data = [];
        querySnapshot.forEach(doc => {
            const datos = doc.data()
            data.push(datos)
        });
        return data;
    } catch (error) {
        console.error("Error al obtener datos de Firebase:", error);
    }
};
export const checkRFQ = async (id) => {
    // Obtén la referencia a la colección
    const db = getFirestore();

    const collectionRef = collection(db, 'Rfq');
    // Realiza una consulta para buscar el documento con el atributo "nombre" igual a "Ejemplo"
    const q = query(collectionRef, where("Id_rfq", "==", id));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size <= 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function inactivateRFQP(id) {

    // Obtén la referencia a la colección
    const db = getFirestore();

    const collectionRef = collection(db, 'Rfq_pz');
    // Realiza una consulta para buscar el documento con el atributo "nombre" igual a "Ejemplo"
    const q = query(collectionRef, where("name", "==", id));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) {
            console.log('No se encontraron documentos con el ID proporcionado.');
            return false;
        } else {
            querySnapshot.forEach(async (queryDocumentSnapshot) => {
                console.log(id)

                const docRef = doc(collectionRef, queryDocumentSnapshot.id);

                // Realiza la actualización del atributo del documento
                const updateData = {
                    state: "Inactivo"
                };
                await updateDoc(docRef, updateData);
            })
        }
        return true;

    } catch (error) {
        return false;
    }
}
export async function inactivateRFQS(id) {

    // Obtén la referencia a la colección
    const db = getFirestore();

    const collectionRef = collection(db, 'Rfq_mant');
    // Realiza una consulta para buscar el documento con el atributo "nombre" igual a "Ejemplo"
    const q = query(collectionRef, where("idRFQ", "==", id));

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
                    state: "Inactivo"
                };
                await updateDoc(docRef, updateData);
            })
        }
        return true;

    } catch (error) {
        return false;
    }
}