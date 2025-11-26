const API_BASE_URL = "http://localhost:8080";

// Função genérica para tratar erros de resposta
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const mensagem = errorData.mensagem || "Erro na comunicação com o servidor.";
        throw new Error(mensagem);
    }
    // Se o retorno for texto (caso do Login), retorna texto. Se for JSON, retorna JSON.
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }
    return response.text();
}