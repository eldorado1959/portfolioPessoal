
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
  
      const result = await response.json(); // Adiciona isso
  
      if (response.ok) {
        res.status(200).json({ message: "Email enviado com sucesso!" });
      } else {
        console.error("Erro MailerSend:", result); // Mostra erro real
        res.status(500).json({ error: result });
      }
    } catch (err) {
      console.error("Erro inesperado:", err); // Mostra erro geral
      res.status(500).json({ error: "Erro ao enviar email." });
    }
  });
  