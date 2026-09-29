const CHAVE_INICIATIVAS_SALVAS = 'casa-do-caminho:iniciativas-salvas:v1';

function carregarIniciativasSalvas() {
  try {
    const texto = localStorage.getItem(CHAVE_INICIATIVAS_SALVAS);
    const dados = texto ? JSON.parse(texto) : [];
    return Array.isArray(dados)
      ? dados.filter(id => id === 'doacoes' || id === 'voluntariado')
      : [];
  } catch (erro) {
    // Armazenamento pode estar bloqueado no navegador ou conter dados inválidos.
    return [];
  }
}

function gravarIniciativasSalvas(ids) {
  try {
    localStorage.setItem(CHAVE_INICIATIVAS_SALVAS, JSON.stringify(ids));
    return true;
  } catch (erro) {
    return false;
  }
}
