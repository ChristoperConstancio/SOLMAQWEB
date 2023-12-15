import { useDebugValue } from "react";
import { db } from "./FirebaseConfig";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from 'bcryptjs'

const compare = async (passwordtext, hash)=>{
  return await bcrypt.compare(passwordtext, hash);
}
export const loginUser = async (usuario, pass) => {
  try {
    // Inicializa Firebase Auth y Firestore
    const db = getFirestore();
    if (db) {
      // Verifica si el usuario existe en la colección de usuarios en Firestore
      const usersRef = collection(db, "Usuarios");
      const q = query(usersRef, where("nombreUsuario", "==", usuario.value));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        return  { success: false, nombre: 'Usuario y/o Contraseña incorrectas' };
      }

      const userData = querySnapshot.docs.map(async (doc) => {
        const { nombre, apellidoPaterno, apellidoMaterno, password, rol,status } = doc.data();
        if(status == 'Inactivo'){
        return  { success: false, nombre: 'Usuario y/o Contraseña incorrectas' };
        }
        const compares = await compare(pass.value, password)
        console.log(compares)
        if(password == pass.value){
          return { success: true, nombre: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`, rol : rol };

        }
        if (compares ) {
          return { success: true, nombre: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`, rol : rol };
        }
        return  { success: false, nombre: 'Usuario y/o Contraseña incorrectas' };

      });

      return userData[0];

      // El usuario ha iniciado sesión con éxito y existe en la colección de usuarios

    } else {
      // Si la conexión no se estableció correctamente
      return {success : false, nombre : "La conexión a Firebase no se ha establecido correctamente."};
    }

  } catch (error) {
    // Maneja los errores de inicio de sesión aquí
    return  { success: false, nombre: 'Usuario y/o Contraseña incorrectas' };

    return false;
  }
};

export const checkUser = async (username) => {
  try {
    // Inicializa Firebase Auth y Firestore
    const db = getFirestore();
    if (db) {
      // Verifica si el usuario existe en la colección de usuarios en Firestore
      const usersRef = collection(db, "Usuarios");
      const q = query(usersRef, where("nombreUsuario", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        return  true;
      }
      return false


      // El usuario ha iniciado sesión con éxito y existe en la colección de usuarios

    } else {
      // Si la conexión no se estableció correctamente
      return {success : false, nombre : "La conexión a Firebase no se ha establecido correctamente."};
    }

  } catch (error) {
    // Maneja los errores de inicio de sesión aquí
    return  { success: false, nombre: 'Usuario y/o Contraseña incorrectas' };

    
  }
}

