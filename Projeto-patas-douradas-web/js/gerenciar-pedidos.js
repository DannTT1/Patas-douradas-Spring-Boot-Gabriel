document.addEventListener("DOMContentLoaded", () => {
    carregarPedidos();
});

async function carregarPedidos() {
    const tabelaBody = document.querySelector("#tabela-pedidos tbody");
    
    try {
        // Usa o endpoint que criamos para listar TUDO
        const response = await fetch("http://localhost:8080/pedidos");
        
        if (!response.ok) throw new Error("Erro ao buscar pedidos");

        const pedidos = await response.json();
        
        // Inverte para ver o mais recente primeiro
        pedidos.reverse();

        tabelaBody.innerHTML = "";

        pedidos.forEach(pedido => {
            const tr = document.createElement("tr");

            // Formata data
            const dataObj = new Date(pedido.data);
            const dataFormatada = dataObj.toLocaleDateString('pt-BR') + ' ' + dataObj.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

            // Pega o nome do cliente (ou deixa genérico se der erro)
            const nomeCliente = pedido.nomeCliente || "Cliente não identificado";
            
            // Prepara a lista de itens para mostrar no alerta (Simples e funcional)
            // JSON.stringify é usado para passar o objeto para a função do botão
            const itensTexto = JSON.stringify(pedido.itens).replace(/"/g, '&quot;');

            tr.innerHTML = `
                <td>#${pedido.id}</td>
                <td>${dataFormatada}</td>
                <td>${nomeCliente}</td>
                <td style="font-weight:bold; color:green;">R$ ${pedido.total.toFixed(2)}</td>
                <td><span class="status-badge status-recebido">${pedido.status || 'Recebido'}</span></td>
                <td>
                    <button class="btn-ver" onclick="verItens('${nomeCliente}', ${pedido.id}, ${itensTexto})">
                        📄 Ver Itens
                    </button>
                </td>
            `;
            tabelaBody.appendChild(tr);
        });

    } catch (error) {
        console.error(error);
        tabelaBody.innerHTML = "<tr><td colspan='6'>Erro ao carregar pedidos. Verifique o backend.</td></tr>";
    }
}

// Função simples para mostrar o que tem no pedido
function verItens(cliente, id, itens) {
    let mensagem = `Pedido #${id} - Cliente: ${cliente}\n\nITENS A SEPARAR:\n------------------\n`;
    
    if (itens && itens.length > 0) {
        itens.forEach(item => {
            mensagem += `• ${item.quantidade}x ${item.nomeProduto}\n  (Subtotal: R$ ${item.subtotal.toFixed(2)})\n`;
        });
    } else {
        mensagem += "Nenhum item encontrado (Erro de dados).";
    }

    alert(mensagem);
}