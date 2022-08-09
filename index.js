//FORMULARIO
let formulario = document.getElementById("form")
let buttonEnviar = document.getElementById("button")

// Mouse Event Click
buttonEnviar.onclick = (e) => {
  e.preventDefault()
  let inputNombre = document.getElementById("nombre").value
  let inputApellido = document.getElementById("apellido").value
  let inputEmpresa = document.getElementById("empresa").value
  let inputTelefono = document.getElementById("telefono").value
  let inputEmail = document.getElementById("email").value
  let inputComentario = document.getElementById("comentario").value

  //Mensaje al usuario y devolución por consola

  /*let div2 = document.getElementById("div1")
  div2.innerHTML = `<h1>Muchas gracias ${inputNombre} ${inputApellido}!</h1> <h2>Estaremos respondiendo a tu consulta por correo a la casilla ${inputEmail} dejandote la información para que ustedes, ${inputEmpresa}, puedan contactarnos. De no obtener respuesta les estaremos llamando al ${inputTelefono}.`;*/

  // USO DE LIBRERIA
  Swal.fire({
    background: '#a56800',
    title: 'Muchas gracias!',
    icon: 'success',
    text:`${inputNombre} ${inputApellido}, nos comunicaremos por correo a la casilla ${inputEmail} con la información requerida para avanzar con la contratación. De no obtener respuesta dentro de los 5 días hábiles, nos contactaremos vía telefónica al ${inputTelefono}. `,
    confirmButtonText: 'Hecho!',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
  })

  const arrayInput = [inputNombre, inputApellido, inputEmpresa, inputTelefono, inputEmail, inputComentario]

  console.log(arrayInput);
  localStorage.setItem("arrayInput", JSON.stringify(arrayInput))
  let inputUsuario = localStorage.getItem("arrayInput")
  let inputObj = JSON.parse(inputUsuario)

  inputObj.forEach(element => {
    console.log(element)
});

console.log(typeof inputUsuario === "object")
}


//COTIZACION
// Cantidad de horas y funcion click.
let horasCant = document.getElementById("horasCant")
let botonHoras = document.getElementById("botonHoras")
botonHoras.onclick = () => {
  console.log(horasCant.value);
  localStorage.setItem("Cantidad de horas a contratar",horasCant.value)
}
// Constuctor de eventos
class Eventos {
  constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
  }
}

const fiestaPrivada = new Eventos("Fiesta Privada", 65000);
const cumpleaños = new Eventos("Fiesta de cumpleaños", 60000);
const casamiento = new Eventos("Casamiento", 90000);
const eventoSocial = new Eventos("Evento para entidades sin fines de lucro", 45000);
const fiestaCorporativa = new Eventos("Fiesta Corporativa", 75000);
const eventoReligioso = new Eventos("Evento Religioso", 50000);

const eventos = []

eventos.push (fiestaPrivada, cumpleaños, casamiento, eventoSocial, fiestaCorporativa, eventoReligioso)

//Funcion calculo total

let select = document.createElement("select");
let select2 = document.getElementById("select")
select.innerHTML += `<option> Seleccioná el evento </option>`;
for (i = 0; i < eventos.length; i++) {
    select.innerHTML += `
    <option value='${i}'>${eventos[i].nombre} $${eventos[i].precio}  </option>`;
    select2.appendChild(select)
}

//GENERO EL EVENTO
select.addEventListener('change', function (e) {
  console.log(eventos[e.target.value].precio)
  valorTotal.innerHTML =
    valorTotal.classList.add("multiplicar")
    costo = (horasCant.value) * (eventos[e.target.value].precio)
    valorTotal.innerText = ("$ " + costo)
    localStorage.setItem("Precio total de cotización", costo)

    const datosUsuarioJSON = [horasCant.value, eventos[e.target.value].nombre, eventos[e.target.value].precio, costo]

  localStorage.setItem("datosUsuarioJSON", JSON.stringify(datosUsuarioJSON))
  let datosUsuario = localStorage.getItem("datosUsuarioJSON")
  let datosObj = JSON.parse(datosUsuario)

  datosObj.forEach(element => {
    console.log(element)
});
})

select2.appendChild(select);

//BOTON DELETE

let buttonReset = document.getElementById("resetear")

buttonReset.onclick = (e) => {
  e.preventDefault()
  document.getElementById("valorTotal").innerText = '$0.00';
  select.innerHTML += ``;
  document.getElementById("horasCant").value = '';
}

//USO DE API

const formu = document.getElementById("formulario")


formu.onsubmit = async(e) => {
  e.preventDefault()
  const informacion = await fetch (`https://rickandmortyapi.com/api/character/?name=${e.target.children[0].value}`)
  .then(response=>response.json())
  .then(response=>{
    listado.innerHTML=''
    response.results.splice(0,e.target.children[2].value).forEach(element=> {
      const li = document.createElement('li')
      li.innerHTML = `
      <h2> ${element.name}</h2>
      <img src=${element.image}>
      <p>${element.species} - ${element.gender}</p>`
      listado.appendChild(li)
    })
  })
  .catch(err=>console.log(err))
}