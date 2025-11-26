document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("lista-produtos");
    if (!container) return;

    try {
        const response = await fetch("http://localhost:8080/produtos");
        const produtos = await response.json();

        container.innerHTML = "";

        produtos.forEach(produto => {
            const card = document.createElement("div");
            card.className = "produto-card";

            // LÓGICA DE CAMINHO PARA PÁGINAS INTERNAS (pages/cliente/...)
            let imagePath = produto.imagemUrl;
            if (!imagePath.startsWith("http")) {
                // Volta 2 pastas (../../) para chegar na raiz, depois assets/img
                imagePath = `../../assets/img/${imagePath}`; 
            }

            card.innerHTML = `
                <a href="produto-detalhes.html?id=${produto.id}">
                    <img src="${imagePath}" alt="${produto.nome}" onerror="this.src='../../assets/img/areiahigienicafelina.png'">
                    <div class="info-wrapper">
                        <h3>${produto.nome}</h3>
                        <p>R$ ${produto.precoUnitario.toFixed(2)}</p>
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