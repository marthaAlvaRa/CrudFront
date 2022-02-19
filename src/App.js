import React, {useState ,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {useHistory} from 'react-router-dom';




function App() {
  const baseUrl="https://localhost:44388/api/recibos";
  const [data, setData]=useState([]);
  const history=useHistory();
  const [modalEditar, setModalEditar]=useState(false);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [reciboSelect, setReciboSelect]=useState({
    id:'',
    proveedor:'',
    monto:'',
    moneda:'',
    fecha:'',
    comentario:''

  })
  const handleChange=e=>{
    const {name,value}=e.target;
    setReciboSelect({
      ...reciboSelect,
      [name]:value
});
  console.log(reciboSelect);
} 
const abrirCerrarModalInsertar=()=>{
  setModalInsertar(!modalInsertar);
}

const abrirCerrarModalEditar=()=>{
  setModalEditar(!modalEditar);
}

const abrirCerrarModalEliminar=()=>{
  setModalEliminar(!modalEliminar);
}

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    delete reciboSelect.id;
    reciboSelect.monto=parseFloat(reciboSelect.monto);
    await axios.post(baseUrl,reciboSelect)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const cerrarSesion=()=>{
    history.push('./');
  }  

  const peticionPut=async()=>{
    reciboSelect.monto=parseFloat(reciboSelect.monto);
   await axios.put(baseUrl+"/"+reciboSelect.id, reciboSelect)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map(recibo=>{
        if(recibo.id===reciboSelect.id){
          recibo.proveedor=respuesta.proveedor;
          recibo.monto=respuesta.monto;
          recibo.moneda=respuesta.moneda;
          recibo.fecha=respuesta.fecha;
          recibo.comentario=respuesta.comentario;
        }
      } );
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }
  
  const peticionDelete=async()=>{
   await axios.delete(baseUrl+"/"+reciboSelect.id)
    .then(response=>{
      setData(data.filter(recibo=>recibo.id!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const seleccionarRecibo=(recibo, caso)=>{
    setReciboSelect(recibo);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    
    <div className="App"><br/><br />

   <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Registrar nuevo recibo</button>
   <button onClick={()=>cerrarSesion()} className="btn btn-danger">Cerrar sesión</button>
 
      <table className="table table-border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Monto</th>
            <th>Moneda</th>
            <th>Fecha</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(Recibo=>(
            <tr key={Recibo.id}>
              <td>{Recibo.id}</td>
              <td>{Recibo.proveedor}</td>
              <td>{Recibo.monto}</td>
              <td>{Recibo.moneda}</td>
              <td>{Recibo.fecha}</td>
              <td>{Recibo.comentario}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarRecibo(Recibo,"Editar")}>Editar</button>{" "}
                <button className="btn btn-danger" onClick={()=>seleccionarRecibo(Recibo,"Eliminar")} >Eliminar</button>{" "}
              </td>
            </tr>

          ))}

        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Registrar nuevo recibo</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Proveedor</label>
            <br />
            <input type="text" className="form-control" name="proveedor" onChange={handleChange}/>
            <br />
            <label>Monto</label>
            <br />
            <input type="float" className="form-control" name="monto" onChange={handleChange}/>
            <br />
            <label>Moneda</label>
            <br />
            <input type="text" className="form-control" name="moneda" onChange={handleChange}/>
            <br />
            <label>Fecha</label>
            <br />
            <input type="date" className="form-control" name="fecha" onChange={handleChange}/>
            <br />
            <label>Comentarios</label>
            <br />
            <input type="text" className="form-control" name="comentario" onChange={handleChange}/>
            <br />
           
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"onClick={()=>peticionPost()}>Insertar</button>{"  "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Modificar recibo</ModalHeader>
        <ModalBody>
          <div className="form-group">
          <label>Id:</label>
            <br />
            <input type="text" className="form-control" readOnly value={reciboSelect&&reciboSelect.id}/>
            <br />
            <label>Proveedor</label>
            <br />
            <input type="text" className="form-control" name="proveedor" onChange={handleChange} value={reciboSelect&&reciboSelect.proveedor}/>
            <br />
            <label>Monto</label>
            <br />
            <input type="float" className="form-control" name="monto" onChange={handleChange} value={reciboSelect&&reciboSelect.monto}/>
            <br />
            <label>Moneda</label>
            <br />
            <input type="text" className="form-control" name="moneda" onChange={handleChange} value={reciboSelect&&reciboSelect.moneda}/>
            <br />
            <label>Fecha</label>
            <br />
            <input type="date" className="form-control" name="fecha" onChange={handleChange} value={reciboSelect&&reciboSelect.fecha}/>
            <br />
            <label>Comentarios</label>
            <br />
            <input type="text" className="form-control" name="comentario" onChange={handleChange} value={reciboSelect&&reciboSelect.comentario}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"onClick={()=>peticionPut()}>Editar</button>{"  "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalHeader>Modificar recibo</ModalHeader>
        <ModalBody>
          ¿Estàs seguro que deseas eliminar ese registro de la base de datos? {reciboSelect&&reciboSelect.proveedor}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger"onClick={()=>peticionDelete()}>Si</button>
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
    );
}

export default App;