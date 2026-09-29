// Dados de origem: cada objeto descreve um cartão, sem duplicar sua marcação HTML.
const iniciativas = [
  {
    id: 'doacoes',
    titulo: 'Doações',
    categoria: 'Apoio material',
    descricao: 'As campanhas de arrecadação podem reunir recursos e itens necessários às atividades da organização. Antes de doar, confirme diretamente com a instituição quais são as necessidades atuais e os canais oficiais.',
    chamada: 'Registrar interesse em receber informações sobre doações'
  },
  {
    id: 'voluntariado',
    titulo: 'Voluntariado',
    categoria: 'Participação',
    descricao: 'O trabalho voluntário pode apoiar a organização de atividades e aproximar a comunidade das iniciativas. O cadastro demonstrativo permite indicar interesse nessa forma de participação.',
    chamada: 'Registrar interesse em voluntariado'
  }
];

const iniciativasSalvas = new Set(carregarIniciativasSalvas());

function alternarIniciativaSalva(id) {
  const estavaSalvo = iniciativasSalvas.has(id);
  if (estavaSalvo) iniciativasSalvas.delete(id);
  else iniciativasSalvas.add(id);
  if (gravarIniciativasSalvas([...iniciativasSalvas])) return true;

  // Se a gravação falhar, a interface deve continuar refletindo o estado real.
  if (estavaSalvo) iniciativasSalvas.add(id);
  else iniciativasSalvas.delete(id);
  return false;
}

function atualizarResumoSalvos(secao) {
  const resumo = secao.querySelector('.saved-status');
  const quantidade = iniciativasSalvas.size;
  resumo.textContent = quantidade === 0
    ? 'Nenhuma iniciativa marcada para rever.'
    : `${quantidade} iniciativa${quantidade === 1 ? '' : 's'} marcada${quantidade === 1 ? '' : 's'} para rever neste navegador.`;
}

function renderizarIniciativas() {
  const secao = document.querySelector('.initiative-grid');
  if (!secao) return;

  // Evita duplicação caso a seção seja renderizada novamente.
  secao.querySelectorAll('article').forEach(cartao => cartao.remove());
  let resumo = secao.querySelector('.saved-status');
  if (!resumo) {
    resumo = document.createElement('p');
    resumo.className = 'saved-status';
    resumo.setAttribute('role', 'status');
    secao.querySelector('h2').after(resumo);
  }
  atualizarResumoSalvos(secao);
  const fragmento = document.createDocumentFragment();
  const destino = document.querySelector('#app') ? '#/cadastro' : 'cadastro.html';

  iniciativas.forEach(item => {
    const cartao = document.createElement('article');
    cartao.setAttribute('aria-labelledby', item.id);

    const titulo = document.createElement('h3');
    titulo.id = item.id;
    titulo.textContent = item.titulo;

    const categoria = document.createElement('span');
    categoria.className = 'badge';
    categoria.textContent = item.categoria;

    const descricao = document.createElement('p');
    descricao.textContent = item.descricao;

    const paragrafoLink = document.createElement('p');
    const link = document.createElement('a');
    link.href = destino;
    link.textContent = item.chamada;
    paragrafoLink.append(link);

    const paragrafoSalvar = document.createElement('p');
    const botaoSalvar = document.createElement('button');
    botaoSalvar.type = 'button';
    botaoSalvar.dataset.salvarId = item.id;
    botaoSalvar.className = 'save-button';
    const salvo = iniciativasSalvas.has(item.id);
    botaoSalvar.setAttribute('aria-pressed', String(salvo));
    botaoSalvar.textContent = salvo ? 'Salvo para rever' : 'Salvar para rever';
    paragrafoSalvar.append(botaoSalvar);

    cartao.append(titulo, categoria, descricao, paragrafoLink, paragrafoSalvar);
    fragmento.append(cartao);
  });

  secao.append(fragmento);

  // Delegação: um único listener na seção atende aos botões criados acima.
  if (secao.dataset.salvarConfigurado !== 'true') {
    secao.dataset.salvarConfigurado = 'true';
    secao.addEventListener('click', evento => {
      const botao = evento.target.closest('button[data-salvar-id]');
      if (!botao || !secao.contains(botao)) return;
      const id = botao.dataset.salvarId;
      if (!iniciativas.some(item => item.id === id)) return;

      if (!alternarIniciativaSalva(id)) {
        resumo.textContent = 'Não foi possível salvar neste navegador.';
        return;
      }
      const salvo = iniciativasSalvas.has(id);
      botao.setAttribute('aria-pressed', String(salvo));
      botao.textContent = salvo ? 'Salvo para rever' : 'Salvar para rever';
      atualizarResumoSalvos(secao);
    });
  }
}

window.renderizarIniciativas = renderizarIniciativas;
renderizarIniciativas();
