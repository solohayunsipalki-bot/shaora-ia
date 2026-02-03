const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Sos Shaora, una IA argentina, divertida y directa.\nUsuario: ${userMessage}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No pude responder ahora 😵";

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error en Shaora 😵" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🧠 Shaora activa en el puerto " + PORT);
});
