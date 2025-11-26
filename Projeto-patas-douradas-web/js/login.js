document.getElementById("form-login").addEventListener("submit", async function(event) {
    event.preventDefault();

    // 1. Captura os dados
    const usernameInput = document.getElementById("email").value; 
    const senhaInput = document.getElementById("senha").value;

    const payload = {
        username: usernameInput, 
        senha: senhaInput
    };

    console.log("Tentando logar com:", payload);

    try {
        const response = await fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include', // Permite salvar a sessão
            body: JSON.stringify(payload)
        });

        // 2. Verifica se deu certo
        if (response.ok) {
            const mensagemTexto = await response.text(); 
            console.log("Sucesso:", mensagemTexto);

            localStorage.setItem("usuarioLogado", "true");

            alert("Login realizado! Redirecionando...");
            
            // CORREÇÃO AQUI: 
            // Se o seu HTML usa ../../index.html, o JS tem que usar o mesmo caminho
            window.location.href = "../../index.html"; 
        } else {
            const erroTexto = await response.text();
            alert("Erro no Login: " + (erroTexto || "Usuário ou senha inválidos"));
        }

    } catch (error) {
        console.error("Erro técnico:", error);
        alert("Erro de Conexão: Verifique se o Backend (Java) está rodando.");
    }
});