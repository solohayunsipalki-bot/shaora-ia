const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint principal del chat
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Respuesta simple de prueba (por ahora, sin OpenAI)
    const reply = `Hola 👋 soy Shaora. Dijiste: "${userMessage}"`;

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Error en Shaora" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🤖 Shaora está viva en http://localhost:${PORT}`);
});
