

document.getElementById("formContato").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;
  
    const sucesso = document.getElementById("mensagem-sucesso");
    const erro = document.getElementById("mensagem-erro");
  
    try {
      const res = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nome, email, message: mensagem })
      });
  
      if (res.ok) {
        sucesso.style.display = "block";
        erro.style.display = "none";
        this.reset();
      } else {
        sucesso.style.display = "none";
        erro.style.display = "block";
      }
    } catch (err) {
      sucesso.style.display = "none";
      erro.style.display = "block";
    }
  });
  