document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();
    inicializarEventos();
});

function obtainingCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const carrinho = obtainingCarrinho();
    const container = document.getElementById("itens-carrinho");
    const totalSpan = document.getElementById("total");
    const botaoFinalizar = document.getElementById("finalizar-pedido-btn");
    
    container.innerHTML = "";

    if (carrinho.length === 0) {
        container.innerHTML = "<tr><td colspan='5' class='carrinho-vazio'>Seu carrinho está vazio.</td></tr>";
        totalSpan.textContent = "R$ 0,00";
        if (botaoFinalizar) botaoFinalizar.disabled = true;
        return;
    }
    
    if (botaoFinalizar) botaoFinalizar.disabled = false;

    let totalGeral = 0;

    carrinho.forEach(item => {
        // O Java manda 'precoUnitario', mas garantimos compatibilidade
        const preco = parseFloat(item.preco || item.precoUnitario || 0); 
        const subtotal = preco * item.quantidade;
        totalGeral += subtotal;
        
        // Imagem
        let imagePath = item.imagem || item.imagemUrl;
        if (!imagePath || imagePath === "null") imagePath = '../../assets/img/sem-imagem.png';
        else if (!imagePath.startsWith("http")) imagePath = `../../assets/img/${imagePath}`;

        const itemHtml = `
            <tr data-id="${item.id}">
                <td data-label="Produto">
                    <div class="produto-carrinho-info">
                        <img src="${imagePath}" onerror="this.src='../../assets/img/sem-imagem.png'">
                        <span>${item.nome}</span>
                    </div>
                </td>
                <td data-label="Preço">R$ ${preco.toFixed(2)}</td>
                <td data-label="Quantidade">
                    <div class="qtd-wrapper">
                        <button class="btn-qtd diminuir">-</button>
                        <span>${item.quantidade}</span>
                        <button class="btn-qtd aumentar">+</button>
                    </div>
                </td>
                <td data-label="Subtotal">R$ ${subtotal.toFixed(2)}</td>
                <td data-label="Ação"><button class="btn-remover">Remover</button></td>
            </tr>
        `;
        container.innerHTML += itemHtml;
    });

    totalSpan.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

function inicializarEventos() {
    const container = document.getElementById("itens-carrinho");
    const botaoFinalizar = document.getElementById("finalizar-pedido-btn");

    container.addEventListener('click', (event) => {
        const target = event.target;
        const tr = target.closest('tr');
        if (!tr) return;
        
        const produtoId = tr.dataset.id;
        let carrinho = obtainingCarrinho();
        const itemIndex = carrinho.findIndex(p => p.id == produtoId);

        if (itemIndex === -1) return;

        if (target.classList.contains('aumentar')) {
            carrinho[itemIndex].quantidade++;
            salvarCarrinho(carrinho);
        } else if (target.classList.contains('diminuir')) {
            if (carrinho[itemIndex].quantidade > 1) {
                carrinho[itemIndex].quantidade--;
            } else {
                if(confirm("Remover item?")) carrinho.splice(itemIndex, 1);
            }
            salvarCarrinho(carrinho);
        } else if (target.classList.contains('btn-remover')) {
            if(confirm("Remover item?")) {
                carrinho.splice(itemIndex, 1);
                salvarCarrinho(carrinho);
            }
        }
    });

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', finalizarPedidoBackend);
    }
}

// --- FUNÇÃO QUE ENVIA PARA O JAVA ---
async function finalizarPedidoBackend() {
    // 1. Recupera usuário logado
    const usuarioString = localStorage.getItem("usuarioLogado");
    
    if (!usuarioString || usuarioString === "true") {
        alert("Sessão inválida. Por favor, faça login novamente.");
        window.location.href = "../../pages/login-cadastro/login.html";
        return;
    }

    const usuario = JSON.parse(usuarioString);
    
    if (!usuario.id) {
        alert("Erro: ID do usuário não encontrado. Relogue.");
        return;
    }

    const carrinho = obtainingCarrinho();
    
    // 2. Monta o Payload (DTO)
    const payload = {
        usuarioId: parseInt(usuario.id),
        itens: carrinho.map(item => ({
            produtoId: parseInt(item.id),
            quantidade: parseInt(item.quantidade)
        }))
    };

    try {
        const response = await fetch("http://localhost:8080/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const pedido = await response.json();
            alert(`Sucesso! Pedido #${pedido.id} realizado. Valor Total: R$ ${pedido.total.toFixed(2)}`);
            
            // Limpa e Redireciona
            localStorage.removeItem("carrinho");
            window.location.href = "pedidos-cliente.html";
        } else {
            const erro = await response.text();
            alert("Erro ao finalizar: " + erro);
        }
    } catch (e) {
        console.error(e);
        alert("Erro de conexão com o servidor.");
    }
}