import React from 'react'
//importarmos Hooks
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//importamos funciones de firebase
import { getDoc, updateDoc, doc } from 'firebase/firestore'
//importamos base de datos
import { db } from '../FirebaseConfig/Firebase'

const EditarCandidato = () => {
  //Configuamos Hooks
 const [nombre, setNombre] = useState("");
 const [habilidad_1, setHabilidad_1] = useState("");
 const [habilidad_2, setHabilidad_2] = useState("");
 const [habilidad_3, setHabilidad_3] = useState("");

  const navigate = useNavigate()
  const { id } = useParams()
  //Funcion actualizar
  const update = async (e) => {
    e.preventDefault()
    const candidatos = doc(db, "candidatos", id)
    const data = {
      habilidad_1: habilidad_1,
      habilidad_2: habilidad_2,
      habilidad_3: habilidad_3,
    }
    await updateDoc(candidatos, data)
    navigate('/')
  }
    const getCandidatosById = async (id) => { 
      const candidatos = await getDoc(doc(db, "candidatos", id))
      if (candidatos.exists()) {
        setHabilidad_1(candidatos.data().habilidad_1)
        setHabilidad_2(candidatos.data().habilidad_2)
        setHabilidad_3(candidatos.data().habilidad_3);
      } else {
        console.log("El candidato existe");
      }
    }
    useEffect(() => {
      getCandidatosById(id)
    }, []);

   

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Editar Candidato</h1>
          <form onSubmit={update}>
            <div className="mb-3">
              <label className="form_label">Habilidad 1 </label>
              <input
                value={habilidad_1}
                onChange={(e) => setHabilidad_1(e.target.value)}
                className="form-control"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form_label">Habilidad 2 </label>
              <input
                value={habilidad_2}
                onChange={(e) => setHabilidad_2(e.target.value)}
                className="form-control"
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form_label">Habilidad 3 </label>
              <input
                value={habilidad_3}
                onChange={(e) => setHabilidad_3(e.target.value)}
                className="form-control"
                type="text"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarCandidato
