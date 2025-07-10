require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MAILERSEND_API_TOKEN}`,
      },
      body: JSON.stringify({
        from: { email: process.env.FROM_EMAIL, name: "Portfólio" },
        to: [{ email: process.env.TO_EMAIL, name: "Destinatário" }],
        subject: "Nova mensagem do portfólio",
        text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
      }),
    });

    if (response.ok) {
      res.status(200).json({ message: "Email enviado com sucesso!" });
    } else {
      const error = await response.json();
      res.status(500).json({ error });
    }
  } catch (err) {
    res.status(500).json({ error: "Erro ao enviar email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

