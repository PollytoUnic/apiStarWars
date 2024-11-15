let boton = document.getElementById("resultado");
let boton2 = document.getElementById("resultado2");
let boton3 = document.getElementById("resultado3");

let rangos_id = {
    boton: { inicio: 1, fin: 5 },
    boton2: { inicio: 6, fin: 10 },
    boton3: { inicio: 11, fin: 16 },
};

let contador1 = 1;
let contador2 = 6;
let contador3 = 11;

// Conjuntos para evitar repetición de personajes
let personajesMostrados = {
    "section-1-5": new Set(),
    "section-6-10": new Set(),
    "section-11-16": new Set(),
};

async function obtenerPersonaje(id) {
    try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        alert(`El personaje con el id: ${id} no pudo ser encontrado`);
    }
}

function mostrarUnPersonaje(boton, contenedorId, contador, rango) {
    boton.addEventListener("mouseenter", async () => {
        const contenedor = document.getElementById(contenedorId);
        const personajesVistos = personajesMostrados[contenedorId];
        let intentos = 0;

        while (personajesVistos.has(contador) && intentos < (rango.fin - rango.inicio + 1)) {
            contador++;
            if (contador > rango.fin) contador = rango.inicio;
            intentos++;
        }

        if (intentos >= (rango.fin - rango.inicio + 1)) {
            alert("Todos los personajes de este rango ya han sido mostrados.");
            return;
        }

        const personaje = await obtenerPersonaje(contador);

        if (personaje) {
            personajesVistos.add(contador);

            const card = document.createElement("div");
            card.classList.add("personaje-card", "visible");
            card.innerHTML = `
                <h3>${personaje.name}</h3>
                <p>Altura: ${personaje.height} cm</p>
                <p>Peso: ${personaje.mass} kg</p>`;
            contenedor.appendChild(card);
        }

        contador++;
        if (contador > rango.fin) contador = rango.inicio;
    });
}

mostrarUnPersonaje(boton, "section-1-5", contador1, rangos_id.boton);
mostrarUnPersonaje(boton2, "section-6-10", contador2, rangos_id.boton2);
mostrarUnPersonaje(boton3, "section-11-16", contador3, rangos_id.boton3);

/*
let boton = document.getElementById("resultado");
let boton2 = document.getElementById("resultado2");
let boton3 = document.getElementById("resultado3");

let contador1 = 1;
let contador2 = 6;
let contador3 = 11;


async function obtenerPersonaje(id) {
    try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        alert(`El personaje con el id: ${id} no pudo ser encontrado`);
    }
}

function mostrarUnPersonaje(boton, contenedorId, contadorInicial) {
    boton.addEventListener("mouseenter", async () => {
        const contenedor = document.getElementById(contenedorId);
        contenedor.innerHTML = '';
        const idAleatorio = Math.floor(Math.random() * (rangoMax - rangoMin + 1)) + rangoMin;
const personaje = await obtenerPersonaje(idAleatorio);
        if (personaje) {
            const card = document.createElement("div");
            card.classList.add("personaje-card", "visible");
            card.innerHTML = `
                <h3>${personaje.name}</h3>
                <p>Altura: ${personaje.height} cm</p>
                <p>Peso: ${personaje.mass} kg</p>
            `;
            contenedor.appendChild(card);
        }
        if (contenedorId === "section-1-5") {
            contador1++;
            if (contador1 > 5) contador1 = 1;
        } else if (contenedorId === "section-6-10") {
            contador2++;
            if (contador2 > 10) contador2 = 6;
        } else if (contenedorId === "section-11-16") {
            contador3++;
            if (contador3 > 16) contador3 = 11;
        }
    });
}

mostrarUnPersonaje(boton, "section-1-5", contador1);
mostrarUnPersonaje(boton2, "section-6-10", contador2);
mostrarUnPersonaje(boton3, "section-11-16", contador3);*/

