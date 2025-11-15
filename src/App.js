import { useState, useEffect } from "react";

const API_URL = "https://umb-web-taller.onrender.com";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // Obtener todas las tareas (GET a index.php)
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error cargando tareas:", err));
  }, []);

  // Agregar tarea (POST a index.php)
  const agregarTarea = (e) => {
    e.preventDefault();

    if (nuevaTarea.trim() === "") return;

    const datos = { titulo: nuevaTarea };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then((res) => res.json())
      .then(() => {
        // Recargar tareas después de crear
        fetch(API_URL)
          .then((res) => res.json())
          .then((data) => setTareas(data));
        setNuevaTarea("");
      })
      .catch((err) => console.error("Error creando tarea:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Tareas</h1>

      <form onSubmit={agregarTarea}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button>Agregar</button>
      </form>

      <ul>
        {tareas.map((t) => (
          <li key={t.id}>{t.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

