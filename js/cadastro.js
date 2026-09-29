function iniciarCadastro() {
  if (!document.querySelector('#cadastro')) return;
    const somenteDigitos = valor => valor.replace(/\D/g, '');
    const cpf = document.querySelector('#cpf');
    const telefone = document.querySelector('#telefone');
    const cep = document.querySelector('#cep');
    const nascimento = document.querySelector('#nascimento');
    const formulario = document.querySelector('#cadastro');
    const resultado = document.querySelector('#resultado');

    // O limite deve seguir o calendário local, inclusive após 21h no Brasil.
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    nascimento.max = `${ano}-${mes}-${dia}`;

    cpf.addEventListener('input', () => {
      const d = somenteDigitos(cpf.value).slice(0, 11);
      cpf.value = d.replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
      cpf.setCustomValidity('');
    });
    telefone.addEventListener('input', () => {
      const d = somenteDigitos(telefone.value).slice(0, 11);
      telefone.value = d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}${d.length > 7 ? '-' + d.slice(7) : ''}` : d;
    });
    cep.addEventListener('input', () => {
      const d = somenteDigitos(cep.value).slice(0, 8);
      cep.value = d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
    });

    function cpfValido(valor) {
      const d = somenteDigitos(valor);
      if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
      for (let tamanho = 9; tamanho < 11; tamanho++) {
        let soma = 0;
        for (let i = 0; i < tamanho; i++) soma += Number(d[i]) * (tamanho + 1 - i);
        const digito = (soma * 10) % 11 % 10;
        if (digito !== Number(d[tamanho])) return false;
      }
      return true;
    }

    formulario.addEventListener('invalid', () => {
      resultado.className = 'status-error';
      resultado.textContent = 'Erro: confira os campos indicados e tente novamente.';
    }, true);

    formulario.addEventListener('input', () => {
      resultado.className = '';
      resultado.textContent = '';
    });

    formulario.addEventListener('submit', evento => {
      evento.preventDefault();
      resultado.textContent = '';
      resultado.className = '';
      cpf.setCustomValidity(cpfValido(cpf.value) ? '' : 'Confira os dígitos do CPF.');
      if (!formulario.reportValidity()) {
        resultado.className = 'status-error';
        resultado.textContent = 'Erro: confira os campos indicados e tente novamente.';
        return;
      }
      resultado.className = 'status-success';
      resultado.textContent = 'Sucesso: preenchimento válido. Esta demonstração não envia nem armazena os dados.';
    });

}

window.iniciarCadastro = iniciarCadastro;
iniciarCadastro();
