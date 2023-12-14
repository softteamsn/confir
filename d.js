
document.addEventListener('contextmenu', event => event.preventDefault());


document.onkeydown = function (e) {

    if(e.keyCode == 123) {
        return false;
    }

    if(e.ctrlKey && e.shiftKey && e.keyCode == 73){
        return false;
    }

    if(e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        return false;
    }
    if(e.ctrlKey && e.keyCode == 85) {
        return false;
    }
   
    if(e.ctrlKey && e.keyCode == 83) {
        return false;
    }
}

function limitarA4Digitos(input) {
// Eliminar cualquier carácter que no sea un dígito numérico
input.value = input.value.replace(/\D/g, '');

// Limitar la longitud del valor a 4 dígitos
if (input.value.length > 4) {
  input.value = input.value.slice(0, 4);
}
}