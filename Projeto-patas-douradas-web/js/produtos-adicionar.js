// URL base da API
const API_URL = "http://localhost:8080/produtos";

document.addEventListener("DOMContentLoaded", () => {
    verificarModoEdicao();
});

// Captura os elementos do formulário
const form = document.getElementById("form-produto");
const inputId = document.getElementById("produto-id");
const inputNome = document.getElementById("nome");
const inputPreco = document.getElementById("preco");
const inputEstoque = document.getElementById("estoque");
const inputImagem = document.getElementById("imagem");
const inputDescricao = document.getElementById("descricao");
const inputDestaque = document.getElementById("destaque");
const imgPreview = document.getElementById("img-preview");

// --- 1. VERIFICA SE É EDIÇÃO OU CADASTRO ---
async function verificarModoEdicao() {
    // Pega os parâmetros da URL (ex: ?id=10)
    const urlParams = new URLSearchParams(window.location.search);
    const idEditar = urlParams.get('id');

    if (idEditar) {
        console.log("Modo Edição ativado para ID:", idEditar);
        
        // Ajusta o visual da página
        document.getElementById("titulo-pagina").innerText = "Editar Produto";
        document.getElementById("btn-submit").innerText = "Salvar Alterações";
        
        // Busca os dados atuais no Backend para preencher os campos
        await carregarDadosDoProduto(idEditar);
    }
}

// --- 2. BUSCA DADOS NO JAVA E PREENCHE O FORMULÁRIO ---
async function carregarDadosDoProduto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Produto não encontrado");

        const produto = await response.json();

        // Preenche os inputs com os dados que vieram do banco
        inputId.value = produto.id;
        inputNome.value = produto.nome;
        inputPreco.value = produto.precoUnitario; // Atenção ao nome do campo no DTO
        inputEstoque.value = produto.estoque;
        inputImagem.value = produto.imagemUrl;
        inputDescricao.value = produto.descricao;
        inputDestaque.checked = produto.destaque; // Checkbox usa .checked

        // Atualiza o preview da imagem
        atualizarPreview(produto.imagemUrl);

    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar dados do produto.");
        window.location.href = "gerenciar-produtos.html";
    }
}

// --- 3. ENVIA O FORMULÁRIO (CRIAR OU ATUALIZAR) ---
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Não deixa a página recarregar

    // Monta o objeto JSON igual ao DTO do Java
    const produtoDTO = {
        nome: inputNome.value,
        precoUnitario: parseFloat(inputPreco.value),
        estoque: parseInt(inputEstoque.value),
        imagemUrl: inputImagem.value,
        descricao: inputDescricao.value,
        destaque: inputDestaque.checked
    };

    const id = inputId.value;
    let url = API_URL;
    let metodo = "POST";

    // Se tiver ID, é uma ATUALIZAÇÃO (PUT)
    if (id) {
        url = `${API_URL}/${id}`;
        metodo = "PUT";
    }

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produtoDTO)
        });

        if (response.ok) {
            alert("Produto salvo com sucesso!");
            window.location.href = "gerenciar-produtos.html"; // Volta para a tabela
        } else {
            const erroTexto = await response.text();
            alert("Erro ao salvar: " + erroTexto);
        }

    } catch (erro) {
        console.error("Erro técnico:", erro);
        alert("Falha na conexão com o servidor.");
    }
});

// --- EXTRA: Atualiza imagem ao digitar ---
inputImagem.addEventListener("input", () => {
    atualizarPreview(inputImagem.value);
});

function atualizarPreview(nomeImagem) {
    if (nomeImagem && !nomeImagem.startsWith("http")) {
        imgPreview.src = `../../assets/img/${nomeImagem}`;
    } else {
        imgPreview.src = nomeImagem || "../../assets/img/sem-imagem.png";
    }
}