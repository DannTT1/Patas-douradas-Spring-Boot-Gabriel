document.addEventListener("DOMContentLoaded", () => {
    carregarProdutosDoBackend();
});

// URL da API (Java)
const API_URL = "http://localhost:8080/produtos";

async function carregarProdutosDoBackend() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar produtos");

        const produtos = await response.json();
        renderizarTabela(produtos);
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao carregar produtos. Verifique se o Backend está rodando.");
    }
}

function renderizarTabela(produtos) {
    const tabelaBody = document.querySelector("#tabela-produtos tbody");
    tabelaBody.innerHTML = ""; // Limpa a tabela antes de preencher

    produtos.forEach(produto => {
        // --- 1. LÓGICA DE CORREÇÃO DA IMAGEM ---
        let caminhoImagem = produto.imagemUrl;
        
        // Se não tiver imagem, usa uma padrão
        if (!caminhoImagem) {
            caminhoImagem = "../../assets/img/sem-imagem.png";
        } 
        // Se a imagem não for um link completo (http...), adiciona o caminho da pasta
        else if (!caminhoImagem.startsWith("http")) {
            caminhoImagem = `../../assets/img/${caminhoImagem}`;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>#${produto.id}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${caminhoImagem}" alt="${produto.nome}" 
                         style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; border: 1px solid #ddd;"
                         onerror="this.src='../../assets/img/sem-imagem.png'">
                    <span>${produto.nome}</span>
                </div>
            </td>
            <td>R$ ${produto.precoUnitario.toFixed(2)}</td>
            <td>${produto.estoque} un.</td>
            <td>
                <button class="btn-acao btn-editar" onclick="irParaEdicao(${produto.id})">
                    ✏️ Editar
                </button>
                
                <button class="btn-acao btn-excluir" onclick="deletarProduto(${produto.id})">
                    🗑️ Excluir
                </button>
            </td>
        `;
        tabelaBody.appendChild(tr);
    });
}

// --- LÓGICA DE EXCLUIR (CONECTADA AO JAVA) ---
async function deletarProduto(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este produto?");
    
    if (confirmacao) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Produto excluído com sucesso!");
                // Recarrega a tabela para sumir com o item excluído
                carregarProdutosDoBackend();
            } else {
                alert("Erro ao excluir. Talvez este produto esteja em algum pedido.");
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro de conexão com o servidor.");
        }
    }
}

// --- LÓGICA DE EDITAR ---
function irParaEdicao(id) {
    // Manda para a página de formulário, levando o ID junto
    window.location.href = `produtos-adicionar.html?id=${id}`;
}