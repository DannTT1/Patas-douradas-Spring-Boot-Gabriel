document.addEventListener("DOMContentLoaded", () => {
    carregarDashboard();
});

async function carregarDashboard() {
    try {
        console.log("Iniciando carregamento do Dashboard...");

        // 1. Busca TODOS os pedidos no Backend
        const response = await fetch("http://localhost:8080/pedidos");
        
        if (!response.ok) {
            throw new Error("Erro ao buscar pedidos no servidor.");
        }

        const pedidos = await response.json();
        console.log("Pedidos recebidos:", pedidos);

        // 2. Calcula os indicadores (Cards do Topo)
        atualizarIndicadores(pedidos);

        // 3. Preenche a Tabela de Vendas Recentes
        preencherTabelaVendas(pedidos);

    } catch (erro) {
        console.error("Erro no Dashboard:", erro);
        // Exibe "Erro" nos cards para visualização imediata
        document.getElementById("valor-faturamento").innerText = "Erro";
        alert("Não foi possível carregar os dados de vendas.");
    }
}

function atualizarIndicadores(pedidos) {
    // --- Cálculo do Faturamento Total ---
    // Somamos o 'total' de cada pedido. O (acc, pedido) acumula o valor.
    const faturamentoTotal = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);
    
    // --- Contagem de Pedidos ---
    const totalPedidos = pedidos.length;

    // --- Contagem de Produtos Vendidos (Item a item) ---
    let totalProdutosVendidos = 0;
    pedidos.forEach(pedido => {
        if (pedido.itens) {
            pedido.itens.forEach(item => {
                totalProdutosVendidos += item.quantidade;
            });
        }
    });

    // --- Atualiza o HTML ---
    
    // Formata para moeda brasileira (R$)
    const elFaturamento = document.getElementById("valor-faturamento");
    if (elFaturamento) {
        elFaturamento.innerText = faturamentoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const elQtdPedidos = document.getElementById("qtd-pedidos");
    if (elQtdPedidos) elQtdPedidos.innerText = totalPedidos;

    const elQtdProdutos = document.getElementById("qtd-produtos");
    if (elQtdProdutos) elQtdProdutos.innerText = totalProdutosVendidos;
}

function preencherTabelaVendas(pedidos) {
    const tabelaBody = document.querySelector("#tabela-vendas tbody");
    if (!tabelaBody) return;

    tabelaBody.innerHTML = "";

    // Inverte a ordem para mostrar os mais recentes primeiro (slice cria uma cópia para não mexer no original)
    const pedidosRecentes = pedidos.slice().reverse(); 

    pedidosRecentes.forEach(pedido => {
        const tr = document.createElement("tr");

        // Formata data e hora
        let dataFormatada = "--/--/----";
        if (pedido.data) {
            const dataObj = new Date(pedido.data);
            dataFormatada = dataObj.toLocaleDateString('pt-BR') + ' ' + dataObj.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
        }

        // Formata status (opcional: classes CSS para cores)
        const status = pedido.status || "Recebido"; // Se vier null do banco, mostra "Recebido"

        // CORREÇÃO AQUI: Usamos 'nomeCliente' conforme o DTO do Java, e não 'usuario.nome'
        const nomeCliente = pedido.nomeCliente || "Cliente não identificado";

        tr.innerHTML = `
            <td>#${pedido.id}</td>
            <td>${dataFormatada}</td>
            <td>${nomeCliente}</td> 
            <td>${pedido.itens ? pedido.itens.length : 0} itens</td>
            <td style="color: green; font-weight: bold;">R$ ${pedido.total.toFixed(2)}</td>
            <td><span class="status-badge">${status}</span></td>
        `;

        tabelaBody.appendChild(tr);
    });
}