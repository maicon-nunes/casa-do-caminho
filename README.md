# Casa do Caminho

Projeto acadêmico de desenvolvimento front-end para uma ONG fictícia.
Construído com HTML semântico, CSS e JavaScript, sem bibliotecas externas.

## Funcionalidades

- Apresentação da organização e dos projetos sociais.
- Navegação entre conteúdos sem recarregar a página, utilizando rotas por hash.
- Formulário demonstrativo com validações e máscaras de CPF, telefone e CEP.
- Validação dos dígitos verificadores do CPF.
- Menu adaptado para dispositivos móveis.
- Filtros de atualizações ilustrativas.
- Opção de salvar iniciativas para consultar depois.

## Organização dos arquivos

- `index.html`: redirecionamento para a aplicação.
- `html/index.html`: página principal com navegação SPA.
- `html/projetos.html`: página independente de projetos.
- `html/cadastro.html`: página independente de cadastro.
- `css/estilos.css`: estilos e adaptação às diferentes telas.
- `js/`: scripts de navegação, componentes, validação e persistência.
- `imagens/`: recursos visuais.
- `LEIA-ME.txt`: informações complementares.

## Como executar

1. Baixe o repositório pelo botão Code > Download ZIP.
2. Extraia o arquivo.
3. Abra `html/index.html` em um navegador atualizado.
4. Preserve a organização das pastas para manter os caminhos funcionando.

Não é necessário instalar dependências ou configurar um backend.

## Como utilizar

Use o menu para acessar a apresentação, os projetos e o cadastro.
Na seção de projetos, marque iniciativas com a opção “Salvar para rever”.
Na seção de atualizações, utilize os filtros para selecionar uma categoria.

Preencha o formulário com dados fictícios para testar as máscaras
e as mensagens de validação.

## Dados e limitações

O formulário é demonstrativo: não envia nem armazena dados pessoais.
Somente os identificadores das iniciativas salvas são persistidos
no localStorage do navegador, quando disponível.

A organização, as atualizações e a fotografia são ilustrativas.
A fotografia foi gerada para o exercício e não retrata colaboradores reais.

## Acessibilidade

O projeto utiliza HTML semântico, rótulos nos campos, hierarquia de títulos,
indicadores de foco e atributos ARIA em componentes interativos.

A conformidade integral com WCAG 2.1 AA ainda depende de uma auditoria.
As verificações devem incluir navegação por teclado, leitor de tela,
contraste, ampliação e validação da marcação HTML.

## Versionamento

- `main`: destinada à versão publicada.
- `develop`: integração das alterações.
- `feature/acessibilidade`: branch de trabalho utilizada nesta etapa.
- `release/1.0.0`: preparação e revisão da primeira versão.

As alterações são integradas por pull requests.

## Manutenção

- Edite os conteúdos nos arquivos da pasta `html`.
- Centralize os estilos em `css/estilos.css`.
- Atualize os comportamentos nos scripts correspondentes da pasta `js`.
- Preserve os caminhos relativos e os nomes dos arquivos.
- Após alterações, revise os links, o formulário e a navegação.
- Confira o layout em telas pequenas e grandes.
- Valide novamente o HTML e os recursos de acessibilidade.

## Publicação

A configuração de hospedagem será realizada após a revisão
e a integração da versão na branch `main`.

## Testes manuais realizados em 29/09/2026

- Navegação com Tab e Shift + Tab, com foco visível.
- Ampliação de 200% sem cortes ou sobreposição observados.
- Bloqueio de e-mail sem arroba, com orientação para correção.
- Identificação e bloqueio de CPF inválido.
- Menu móvel operado por teclado, fechando após selecionar Projetos.
- Nomes dos campos anunciados corretamente pelo Narrador do Windows.

Os resultados correspondem aos percursos testados.
Ainda falta verificar o contraste das cores e concluir a auditoria
antes de afirmar conformidade integral com WCAG 2.1 AA.
