// Dados demonstrativos: os cartões não representam notícias reais da instituição.
const noticias = [
  {
    categoria: 'doacoes',
    titulo: 'Como organizar uma campanha',
    resumo: 'Antes de reunir itens, confirme as necessidades e os canais oficiais da organização.'
  },
  {
    categoria: 'voluntariado',
    titulo: 'Primeiros passos para colaborar',
    resumo: 'Conheça as atividades propostas e verifique de que forma você pode participar.'
  },
  {
    categoria: 'doacoes',
    titulo: 'Cuidados ao separar doações',
    resumo: 'Organize os itens por tipo e confira as condições de uso antes de entregá-los.'
  }
];

const categoriasNoticias = [
  { id: 'todas', rotulo: 'Todas' },
  { id: 'doacoes', rotulo: 'Doações' },
  { id: 'voluntariado', rotulo: 'Voluntariado' }
];

function iniciarNoticias() {
  const secao = document.querySelector('.news-section');
  if (!secao) return;

  const filtros = secao.querySelector('#filtros-noticias');
  const lista = secao.querySelector('#lista-noticias');
  const feedback = secao.querySelector('#noticias-feedback');
  const fragmento = document.createDocumentFragment();

  noticias.forEach(noticia => {
    const cartao = document.createElement('article');
    cartao.className = 'news-card';
    cartao.dataset.categoria = noticia.categoria;

    const categoria = document.createElement('span');
    categoria.className = 'badge';
    categoria.textContent = categoriasNoticias.find(item => item.id === noticia.categoria).rotulo;

    const titulo = document.createElement('h3');
    titulo.textContent = noticia.titulo;
    const resumo = document.createElement('p');
    resumo.textContent = noticia.resumo;
    const link = document.createElement('a');
    link.href = '#/projetos';
    link.textContent = 'Conhecer as iniciativas';

    cartao.append(categoria, titulo, resumo, link);
    fragmento.append(cartao);
  });
  lista.replaceChildren(fragmento);

  categoriasNoticias.forEach(item => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'news-filter';
    botao.dataset.categoria = item.id;
    botao.textContent = item.rotulo;
    filtros.append(botao);
  });

  const limpar = document.createElement('button');
  limpar.type = 'button';
  limpar.className = 'news-filter news-clear';
  limpar.textContent = 'Limpar filtro';
  filtros.append(limpar);

  function aplicarFiltro(categoria) {
    let quantidade = 0;
    lista.querySelectorAll('.news-card').forEach(cartao => {
      const visivel = categoria === 'todas' || cartao.dataset.categoria === categoria;
      cartao.hidden = !visivel;
      if (visivel) quantidade++;
    });
    filtros.querySelectorAll('button[data-categoria]').forEach(botao => {
      botao.setAttribute('aria-pressed', String(botao.dataset.categoria === categoria));
    });
    limpar.disabled = categoria === 'todas';
    feedback.textContent = `${quantidade} ${quantidade === 1 ? 'atualização exibida' : 'atualizações exibidas'}.`;
  }

  // Um listener no contêiner atende a todos os filtros, inclusive os criados acima.
  filtros.addEventListener('click', evento => {
    const botao = evento.target.closest('button[data-categoria]');
    if (botao && filtros.contains(botao)) aplicarFiltro(botao.dataset.categoria);
  });
  limpar.addEventListener('click', () => aplicarFiltro('todas'));
  aplicarFiltro('todas');
}
