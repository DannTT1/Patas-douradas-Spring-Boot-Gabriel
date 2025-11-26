document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("lista-produtos");
    if (!container) return;

    try {
        const response = await fetch("http://localhost:8080/produtos");
        const produtos = await response.json();

        container.innerHTML = "";

        if (produtos.length === 0) {
            container.innerHTML = "<p>Nenhum produto encontrado.</p>";
            return;
        }

        produtos.forEach(produto => {
            // Proteção contra nulos
            const nomeProduto = produto.nome || "Produto";
            const precoProduto = produto.precoUnitario ? produto.precoUnitario : 0.00;

            const card = document.createElement("div");
            card.className = "produto-card";

            // LÓGICA DE CAMINHO PARA PÁGINAS INTERNAS (pages/cliente/...)
            let imagePath = produto.imagemUrl;
            if (!imagePath || imagePath === "null") {
                imagePath = '../../assets/img/sem-imagem.png';
            } else if (!imagePath.startsWith("http")) {
                // Volta 2 pastas (../../) para chegar na raiz, depois assets/img
                imagePath = `../../assets/img/${imagePath}`; 
            }

            card.innerHTML = `
                <a href="produto-detalhes.html?id=${produto.id}">
                    <div class="img-container">
                        <img src="${imagePath}" alt="${nomeProduto}" onerror="this.src='../../assets/img/sem-imagem.png'">
                    </div>
                    
                    <div class="info-wrapper">
                        <h3>${nomeProduto}</h3>
                        <p>R$ ${precoProduto.toFixed(2)}</p>
                    </div>
                </a>
                <button class="adicionar-carrinho-btn" data-id="${produto.id}">Adicionar ao Carrinho</button>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        container.innerHTML = "<p>Erro ao carregar produtos. Verifique o backend.</p>";
    }
});