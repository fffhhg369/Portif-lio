/*
  CONTEÚDO DO PORTFÓLIO — GUIA PARA KAUAN
  =====================================
  Edite este arquivo no VS Code ou pelo lápis do GitHub.
  Depois salve e publique a alteração (Commit changes).

  ROTEIRO:
  1. PROJETOS NOVOS: nome, resumo, tecnologias e links.
  2. CERTIFICADOS: curso, instituição e caminho do PDF.
  3. FORMAÇÕES: atualize os status conforme sua evolução.
  4. PROJETO DO PORTFÓLIO: conteúdo existente, normalmente não precisa mexer.

  REGRAS PARA NÃO QUEBRAR O ARQUIVO:
  • Textos ficam entre aspas duplas: "Meu texto".
  • Separe itens com vírgula. Pode deixar vírgula após o último item.
  • Não apague os colchetes [ ] nem as chaves { }.
  • Linhas que começam com // são comentários e não aparecem no site.
  • Para usar aspas dentro de texto, prefira aspas simples: "Meu projeto 'X'".
  • Nada é publicado só por escrever um exemplo comentado.
  • Antes de editar, faça uma cópia deste arquivo.
*/

// ================================================================
// 1. PROJETOS NOVOS — cole os seus ENTRE os colchetes abaixo.
// O projeto "Este portfólio" já existe e será mantido automaticamente.
// ================================================================
const MEUS_PROJETOS = [
  // EXEMPLO: copie este bloco, retire o // de cada linha e preencha.
  // {
  //   titulo: "Nome do seu projeto",
  //   descricao: "Qual problema resolveu, como funciona e o que você aprendeu.",
  //   categoria: "Python", // Escolha: Python, Dados, Automação ou Web.
  //   tecnologias: ["Python", "Pandas"], // Pode adicionar/remover nomes.
  //   repositorio: "https://github.com/SEU-USUARIO/SEU-PROJETO",
  //   demonstracao: "", // Link do projeto funcionando; deixe vazio se não tiver.
  // },

  // COLE SEUS PROJETOS AQUI (nenhum novo projeto cadastrado ainda).
];

// ================================================================
// 2. CERTIFICADOS — só cadastre os comprovantes que você já possui.
// ================================================================
const MEUS_CERTIFICADOS = [
  // EXEMPLO: copie, retire os // e preencha.
  // {
  //   titulo: "Nome do curso como consta no certificado",
  //   instituicao: "Nome da instituição",
  //   arquivo: "certificados/nome-do-curso.pdf",
  // },

  // COLE SEUS CERTIFICADOS AQUI (nenhum comprovante cadastrado ainda).
];

// COMO ENVIAR O PDF:
// 1. Crie a pasta certificados/ ao lado de index.html.
// 2. Coloque o PDF nela (ex.: certificados/python-senai.pdf).
// 3. Use exatamente esse caminho no campo arquivo, inclusive maiúsculas.
// 4. Envie a pasta e este conteudo.js ao GitHub. Não basta editar o caminho.
// Dica: nomes de arquivos sem espaços ou acentos facilitam a manutenção.
// Atenção: o certificado será público. Revise CPF e outros dados pessoais.

// ================================================================
// 3. FORMAÇÕES — cursos do currículo; não são comprovantes de certificado.
// Status aceitos: "Concluído", "Em andamento" ou "Finalizando".
// Para concluir um curso, troque apenas o valor do campo status.
// ================================================================
const MINHAS_FORMACOES = [
  {
    "titulo": "Python para Data Science",
    "instituicao": "SENAI",
    "status": "Concluído"
  },
  {
    "titulo": "Fundamentos de Python 1",
    "instituicao": "SENAI",
    "status": "Concluído"
  },
  {
    "titulo": "Fundamentos da Engenharia de Dados",
    "instituicao": "DSA",
    "status": "Finalizando"
  },
  {
    "titulo": "Python para Análise de Dados e Data Science",
    "instituicao": "DSA",
    "status": "Em andamento"
  },
  {
    "titulo": "Fundamentos de Python 1",
    "instituicao": "NetAcad",
    "status": "Em andamento"
  },
  {
    "titulo": "Fundamentos de Python 2",
    "instituicao": "NetAcad",
    "status": "Em andamento"
  },
  {
    "titulo": "Fundamentos de Data Science e Inteligência Artificial",
    "instituicao": "DSA",
    "status": "Em andamento"
  },
  {
    "titulo": "Microsoft Power BI para BI e Data Science",
    "instituicao": "DSA",
    "status": "Em andamento"
  },
  {
    "titulo": "Pacote Office 365",
    "instituicao": "Uninove",
    "status": "Concluído"
  },
  {
    "titulo": "CHANNEL 9",
    "instituicao": "Uninove",
    "status": "Concluído"
  },
  {
    "titulo": "Inglês Básico",
    "instituicao": "Senac",
    "status": "Concluído"
  }
];

// ================================================================
// 4. PROJETO EXISTENTE — explicação de como este portfólio funciona.
// Esta parte é longa, mas não precisa editar para incluir outros projetos.
// Opcional: para painéis "Ver como funciona", use este detalhes como modelo.
// Nas abas: t = título, p = parágrafo, codigo = trecho opcional.
// Os trechos são explicações, não código executado pelo site.
// ================================================================
const PROJETO_DO_PORTFOLIO = {
  "titulo": "Este portfólio",
  "descricao": "Meu primeiro projeto: um site estático em tema escuro, com efeitos de código, painel interativo e cartão de contato virtual. Aqui mostro como ele foi construído.",
  "categoria": "Web",
  "tecnologias": [
    "HTML",
    "CSS",
    "JavaScript",
    "GitHub Pages"
  ],
  "repositorio": "https://github.com/fffhhg369/Portif-lio",
  "demonstracao": "",
  "detalhes": {
    "resumo": "Um portfólio sem framework e sem etapa de build: três camadas simples (HTML, CSS e JavaScript) e um arquivo de conteúdo, o conteudo.js, para adicionar projetos e certificados sem mexer no layout.",
    "abas": [
      {
        "id": "efeitos",
        "titulo": "Efeitos",
        "blocos": [
          {
            "t": "Texto sendo decodificado",
            "p": "Cada letra do título vira um pequeno elemento. A letra real continua no HTML, e uma camada escondida para leitores de tela troca por símbolos de código até revelar o caractere certo. Assim a leitura, a cópia e o layout não quebram.",
            "codigo": "// motion.js (trecho simplificado)\nconst characters = '01{}[]<>/_+#';\nconst real = document.createElement('span');   // letra verdadeira\nconst noise = document.createElement('span');  // símbolo temporário\nnoise.setAttribute('aria-hidden', 'true');\nnoise.textContent = characters[Math.floor(Math.random() * characters.length)];"
          },
          {
            "t": "Entrada atrasada ao chegar na seção",
            "p": "Um IntersectionObserver detecta quando um bloco entra na área de leitura. O espaço fica reservado e vazio por cerca de 1,5 segundo; depois os títulos decodificam e os textos aparecem em sequência. Ao sair e voltar, o efeito recomeça.",
            "codigo": "// motion.js (trecho)\nconst ENTRY_DELAY = 1500;  // pausa antes de aparecer (ms)\nconst TEXT_STAGGER = 240;  // intervalo entre textos (ms)\nnew IntersectionObserver(entries => { /* entra: agenda o efeito; sai: cancela */ },\n  { threshold: 0, rootMargin: '-78px 0px -18% 0px' });"
          },
          {
            "t": "Respeito a quem prefere menos movimento",
            "p": "Se o aparelho pede menos animação, ou se a pessoa pausa pelo botão do rodapé, tudo aparece de uma vez, sem efeitos.",
            "codigo": "/* motion.css (trecho) */\n@media (prefers-reduced-motion: reduce) {\n  .cipher-real { opacity: 1 !important; }\n  .cipher-live { display: none !important; }\n}"
          }
        ]
      },
      {
        "id": "tema",
        "titulo": "Tema",
        "blocos": [
          {
            "t": "Paleta escura com um único destaque",
            "p": "O fundo é quase preto, os textos são creme e o laranja aparece só nos pontos de atenção. Todas as cores ficam em variáveis CSS: trocar o destaque do site inteiro é mudar uma linha.",
            "codigo": "/* style.css */\n:root {\n  --bg: #101110;\n  --fg: #f1f0e9;\n  --muted: #969b92;\n  --accent: #f68a50;\n  --mono: 'SFMono-Regular', Consolas, monospace;\n}"
          },
          {
            "t": "Tipografia de código",
            "p": "Rótulos e detalhes usam fonte monoespaçada do próprio sistema, o que reforça o clima de terminal sem baixar fontes externas."
          },
          {
            "t": "Inspiração da referência",
            "p": "A organização de apresentação, com identidade em destaque, bastante espaço e contatos bem separados, veio da referência que escolhi, adaptada para um visual escuro e sem fotos."
          }
        ]
      },
      {
        "id": "painel",
        "titulo": "Painel",
        "blocos": [
          {
            "t": "Painel de perguntas",
            "p": "Simula uma resposta de IA sendo digitada, mas não usa IA: as respostas são textos que eu escrevi, guardados em um objeto JavaScript. A digitação é só um efeito que mostra o texto aos poucos.",
            "codigo": "// app.js (trecho)\nconst answers = {\n  conexao: { question: 'O que conecta engenharia e dados?', text: '...' },\n  ferramentas: { question: 'O que estou estudando atualmente?', text: '...' }\n};\nel.textContent = entry.text.slice(0, n);  // mostra mais letras a cada passo"
          },
          {
            "t": "Terminal com abas",
            "p": "O terminal da abertura troca entre profile.py, stack.py e journey.py e funciona com mouse ou setas do teclado. É um trecho ilustrativo: o site não executa Python."
          },
          {
            "t": "Cartão de contato virtual",
            "p": "Gera uma imagem com meus contatos e um QR Code para o WhatsApp, além de um arquivo que salva meu contato na agenda. O visitante não precisa preencher nada."
          }
        ]
      },
      {
        "id": "construcao",
        "titulo": "Construção",
        "blocos": [
          {
            "t": "Organização dos arquivos",
            "p": "Cada arquivo tem uma função. index.html guarda a estrutura e os textos; style.css e motion.css cuidam da aparência; app.js e motion.js, do comportamento; conteudo.js, do que muda com o tempo.",
            "codigo": "index.html      estrutura e textos\nstyle.css       layout e tema\nmotion.css      aparência dos efeitos\napp.js          filtros, menu e painel\nmotion.js       decodificação e entradas\nconteudo.js     projetos e certificados"
          },
          {
            "t": "Testes e acessibilidade",
            "p": "Testei em telas pequenas e grandes, com teclado e com a opção de reduzir animações. Os botões têm nome para leitores de tela e o foco do teclado fica visível."
          },
          {
            "t": "Publicação",
            "p": "O site é estático e roda no GitHub Pages. Para atualizar, basta enviar os arquivos alterados ao repositório."
          }
        ]
      }
    ]
  }
};

// ================================================================
// MONTAGEM DO SITE — não é necessário alterar este trecho.
// ================================================================
window.PORTFOLIO = {
  projetos: [PROJETO_DO_PORTFOLIO, ...MEUS_PROJETOS],
  certificados: MEUS_CERTIFICADOS,
  cursos: MINHAS_FORMACOES,
};
