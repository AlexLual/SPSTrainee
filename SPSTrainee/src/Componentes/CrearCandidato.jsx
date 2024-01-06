import React from 'react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../FirebaseConfig/Firebase.jsx'

const CrearCandidato = () => {

  //Configuramos Hooks
  const [nombre, setNombre] = useState("");
  const [habilidad_1, setHabilidad_1] = useState("");
  const [habilidad_2, setHabilidad_2] = useState("");
  const [habilidad_3, setHabilidad_3] = useState("");
  
  const navigate = useNavigate()
  
  //base de datos
  const candidatosCollection = collection(db, "candidatos")
  
  const totalCandidatos = async (e) => {
    e.preventDefault()
    await addDoc(candidatosCollection, {nombre:nombre, habilidad_1: habilidad_1, habilidad_2: habilidad_2, habilidad_3: habilidad_3})
    navigate('/')
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Crear Candidato</h1>
          <form onSubmit={totalCandidatos}>
            <div className="mb-3">
              <label className="form_label">Nombre </label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="form-control"
                type="text"
              />
            </div>

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
            <button type='submit' className='btn btn-primary'>Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearCandidato

