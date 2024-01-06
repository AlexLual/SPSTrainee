//importamos Hooks
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
//impotamos react router
import { Link } from 'react-router-dom'

// importamos firebase
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'

//Conexion de base de datos
import { db } from '../FirebaseConfig/Firebase.jsx'
//Importamos Sweetalert2 para hacer una alerta cuando eliminemos un candidato.
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { async } from '@firebase/util'

const MySwal = withReactContent(Swal)



const ListaCandidatos = () => {
  //1- Configuramos Hooks
  const [candidatos, setCandidatos] = useState([]);
  //2-Referenciamos a DB de firestore

  const candidatosCollection = collection(db, "candidatos");

  //3- Funcion para mostrar todos los Candidatos

  const getCandidatos = async () => {
    const data = await getDocs(candidatosCollection);
    setCandidatos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  //4- Funcion para eliminar Candidato
  const deleteCandidato = async (id) => {
    const candidatoDoc = doc(db, "candidatos", id);
    await deleteDoc(candidatoDoc);
    getCandidatos();
  };

  //5- Funcion de Confirmacion de SweetAlert2 obtenida de su sitio https://sweetalert2.github.io/
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //Llamamos la funcion para eliminar
        deleteCandidato(id)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  //6- Usamos useEffect
  useEffect(() => {
    getCandidatos();
  }, []);
  
  //7- Devolvemos vista de nuestro componente
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link
                to="/crearcandidato"
                className="btn btn-secondary mt-2 mb-2"
              >
                Crear Candidato
              </Link>
            </div>
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidatos.map((candidato) => (
                  <tr key={candidato.id}>
                    <td>{candidato.nombre}</td>
                    <td>
                      <Link
                        to={`/editarcandidato/${candidato.id}`}
                        className="btn btn-light"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <button onClick={() => { confirmDelete(candidato.id) } } className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCandidatos
