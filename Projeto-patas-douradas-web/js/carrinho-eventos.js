// js/carrinho-eventos.js

// Escuta cliques na página para pegar os botões de adicionar (mesmo os carregados depois)
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function(event) {
        const btn = event.target.closest('.adicionar-carrinho-btn');
        if (btn) {
            // Pega o ID do atributo data-id (se o botão não usar onclick)
            const id = btn.dataset.id;
            if (id) {
                window.adicionarProdutoAoCarrinho(id);
            }
        }
    });
});

// Função Global Principal
window.adicionarProdutoAoCarrinho = async function(produtoId) {
    
    // --- 1. BLOQUEIO DE SEGURANÇA (Porteiro) ---
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    
    if (!usuarioLogado) {
        alert("🔒 Você precisa entrar na sua conta!\n\nFaça login ou cadastre-se para comprar este produto.");
        
        // Redireciona para o login
        const isPaginaInterna = window.location.pathname.includes("/pages/");
        const caminhoLogin = isPaginaInterna ? "../login-cadastro/login.html" : "pages/login-cadastro/login.html";
        window.location.href = caminhoLogin;
        
        return; // <--- O CÓDIGO PARA AQUI. Nada acontece.
    }
    // -------------------------------------------

    try {
        console.log(`Buscando dados do produto ${produtoId} no servidor...`);
        
        // 2. Busca dados no Backend Java
        const response = await fetch(`http://localhost:8080/produtos/${produtoId}`);
        
        if (!response.ok) {
            throw new Error("Erro ao comunicar com o servidor.");
        }

        const produtoDoBanco = await response.json();

        // 3. Monta o objeto para o carrinho
        const itemParaCarrinho = {
            id: produtoDoBanco.id,
            nome: produtoDoBanco.nome,
            preco: produtoDoBanco.precoUnitario, // Ajuste conforme seu DTO
            imagem: produtoDoBanco.imagemUrl,
            estoque: produtoDoBanco.estoque,
            quantidade: 1
        };

        // 4. Salva no LocalStorage
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemExistente = carrinho.find(item => item.id == produtoId);

        if (itemExistente) {
            if (itemExistente.quantidade < itemParaCarrinho.estoque) {
                itemExistente.quantidade++;
                alert(`Mais uma unidade de "${itemParaCarrinho.nome}" adicionada!`);
            } else {
                alert(`Limite de estoque atingido para este produto.`);
                return;
            }
        } else {
            if (itemParaCarrinho.estoque > 0) {
                carrinho.push(itemParaCarrinho);
                alert(`"${itemParaCarrinho.nome}" adicionado ao carrinho!`);
            } else {
                alert(`Produto esgotado!`);
                return;
            }
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        console.log("Carrinho atualizado com sucesso.");

    } catch (erro) {
        console.error("Erro ao adicionar:", erro);
        alert("Erro de conexão. Verifique se o Backend Java está rodando.");
    }
};