import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";



export default async function getClientes() {

  try {
    // Inicializa Firebase Auth y Firestore
    const db = getFirestore();
    let clients = [];
    if (db) {
      // Verifica si el usuario existe en la colección de usuarios en Firestore
      const usersRef = collection(db, "Clientes");
      const querySnapshot = await getDocs(usersRef);

      if (querySnapshot.size === 0) {
        return false;
      }

      const userData = querySnapshot.docs.map((doc) => {
        const user = doc.data();
        clients.push(user);

      });
      userData;
      return clients;

    } else {
      // Si la conexión no se estableció correctamente
      throw new Error("La conexión a Firebase no se ha establecido correctamente.");
    }

  } catch (error) {
    // Maneja los errores de inicio de sesión aquí
    console.error("Error de inicio de sesión:", error.message);
    return false;
  }
}