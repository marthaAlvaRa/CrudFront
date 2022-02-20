import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import './Login.css';


function Login(props) {
  const baseUrl2="https://localhost:44388/api/usuarios";
  const history=useHistory();
  const [form, setForm]=useState({
    usuario:'',
    passwd:''

  });
  const handleChange=e=>{
    const {name,value} = e.target;
    setForm({
      ...form,
      [name]:value
});
console.log(form); 
} 
    const util=form.usuario;
    const pw=form.passwd;
    const n=util.length;
    const m=pw.length;

const iniciarSesion=async()=>{
  if(n===0 || m===0){
  alert("Introduzca un usuario y una contraseña");
}
  await axios.get(baseUrl2+`/${form.usuario}/${form.passwd}`)
  .then(response=>{
    return response.data;
  }).then (response=>{
     if(response.length>0){
      var respuesta=response[0];
      alert("Bienvenido "+ util)
      history.push('/App');
      console.log(respuesta);
    }else{
      alert('El usuario o la contraseña no son correctos');
      
    }
  
  })

  .catch(error=>{
    console.log(error);
  })
}
  return (
    <div className="containerPrincipal">
        <div className="containerLogin">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="usuario"
              onChange={handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password" 
              className="form-control"
              name="passwd"
              onChange={handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=>iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
  );
}
export default Login;