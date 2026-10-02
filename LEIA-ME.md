# Portfólio — Kauan Alves

**V2:** para publicar e atualizar no repositório `fffhhg369/Portif-lio`, consulte `README.md`. Inclua também `motion.css` e `motion.js` no upload.

Site estático em HTML, CSS e JavaScript. Não exige instalação, servidor de aplicação, conta paga ou chave de API.

## Abrir
Extraia o ZIP mantendo todos os arquivos na mesma pasta. Abra `index.html` no navegador. Para desenvolvimento, opcionalmente execute `python -m http.server 3000` nessa pasta e acesse http://localhost:3000.

## Estrutura
- `index.html`: apresentação, trajetória e contatos.
- `style.css`: cores, layout, adaptação para celular e animações.
- `app.js`: filtros, animações, menu e respostas interativas.
- `conteudo.js`: projetos, cursos e certificados editáveis.
- `Curriculo-Kauan-Alves.pdf`: seu currículo original para download.

## Adicionar projetos
Abra `conteudo.js` em um editor de texto, como VS Code. Substitua `projetos: []` por uma lista de projetos reais. Exemplo:

```js
projetos: [
  {
    titulo: 'Nome do projeto',
    descricao: 'Explique o problema, a solução e seus aprendizados.',
    categoria: 'Python',
    tecnologias: ['Python', 'Pandas'],
    repositorio: 'https://github.com/SEU-USUARIO/SEU-PROJETO',
    demonstracao: ''
  }
],
```

Categorias aceitas nos filtros: `Python`, `Dados` e `Automação`. Use vírgulas entre os objetos quando houver mais de um projeto. Os cartões aparecem automaticamente. O campo demonstracao é opcional. Os projetos Python não executam no próprio portfólio; a demonstração deve apontar para uma aplicação hospedada separadamente, se houver.

## Adicionar certificados
Crie uma pasta `certificados` dentro da pasta do site, copie seus PDFs para ela e preencha a lista:

```js
certificados: [
  {
    titulo: 'Nome do curso',
    instituicao: 'Instituição emissora',
    arquivo: 'certificados/meu-certificado.pdf'
  }
],
```

Os links aparecem abaixo da formação. Nenhum comprovante foi inventado ou criado. As formações e os status iniciais foram transcritos ou resumidos do currículo enviado; revise os status quando concluir novos cursos. Na lista `cursos`, use `Concluído`, `Em andamento` ou `Finalizando`.

## Atualizar outros textos
- Apresentação, contatos e trajetória: `index.html`.
- Respostas do painel interativo: objeto `answers` em `app.js`.
- Cores: variáveis no início de `style.css`, especialmente `--bg` e `--accent`.
- Currículo: substitua o PDF mantendo o nome, ou atualize os dois links no HTML.

## Publicação
Este projeto está pronto para hospedagem estática, mas não foi publicado em um domínio definitivo. Você pode enviar os arquivos para GitHub Pages ou um serviço de hospedagem estática. No GitHub Pages, envie os arquivos para um repositório, com `index.html` na raiz, e habilite Pages na branch desejada. Não precisa de etapa de build.

**Privacidade:** o site inclui e-mail, LinkedIn, link de WhatsApp e o PDF original do currículo, conforme os dados enviados. Antes de publicar, confirme se deseja disponibilizar esses dados e remova os que não quiser expor. O PDF também contém seus dados de contato e bairro.

## Interações e acessibilidade
- Efeito de decodificação em títulos quando entram na tela, repetível ao sair e voltar.
- Painel com respostas pré-escritas e efeito de digitação. Não é um chatbot generativo e não envia dados a serviços externos.
- Filtros para projetos e cursos.
- Navegação móvel, links diretos de contato e cópia de e-mail.
- Opção para pausar animações no rodapé e respeito à preferência de movimento reduzido do dispositivo.
- Não há painel administrativo ou upload pelo navegador: novos conteúdos são adicionados no arquivo `conteudo.js` e publicados novamente.

A prévia temporária da conversa não substitui a publicação em hospedagem própria. O arquivo separado `Portfolio-Kauan.html` é uma versão autônoma de demonstração; para manutenção e publicação, use esta pasta com os arquivos separados.


## Cartão virtual público
Consulte README.md. Envie `cartao.css`, `cartao.js`, `cartao-assets.js` e `virtual/`. Para mudar dados, use `gerar-cartao-virtual.py`.

Os PDFs de impressão ficam somente no pacote pessoal separado, fora do site. Se publicou a versão anterior, exclua `cartoes/` e `gerar-cartoes.py` do repositório e publique novamente. Exclusão não apaga cópias ou histórico antigo.
