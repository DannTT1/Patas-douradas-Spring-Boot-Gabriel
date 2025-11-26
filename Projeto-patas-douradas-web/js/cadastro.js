document.getElementById("formularioCadastro").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // 1. Capturar os valores
    const nome = document.getElementById("nomeUsuario").value;
    const username = document.getElementById("loginUsuario").value;
    const email = document.getElementById("emailUsuario").value;
    const senha = document.getElementById("senhaUsuario").value;
    const repeticaoSenha = document.getElementById("confirmarSenhaUsuario").value;

    // Captura o Radio Button
    const tipoContaInput = document.querySelector('input[name="opcaoLoginCadastro"]:checked');
    const tipoContaValor = tipoContaInput ? tipoContaInput.value : "cliente";

    // 2. Validação Rápida
    if (senha !== repeticaoSenha) {
        alert("Erro: As senhas não coincidem!");
        return;
    }

    // 3. Montar o Objeto JSON
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
        // Fizemos a chamada direta
        const response = await fetch("http://localhost:8080/usuarios", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objetoCadastro)
        });

        // --- TRATAMENTO MANUAL DA RESPOSTA (Sem usar handleResponse) ---
        
        // Se o servidor retornou sucesso (Código 200 ou 201)
        if (response.ok) {
            // Tenta ler se veio algum JSON de resposta, senão ignora
            const jsonResposta = await response.json().catch(() => {});
            console.log("Sucesso:", jsonResposta);
            
            alert("Cadastro realizado com sucesso! Você será redirecionado.");
            window.location.href = "login.html";
        } 
        // Se deu erro (Código 400, 403, 500...)
        else {
            // Tenta pegar a mensagem de texto que o Java mandou
            const erroTexto = await response.text();
            console.error("Erro do servidor:", erroTexto);
            throw new Error(erroTexto || "Erro desconhecido no servidor");
        }

    } catch (error) {
        // Se cair aqui, ou é erro de conexão (backend desligado/CORS) ou erro que lançamos acima
        console.error("Erro na requisição:", error);
        
        if (error.message.includes("Failed to fetch")) {
            alert("Erro de Conexão: O servidor parece estar desligado ou bloqueando o acesso (CORS). Verifique se o backend está rodando na porta 8080.");
        } else {
            alert("Falha ao cadastrar: " + error.message);
        }
    }
});