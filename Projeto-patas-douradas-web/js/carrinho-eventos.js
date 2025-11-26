function inicializarBotoesAdicionar() {
    // Usa delegação de eventos para funcionar em elementos criados dinamicamente
    document.body.addEventListener('click', function(event) {
        // Verifica se clicou no botão ou em algo dentro dele
        const btn = event.target.closest('.adicionar-carrinho-btn');
        
        if (btn) {
            const produtoId = btn.dataset.id;
            adicionarProdutoAoCarrinho(produtoId);
        }
    });
}

async function adicionarProdutoAoCarrinho(produtoId) {
    try {
        // 1. Busca o produto ATUALIZADO no Backend (Java)
        const response = await fetch(`http://localhost:8080/produtos/${produtoId}`);
        
        if (!response.ok) {
            throw new Error("Erro ao consultar estoque no servidor.");
        }

        const produtoDoBanco = await response.json();

        // 2. Prepara o objeto para salvar no carrinho (LocalStorage)
        // Mapeamos os nomes do Java (imagemUrl, precoUnitario) para o padrão do carrinho (imagem, preco)
        const itemParaCarrinho = {
            id: produtoDoBanco.id,
            nome: produtoDoBanco.nome,
            preco: produtoDoBanco.precoUnitario, // Java manda precoUnitario
            imagem: produtoDoBanco.imagemUrl,    // Java manda imagemUrl
            estoque: produtoDoBanco.estoque,
            quantidade: 1
        };

        // 3. Lógica do Carrinho
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemExistente = carrinho.find(item => item.id == produtoId);

        if (itemExistente) {
            if (itemExistente.quantidade < itemParaCarrinho.estoque) {
                itemExistente.quantidade++;
                alert(`"${itemParaCarrinho.nome}" teve a quantidade aumentada!`);
            } else {
                alert(`Estoque máximo atingido para "${itemParaCarrinho.nome}"!`);
                return;
            }
        } else {
            if (itemParaCarrinho.estoque > 0) {
                carrinho.push(itemParaCarrinho);
                alert(`"${itemParaCarrinho.nome}" foi adicionado ao carrinho!`);
            } else {
                alert(`Desculpe, "${itemParaCarrinho.nome}" está esgotado.`);
                return;
            }
        }

        // 4. Salva de volta no navegador
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

    } catch (erro) {
        console.error("Erro ao adicionar:", erro);
        alert("Não foi possível adicionar o produto. Verifique a conexão com o servidor.");
    }
}

document.addEventListener('DOMContentLoaded', inicializarBotoesAdicionar);