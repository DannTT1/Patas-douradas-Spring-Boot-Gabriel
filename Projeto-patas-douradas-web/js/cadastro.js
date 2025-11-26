document.getElementById("formularioCadastro").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeUsuario").value;
    const username = document.getElementById("loginUsuario").value;
    const email = document.getElementById("emailUsuario").value;
    const senha = document.getElementById("senhaUsuario").value;
    const repeticaoSenha = document.getElementById("confirmarSenhaUsuario").value;

    const tipoContaInput = document.querySelector('input[name="opcaoLoginCadastro"]:checked');
    const tipoContaValor = tipoContaInput ? tipoContaInput.value : "cliente";

    if (senha !== repeticaoSenha) {
        alert("Erro: As senhas não coincidem!");
        return;
    }

    const objetoCadastro = {
        nome: nome,
        username: username,
        email: email,
        senha: senha,
        repeticaoSenha: repeticaoSenha,
        tipoConta: tipoContaValor.toUpperCase() 
    };

    console.log("Enviando cadastro:", objetoCadastro);

    try {
        const response = await fetch("http://localhost:8080/usuarios", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objetoCadastro)
        });

        
        if (response.ok) {
            const jsonResposta = await response.json().catch(() => {});
            console.log("Sucesso:", jsonResposta);
            
            alert("Cadastro realizado com sucesso! Você será redirecionado.");
            window.location.href = "login.html";
        } 
        else {
            const erroTexto = await response.text();
            console.error("Erro do servidor:", erroTexto);
            throw new Error(erroTexto || "Erro desconhecido no servidor");
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        
        if (error.message.includes("Failed to fetch")) {
            alert("Erro de Conexão: O servidor parece estar desligado ou bloqueando o acesso (CORS). Verifique se o backend está rodando na porta 8080.");
        } else {
            alert("Falha ao cadastrar: " + error.message);
        }
    }
});