// js/cliente-auth.js

document.addEventListener("DOMContentLoaded", () => {
    atualizarMenuNavegacao();
    configurarBloqueiosHome();
});

// --- LÓGICA DE BLOQUEIO (VITRINE FECHADA) ---
function configurarBloqueiosHome() {
    
    // 1. Bloqueia o Botão "Ver Produtos" do Banner
    const btnHome = document.getElementById("btn-ver-produtos");
    if (btnHome) {
        btnHome.addEventListener("click", bloquearAcaoSeNaoLogado);
    }

    // 2. Bloqueia cliques nas Imagens/Nomes dos produtos (Vitrine)
    const containerProdutos = document.getElementById("produtos-destaque-lista");
    
    if (containerProdutos) {
        // Vigia cliques dentro da lista de produtos
        containerProdutos.addEventListener("click", (event) => {
            
            // Verifica se clicou num link (<a>)
            const clicouEmLink = event.target.closest('a');
            
            // Verifica se foi no botão de "Adicionar ao Carrinho"
            // (O carrinho já tem a própria trava no outro arquivo, então ignoramos aqui)
            const clicouEmBotaoCarrinho = event.target.closest('.adicionar-carrinho-btn');

            // Se for um link (foto ou título) E NÃO for o botão de comprar -> BLOQUEIA
            if (clicouEmLink && !clicouEmBotaoCarrinho) {
                bloquearAcaoSeNaoLogado(event);
            }
        });
    }
}

// Função auxiliar que verifica e redireciona
function bloquearAcaoSeNaoLogado(event) {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
        // Se tem login, deixa o clique acontecer (vai para a página)
        // Se for o botão do banner, redireciona manualmente
        if (event.target.id === "btn-ver-produtos" || event.target.closest("#btn-ver-produtos")) {
             window.location.href = "pages/cliente/produtos-lista.html";
        }
        return; 
    } else {
        // Se NÃO tem login: PARE TUDO
        event.preventDefault(); 
        event.stopPropagation();
        
        alert("🔒 Conteúdo Exclusivo!\n\nVocê precisa fazer login para acessar a loja.");
        
        // Redireciona para o Login
        const isPaginaInterna = window.location.pathname.includes("/pages/");
        const caminhoLogin = isPaginaInterna ? "../login-cadastro/login.html" : "pages/login-cadastro/login.html";
        window.location.href = caminhoLogin;
    }
}

// --- LÓGICA DO MENU (CABEÇALHO) ---
function atualizarMenuNavegacao() {
    const navMenu = document.querySelector("header .menu");
    if (!navMenu) return; 

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    const isPaginaInterna = window.location.pathname.includes("/pages/");
    const raiz = isPaginaInterna ? "../../" : "";
    const prefixoPaginas = isPaginaInterna ? "" : "pages/cliente/";
    const prefixoLogin = isPaginaInterna ? "../login-cadastro/" : "pages/login-cadastro/";

    if (usuarioLogado) {
        const nome = usuarioLogado.nome.split(" ")[0]; 
        navMenu.innerHTML = `
            <span style="color: white; margin-right: 15px;">Olá, <b>${nome}</b></span>
            <a href="${raiz}index.html">Home</a>
            <a href="${prefixoPaginas}produtos-lista.html">Produtos</a>
            <a href="${prefixoPaginas}carrinho.html">Carrinho</a>
            <a href="${prefixoPaginas}pedidos-cliente.html">Meus Pedidos</a>
            <button class="btn-logout" onclick="logoutCliente()">Sair</button>
        `;
    } else {
        // Visitante vê links, mas as ações estão bloqueadas pelos scripts acima
        navMenu.innerHTML = `
            <a href="${raiz}index.html">Home</a>
            <a href="${linkLoginBotao(prefixoLogin)}" class="btn-login-destaque">Entrar / Cadastrar</a>
        `;
    }
}

function linkLoginBotao(prefixo) { return prefixo + "login.html"; }

function logoutCliente() {
    localStorage.removeItem("usuarioLogado");
    const isPaginaInterna = window.location.pathname.includes("/pages/");
    const destino = isPaginaInterna ? "../../index.html" : "index.html";
    window.location.href = destino;
}

// Injeta estilo do botão de login
const styleBtn = document.createElement('style');
styleBtn.innerHTML = `
    .btn-login-destaque {
        background-color: white !important;
        color: var(--cor-primaria) !important;
        padding: 8px 15px;
        border-radius: 20px;
        font-weight: bold;
        transition: transform 0.2s;
    }
    .btn-login-destaque:hover { transform: scale(1.05); color: #e88e00 !important; }
`;
document.head.appendChild(styleBtn);