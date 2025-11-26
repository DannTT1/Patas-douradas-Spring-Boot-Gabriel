document.addEventListener("DOMContentLoaded", () => {
    console.log("Iniciando busca de pedidos...");
    carregarPedidos();
});

async function carregarPedidos() {
    const container = document.getElementById("lista-pedidos");
    if (!container) {
        console.error("Container lista-pedidos não encontrado!");
        return;
    }
    
    // 1. Validação de Login
    const usuarioLogadoString = localStorage.getItem("usuarioLogado");
    
    // Verifica se existe e se não é o "true" antigo
    if (!usuarioLogadoString || usuarioLogadoString === "true") {
        console.warn("Usuário não logado ou sessão inválida.");
        container.innerHTML = `
            <div class="aviso-login" style="text-align: center; padding: 20px;">
                <p>Você precisa estar logado para ver seus pedidos.</p>
                <a href="../login-cadastro/login.html" class="btn-principal" style="background-color: #ff9f1c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ir para Login</a>
            </div>`;
        return;
    }

    let usuario;
    try {
        usuario = JSON.parse(usuarioLogadoString);
    } catch (e) {
        localStorage.removeItem("usuarioLogado");
        location.reload();
        return;
    }

    console.log("Buscando pedidos para o usuário ID:", usuario.id);

    try {
        // 2. Conexão com o Backend
        const response = await fetch(`http://localhost:8080/pedidos/usuario/${usuario.id}`);
        console.log("Status da resposta:", response.status);

        if (response.status === 204 || response.status === 404) {
            container.innerHTML = "<p style='text-align:center'>Você ainda não fez nenhum pedido.</p>";
            return;
        }

        if (!response.ok) {
            throw new Error("Erro ao buscar dados no servidor.");
        }

        const pedidos = await response.json();
        console.log("Pedidos recebidos:", pedidos);

        container.innerHTML = "";
        pedidos.reverse(); 

        pedidos.forEach(pedido => {
            const card = document.createElement("div");
            card.className = "pedido-card";
            
            // Estilos inline para garantir visualização imediata
            card.style.border = "1px solid #ddd";
            card.style.padding = "15px";
            card.style.marginBottom = "15px";
            card.style.borderRadius = "8px";
            card.style.backgroundColor = "white";
            card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";

            const dataObj = new Date(pedido.data);
            const dataString = dataObj.toLocaleDateString() + " às " + dataObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            let listaItensHTML = "";
            if (pedido.itens && pedido.itens.length > 0) {
                pedido.itens.forEach(item => {
                    listaItensHTML += `
                        <li style="margin-bottom: 8px; border-bottom: 1px dashed #eee; padding-bottom: 5px;">
                            <strong style="color: #333;">${item.nomeProduto}</strong> <br>
                            <span style="color: #666; font-size: 0.9em;">
                                ${item.quantidade}x R$ ${item.precoUnitario.toFixed(2)}
                            </span>
                            <span style="float: right; font-weight: bold; color: #555;">
                                R$ ${item.subtotal.toFixed(2)}
                            </span>
                        </li>
                    `;
                });
            }

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #f0f0f0; padding-bottom:10px; margin-bottom:10px;">
                    <h3 style="margin:0; color:#ff9f1c; font-size: 1.2em;">Pedido #${pedido.id}</h3>
                    <span style="font-size:0.85em; color:#999;">${dataString}</span>
                </div>
                
                <div class="itens-pedido" style="margin-bottom: 15px;">
                    <ul style="list-style:none; padding:0; margin:0;">
                        ${listaItensHTML}
                    </ul>
                </div>
                
                <div style="text-align:right; font-size:1.3em; font-weight:bold; color:#28a745; border-top: 1px solid #eee; padding-top: 10px;">
                    Total: R$ ${pedido.total.toFixed(2)}
                </div>
            `;

            container.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro técnico:", erro);
        container.innerHTML = `<p style="color:red; text-align:center;">Não foi possível carregar seus pedidos. Verifique se o servidor está ligado.</p>`;
    }
}