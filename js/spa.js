// Os templates estão no próprio index.html para funcionar também ao abrir o arquivo localmente.
const rotas = {
  '#/': { template: 'pagina-inicio', titulo: 'Início' },
  '#/projetos': { template: 'pagina-projetos', titulo: 'Projetos' },
  '#/cadastro': { template: 'pagina-cadastro', titulo: 'Cadastro' }
};
const alvo = document.querySelector('#app');

function renderizarRota() {
  const rota = rotas[window.location.hash] ? window.location.hash : '#/';
  const pagina = rotas[rota];
  const template = document.getElementById(pagina.template);

  alvo.replaceChildren(template.content.cloneNode(true));
  document.title = `${pagina.titulo} | Casa do Caminho`;
  document.querySelectorAll('nav a[aria-current]').forEach(link => link.removeAttribute('aria-current'));
  document.querySelector(`nav a[href="${rota}"]`)?.setAttribute('aria-current', 'page');

  if (rota === '#/projetos') {
    renderizarIniciativas();
    iniciarComponentes();
  }
  if (rota === '#/cadastro') iniciarCadastro();
  if (rota === '#/') iniciarNoticias();
}

window.addEventListener('hashchange', () => {
  renderizarRota();
  const titulo = alvo.querySelector('h1');
  if (titulo) {
    titulo.tabIndex = -1;
    titulo.focus();
  }
});
renderizarRota();
