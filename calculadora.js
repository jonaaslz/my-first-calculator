/* ==================================== */
/* 1. SELECCIÓN Y VARIABLES GLOBALES */
/* ==================================== */

/* Seleccionamos los elementos del DOM (Asumo que tu ID es 'pantallica' y no la clase) */
const display = document.getElementById("pantallica"); // Usar getElementById para IDs
const buttons = document.querySelectorAll(".btn");

/* Variables para almacenar los operandos y el operador */
let operandoactual = "0"; // Inicializar en "0" para mostrar algo
let operandoanterior = "";
let operador = null;

/* ==================================== */
/* 2. MANEJO DE EVENTOS (CLICK) */
/* ==================================== */

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const valor = button.dataset.value;
        
        // 💡 Llama a la función principal, que está definida abajo
        manejarimput(valor); 
        
        // 💡 Actualiza la pantalla después de cada acción
        actualdisplay(); 
    });
});

/* ==================================== */
/* 3. FUNCIONES DE LÓGICA (DEFINICIÓN GLOBAL) */
/* ==================================== */

function manejarimput(valor) {
    if (!isNaN(valor) || valor === ".") {
        if (operandoactual === "0" && valor !== ".") operandoactual = valor;
        else if (valor === "." && operandoactual.includes(".")) return;
        else operandoactual += valor;

    } else if (valor === "+" || valor === "-" || valor === "*" || valor === "/") {

        if (operandoactual === "" && operandoanterior === "") return;
        if (operandoanterior !== "") ejecutarcalculo();

        operador = valor;
        operandoanterior = operandoactual;
        operandoactual = "";

    } else if (valor === "=") {
        ejecutarcalculo();

    } else if (valor === "C") {
        limpiar();

    } else if (valor === "DEL") {
        operandoactual = operandoactual.slice(0, -1);
        if (operandoactual === "") operandoactual = "0"; // Asegura que no quede vacío
    }
}

function ejecutarcalculo() {
    if (operandoanterior === "" || operandoactual === "" || operador === null) return;

    const prev = parseFloat(operandoanterior);
    const current = parseFloat(operandoactual);
    let resultado = 0;

    switch (operador) {
        case "+": resultado = prev + current; break;
        case "-": resultado = prev - current; break;
        case "*": resultado = prev * current; break;
        case "/": 
            if (current === 0) {
                 alert('Error: División por cero');
                 limpiar();
                 return;
            }
            resultado = prev / current; break;
    }

    operandoactual = resultado.toString();
    operador = null;
    operandoanterior = "";
}

function limpiar() {
    operandoactual = "0";
    operandoanterior = "";
    operador = null;
}

function actualdisplay() {
    // Si operandoactual está vacío, usa operandoanterior. Si ambos están vacíos, usa "0".
    display.textContent = operandoactual || operandoanterior || "0";
}

/* ==================================== */
/* 4. INICIALIZACIÓN */
/* ==================================== */

// Llama a la función inicial para mostrar "0" al cargar la página
limpiar();