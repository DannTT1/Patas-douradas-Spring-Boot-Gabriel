document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("produtos-destaque-lista");
    if (!container) return;

    try {
        // 1. Busca os produtos do Java
        const response = await fetch("http://localhost:8080/produtos");
        const produtos = await response.json();
        
        console.log("Total de produtos recebidos:", produtos.length);

        // 2. Filtra apenas os que tem destaque = true
        let destaques = produtos.filter(produto => produto.destaque === true);

        // 3. CORTE DE SEGURANÇA: Pega apenas os 3 primeiros
        // Se tiver menos de 3, mostra todos. Se tiver mais, corta no 3.
        destaques = destaques.slice(0, 3); 

        container.innerHTML = "";

        if (destaques.length === 0) {
            container.innerHTML = "<p>Nenhum produto em destaque.</p>";
            return;
        }

        destaques.forEach(produto => {
            // Tratamento de Nulos (Proteção)
            const nomeProduto = produto.nome || "Produto";
            const precoProduto = produto.precoUnitario ? produto.precoUnitario : 0.00;

            // Lógica da Imagem
            let imagePath = produto.imagemUrl; 
            if (!imagePath || imagePath === "null") {
                imagePath = 'assets/img/sem-imagem.png'; 
            } else if (!imagePath.startsWith("http")) {
                imagePath = `assets/img/${imagePath}`; 
            }

            const card = document.createElement("div");
            card.className = "produto-card";

            card.innerHTML = `
                <a href="pages/cliente/produto-detalhes.html?id=${produto.id}">
                    <div class="img-container">
                        <img src="${imagePath}" alt="${nomeProduto}" onerror="this.src='assets/img/sem-imagem.png'">
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

    } catch (e) {
        console.error("Erro na Home:", e);
        container.innerHTML = "<p>Erro ao carregar produtos. Verifique o Backend.</p>";
    }
});