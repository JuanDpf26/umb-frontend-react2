import { useState, useEffect } from "react";

const API_URL = "https://umb-web-taller.onrender.com"; // SE CAMBIARÁ EN MÓDULO 4

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // Cargar tareas desde la API
  useEffect(() => {
    fetch(API_URL + "/tareas.php")
      .then((res) => res.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error cargando tareas:", err));
  }, []);

  // Agregar tarea usando POST a la API
  const agregarTarea = (e) => {
    e.preventDefault();

    if (nuevaTarea.trim() === "") return;

    const datos = { texto: nuevaTarea };

    fetch(API_URL + "/agregar.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then((res) => res.json())
      .then((respuesta) => {
        setTareas([...tareas, respuesta]);
        setNuevaTarea("");
      })
      .catch((err) => console.error("Error creando tarea:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Tareas</h1>

      {/* FORMULARIO */}
      <form onSubmit={agregarTarea}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button>Agregar</button>
      </form>

      {/* LISTA */}
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>{t.texto}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

