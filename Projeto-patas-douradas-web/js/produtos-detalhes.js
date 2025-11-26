document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const container = document.getElementById('produto-detalhes-container');

    if (!productId || !container) return;

    try {
        // Busca produto específico no Java
        const response = await fetch(`http://localhost:8080/produtos/${productId}`);
        
        if (!response.ok) {
            container.innerHTML = '<p>Produto não encontrado.</p>';
            return;
        }

        const produto = await response.json();

        // LÓGICA DE CAMINHO (Igual ao da lista)
        let imagePath = produto.imagemUrl;
        if (!imagePath.startsWith("http")) {
            imagePath = `../../assets/img/${imagePath}`;
        }

        container.innerHTML = `
            <div class="detalhe-produto-imagem-wrapper">
                <img src="${imagePath}" alt="${produto.nome}" onerror="this.src='../../assets/img/areiahigienicafelina.png'">
            </div>
            <div class="produto-info">
                <h2>${produto.nome}</h2>
                <p class="preco">R$ ${produto.precoUnitario.toFixed(2)}</p>
                <p>Estoque: ${produto.estoque}</p>
                <p class="descricao">${produto.descricao || 'Sem descrição.'}</p>
                <button class="adicionar-carrinho-btn" data-id="${produto.id}">Adicionar ao Carrinho</button>
            </div>
        `;

    } catch (error) {
        console.error("Erro detalhes:", error);
    }
});