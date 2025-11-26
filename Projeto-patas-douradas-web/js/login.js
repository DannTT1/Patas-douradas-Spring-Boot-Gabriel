document.getElementById("form-login").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("email").value; 
    const senhaInput = document.getElementById("senha").value;

    const payload = { username: usernameInput, senha: senhaInput };

    try {
        const response = await fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // O Backend retorna: { "id": 1, "nome": "Fulano", "tipoUsuario": "CLIENTE" }
            const dadosUsuario = await response.json(); 
            
            console.log("Dados recebidos do Java:", dadosUsuario);

            // REGRA DE OURO: Salvamos o OBJETO inteiro, não apenas "true"
            localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));

            alert(`Bem-vindo(a), ${dadosUsuario.nome}!`);

            if (dadosUsuario.tipoUsuario === "VENDEDOR") {
                window.location.href = "../vendedor/painel-vendedor.html"; 
            } else {
                window.location.href = "../../index.html"; 
            }
        } else {
            const erroTexto = await response.text();
            alert("Erro no Login: " + erroTexto);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão com o servidor.");
    }
});