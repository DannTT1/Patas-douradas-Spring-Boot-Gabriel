const Auth = {
    _USUARIOS_KEY: 'usuarios',
    _LOGADO_KEY: 'usuarioLogado',

    _getUsuarios: function() {
        try {
            return JSON.parse(localStorage.getItem(this._USUARIOS_KEY)) || [];
        } catch (e) {
            console.error("Erro ao ler dados de usuários do localStorage.", e);
            return [];
        }
    },

    _salvarUsuarios: function(usuarios) {
        localStorage.setItem(this._USUARIOS_KEY, JSON.stringify(usuarios));
    },

    login: function(email, senha, tipo) {
        const usuarios = this._getUsuarios();
        // Verifica se existe usuário com esse email/senha/tipo
        // Nota: No seu sistema atual, o login é feito pelo Backend (Java), 
        // mas mantemos isso aqui caso use lógica local mista.
        const usuario = usuarios.find(u => u.email === email && u.senha === senha && u.tipo === tipo);

        if (usuario) {
            localStorage.setItem(this._LOGADO_KEY, JSON.stringify(usuario));
            return true;
        }
        return false;
    },

    logout: function() {
        localStorage.removeItem(this._LOGADO_KEY);
    },

    isLoggedIn: function() {
        return !!this.getUsuarioLogado();
    },

    getUsuarioLogado: function() {
        try {
            return JSON.parse(localStorage.getItem(this._LOGADO_KEY));
        } catch (e) {
            console.error("Erro ao ler dados do usuário logado.", e);
            return null;
        }
    },

    cadastrar: function(novoUsuario) {
        const usuarios = this._getUsuarios();
        usuarios.push(novoUsuario);
        this._salvarUsuarios(usuarios);
    },

    verificarEmailExistente: function(email) {
        const usuarios = this._getUsuarios();
        return usuarios.some(u => u.email === email);
    }
};

// --- LÓGICA DE PROTEÇÃO E UI ---

function protegerPagina(tiposPermitidos = ['cliente']) {
    const usuario = Auth.getUsuarioLogado();

    if (!usuario) {
        alert("Você precisa estar logado para acessar esta página.");
        irParaLogin();
        return;
    }
    
    // Se quiser validar o tipo (ex: vendedor não acessa área de cliente)
    // if (!tiposPermitidos.includes(usuario.tipo)) { ... }
}

// Função auxiliar para achar a página de login
function irParaLogin() {
    // Verifica se estamos na Raiz ou dentro de uma pasta (pages/...)
    if (window.location.pathname.includes("/pages/")) {
        // Se estiver em subpasta (ex: pages/cliente), sobe niveis
        // Ajuste "login-cadastro" se o nome da sua pasta for diferente (ex: "login")
        window.location.href = "../login-cadastro/login.html"; 
    } else {
        // Se estiver na raiz (index.html)
        window.location.href = "pages/login-cadastro/login.html";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const usuario = Auth.getUsuarioLogado();
    const cabecalho = document.querySelector('.cabecalho');

    // Mostra saudação "Olá, Fulano"
    if (cabecalho && usuario && usuario.nome) {
        // Verifica se já não existe para não duplicar
        if (!document.querySelector(".saudacao-usuario")) {
            const saudacaoEl = document.createElement("div");
            saudacaoEl.className = "saudacao-usuario";
            saudacaoEl.style.color = "white"; // Ajuste visual rápido
            saudacaoEl.style.marginRight = "15px";
            saudacaoEl.textContent = `Olá, ${usuario.nome}!`;
            
            // Insere antes do menu
            const menu = cabecalho.querySelector('.menu');
            if(menu) cabecalho.insertBefore(saudacaoEl, menu);
        }
    }
    
    // Lógica do Botão Sair
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function(e) {
            e.preventDefault(); // Evita comportamento padrão de link
            if (confirm("Tem certeza que deseja sair?")) {
                Auth.logout();
                irParaLogin(); // Chama a função que redireciona
            }
        });
    }
});