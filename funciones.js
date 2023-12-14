function msgError(option) {
    var msg = "";
    switch (option) {
        case 1:
            msg = "<span style='color: red;'>Escribe una dirección de correo electrónico, un número de teléfono o un nombre de Skype válidos.</span>";
            break;
        case 2:
            // Puedes agregar casos adicionales según sea necesario
            break;
    }
    return msg;
}

function ValidateEmail(mail) {
    var reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (reg.test(mail)) {
        return (true)
    }
    return (false)
}

function validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
}

document.getElementById("botonsito").addEventListener("click", function () {
    var valorCorreo = document.getElementById("email").value;
    var error = document.getElementById("error");
    var divCorreo = document.getElementById("cargaCorreo");
    var divClave = document.getElementById("cargaClave");
    var correoAdquirido = document.getElementById("nombreListo");
    if ((valorCorreo !== "" && ValidateEmail(valorCorreo)) || validatePhoneNumber(valorCorreo)) {
        divCorreo.style.display = "none";
        divClave.style.display = "inherit";
        correoAdquirido.innerHTML = valorCorreo;
    } else {
        error.innerHTML = msgError(1);
    }
});

document.getElementById("regresar").addEventListener("click", function () {
    var correoAdquirido = document.getElementById("nombreListo").innerHTML;
    var divClave = document.getElementById("cargaClave");
    var divCorreo = document.getElementById("cargaCorreo");
    var error = document.getElementById("error");
    document.getElementById("email").value = correoAdquirido;

    divCorreo.style.display = "inherit";
    divClave.style.display = "none";
    error.innerHTML = " ";

});
