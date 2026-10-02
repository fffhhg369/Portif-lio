# Kauan Alves — portfólio com cartão virtual

Site público em HTML, CSS e JavaScript estático, sem cadastro ou dependências externas. Mantém as animações, a trajetória, os projetos e os certificados da versão anterior.

## O que é público

Na seção **Contato → Gerar cartão virtual**, o visitante encontra:

- Cartão de **Kauan**, com versões clara e escura.
- Download de imagem PNG **1080 × 1350 px** para enviar em mensagens.
- Download de contato `.vcf` para importar na agenda do aparelho (depende da confirmação do usuário).
- Compartilhamento nativo quando o navegador oferece suporte. Se ele não aceitar arquivos, são compartilhados os contatos em texto. Se não houver suporte ou permissão, é oferecida cópia manual e download da imagem.
- Links de WhatsApp, e-mail e LinkedIn.
- QR Code para `https://wa.me/5511954196757`.

Nenhum dado do visitante é solicitado. O cartão não usa o endereço da prévia temporária nem depende de o portfólio estar publicado. PNG é imagem: os textos dentro dela não são links clicáveis; os botões no site são.

## Impressão somente fora do site

**Os PDFs de cartão e o gerador de impressão foram removidos desta pasta pública.** Não há botões de impressão, área administrativa ou senha no JavaScript.

Os PDFs estão no pacote separado `Kauan-Impressao-Pessoal.zip`, para o proprietário guardar no computador. **Não envie esse pacote ao repositório público.** A separação é de arquivos e opções: não impede que alguém salve ou imprima uma imagem pública, nem revoga cópias já baixadas.

### Importante ao atualizar uma versão anterior

Se você já publicou os cartões para impressão, **enviar os novos arquivos não remove os antigos automaticamente**. Exclua do repositório a pasta antiga `cartoes/` inteira e o arquivo `gerar-cartoes.py`. Substitua `index.html`, `cartao.js`, `cartao.css` e `cartao-assets.js` pelas novas versões. Adicione a pasta `virtual/` e o gerador público `gerar-cartao-virtual.py` se quiser mantê-lo no repositório.

Espere a nova publicação terminar e teste os antigos endereços dos PDFs: devem retornar 404. Arquivos previamente commitados podem continuar acessíveis no histórico do Git, em caches e em cópias de terceiros. Remover da publicação não apaga esse histórico nem garante confidencialidade retroativa.

## Publicar no GitHub

Repositório informado: https://github.com/fffhhg369/Portif-lio

**Esta versão foi preparada localmente. Nada foi enviado ao GitHub pelo assistente.**

1. Extraia `Portfolio-Kauan-GitHub.zip`.
2. Entre na sua conta do GitHub e abra o repositório.
3. Se for uma atualização, remova os arquivos antigos de impressão indicados acima.
4. Use **Add file → Upload files** e envie os arquivos da pasta extraída. `index.html` deve ficar na raiz, com as pastas relativas preservadas.
5. Confirme em **Commit changes** na branch configurada no Pages.
6. Na primeira publicação: **Settings → Pages → Deploy from a branch → main → / (root)**. A disponibilidade para repositórios privados depende do plano da conta.
7. Aguarde a publicação. O endereço esperado, sem domínio personalizado, é `https://fffhhg369.github.io/Portif-lio/`. A tela Pages informa o endereço efetivo. A publicação não foi verificada nesta entrega.

Depois de configurado, os commits na branch escolhida geram nova publicação. Isso não é instantâneo e abas já abertas podem precisar ser recarregadas. **Não compartilhe senha ou token no chat.**

**Preserve seu `conteudo.js` se já adicionou projetos ou certificados.** Não o substitua por uma lista vazia ao atualizar apenas o visual.

## Arquivos principais

- `index.html`: estrutura, textos e contatos.
- `style.css`, `motion.css`, `motion.js`: visual e animações.
- `app.js`: filtros, menu, cópia de e-mail e painel de respostas pré-escritas (sem IA generativa).
- `conteudo.js`: projetos, formações e certificados editáveis.
- `cartao.css`, `cartao.js`: interface e ações do cartão virtual.
- `cartao-assets.js`: imagens e vCard embutidos para funcionamento local e sem rede.
- `virtual/`: duas imagens PNG, dois SVGs e um vCard, todos públicos.
- `gerar-cartao-virtual.py`: manutenção opcional do cartão virtual; não gera PDFs.
- `Curriculo-Kauan-Alves.pdf`: currículo público original. Este PDF **não** é um cartão de impressão e foi mantido como antes.

## Atualizar os contatos do cartão virtual

Altere o dicionário `D` em `gerar-cartao-virtual.py`, depois execute no computador:

```sh
pip install qrcode cairosvg
python gerar-cartao-virtual.py
```

Envie `cartao-assets.js` e a pasta `virtual/` atualizados. CairoSVG pode exigir a biblioteca Cairo instalada no sistema. O site pronto **não precisa de Python** no GitHub Pages.

O QR, as imagens, o vCard e o texto de compartilhamento usam os mesmos dados. Se mudar telefone, LinkedIn ou e-mail, atualize também os links escritos no HTML e a cópia de e-mail em `app.js`.

## Testar localmente

Abra `index.html` com os arquivos juntos ou execute `python -m http.server 3000` na pasta e acesse http://localhost:3000. Compartilhamento e área de transferência dependem do navegador, HTTPS e permissões. Prévia em iframe pode bloquear essas funções; o download e a seleção manual são alternativas.

## Privacidade

O cartão usa os contatos públicos de Kauan. O site mantém WhatsApp, e-mail, LinkedIn e currículo; o currículo também contém seu bairro. Revise antes de publicar. Não há login, upload de dados pessoais do visitante ou monitoramento permanente do GitHub pelo assistente.

## Entrada atrasada dos textos

Os blocos aguardam aproximadamente **1.500–1.720 ms** após entrar na área de leitura antes de surgir. Títulos decodificam e textos aparecem em sequência, com intervalos de até **240 ms** entre alvos de texto. O espaço fica reservado durante a espera, evitando saltos na página. A saída cancela a espera e a reentrada reinicia o efeito; o painel de respostas começa a digitar somente quando é revelado.

Ajuste `ENTRY_DELAY` e `TEXT_STAGGER` em `motion.js`. Teclado/foco e a preferência de movimento reduzido não ficam presos à espera. Testados: pausa inicial, altura estável, reentrada, filtros, cartão virtual, movimento reduzido e telas de 320–1440 px.

Para atualizar somente estes efeitos no GitHub, substitua **`motion.js`, `motion.css` e `app.js`**. Preserve `conteudo.js` e a pasta `virtual/` se você os personalizou. Esta atualização continua sem publicação automática no GitHub.


## Primeiro projeto: este próprio portfólio

Em **Projetos** há o cartão "Este portfólio", com o botão **Ver como funciona**. Ele abre um painel com quatro abas (Efeitos, Tema, Painel, Construção), explicações em linguagem simples e trechos de código reais, com botão de copiar.

- O conteúdo fica em `conteudo.js`, dentro do projeto, no campo `detalhes`. Para editar os textos, altere lá.
- Outros projetos também podem ter `detalhes`; sem esse campo, o botão não aparece.
- Foi criado o filtro **Web** para este tipo de projeto.
- Arquivos novos: `projeto.js` e `projeto.css`. Atualizados: `index.html`, `app.js`, `conteudo.js` e `motion.js`.
- Se você já tem o `conteudo.js` personalizado no GitHub, **não o substitua**: copie apenas o bloco do projeto "Este portfólio" para dentro da sua lista `projetos`.
- O campo `repositorio` aponta para https://github.com/fffhhg369/Portif-lio. O repositório está público, mas o site ainda não foi publicado nele.
- Se mudar valores no código (por exemplo `ENTRY_DELAY`), lembre de atualizar o texto do painel para não ficar desatualizado.
