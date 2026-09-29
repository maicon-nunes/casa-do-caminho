function iniciarComponentes() {
  if (!document.querySelector('#info-dialog')) return;
const botaoInformacoes = document.querySelector('#abrir-info');
const dialogoInformacoes = document.querySelector('#info-dialog');

botaoInformacoes.addEventListener('click', () => {
  dialogoInformacoes.showModal();
});

dialogoInformacoes.addEventListener('click', evento => {
  if (evento.target === dialogoInformacoes) dialogoInformacoes.close();
});

}

window.iniciarComponentes = iniciarComponentes;
iniciarComponentes();
