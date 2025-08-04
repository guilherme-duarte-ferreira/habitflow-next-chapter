# HabitFlow

*Seu companheiro de hábitos, de código aberto e focado na sua privacidade.*

HabitFlow é uma aplicação web de página única (SPA) projetada para ajudar você a construir e manter bons hábitos. Com uma interface limpa e reativa, a ferramenta oferece uma maneira visual e intuitiva de registrar seu progresso. Toda a aplicação está contida em um único arquivo `HTML`, não requer instalação, e todos os seus dados são armazenados exclusivamente no seu navegador, garantindo 100% de privacidade.

*(Sugestão: você pode tirar um print da tela principal e substituir este link)*

## ✨ Principais Funcionalidades

  - **Rastreamento de Hábitos:** Crie hábitos ilimitados e registre suas atividades com data e hora.
  - **Dashboard Interativo:** Visualize todos os seus hábitos em um só lugar, cada um com um **mini-calendário** do mês atual para uma visão rápida do seu progresso.
  - **Contador de Sequência (Streak) Dinâmico:** Acompanhe sua sequência de dias em tempo real (`dias, horas, minutos, segundos`).
  - **Visualização Detalhada:** Mergulhe em cada hábito com calendários avançados:
      - **Visão Mensal e Anual:** Navegue facilmente pelo histórico para visualizar seus registros.
      - **Destaque do Dia Atual:** O dia de hoje é sempre destacado para fácil referência.
  - **"Super Modal" de Registro:** Adicione ou edite múltiplos registros de um mesmo dia de forma rápida e eficiente, sem sair da tela do calendário.
  - **Anotações Gerais e Específicas:** Guarde anotações gerais ou notas atreladas a um hábito específico para registrar insights e observações.
  - **Central de Configurações:** Gerencie seus dados com segurança:
      - **Backup e Restauração:** Exporte e importe seus dados em formato `.json`.
      - **Privacidade Total:** Limpe todos os dados do navegador com um único clique.
  - **100% Local e Privado:** Todos os seus dados ficam armazenados no `localStorage` do seu navegador. Nada é enviado para a nuvem.
  - **Zero Dependências:** A aplicação inteira funciona offline (após o primeiro carregamento do Tailwind CSS) e não precisa de backend ou banco de dados.

## 🚀 Como Usar

É simples como deve ser:

1.  Baixe o arquivo `HabitFlow.html`.
2.  Abra-o em qualquer navegador de internet moderno (Chrome, Firefox, Edge, Safari).
3.  Pronto\! Comece a criar seus hábitos.

## 💻 Pilha de Tecnologia

  - **HTML5**
  - **CSS3** com **Tailwind CSS** (utilizado via CDN)
  - **JavaScript (ES6+)** (sem frameworks ou bibliotecas externas)

## 🔮 Próximos Passos (Ideias)

O projeto tem potencial para crescer ainda mais. Uma próxima funcionalidade planejada é o **Módulo 6: "Feed de Anotações" no Dashboard**, que permitiria:

  - Visualizar um feed cronológico de todas as anotações (gerais e de hábitos) diretamente no dashboard.
  - Filtrar anotações e ter uma visão consolidada de todos os seus insights.# HabitFlow - Seu Companheiro de Hábitos

## 📝 Sobre o Projeto
HabitFlow é uma aplicação web completa, do tipo *single-page application* (SPA), projetada para ser um companheiro pessoal no rastreamento e gerenciamento de hábitos. Construída sem dependências de frameworks de JavaScript, a aplicação permite que os usuários criem, monitorem e registrem seus hábitos diários de forma intuitiva. Todos os dados são salvos localmente no navegador, garantindo privacidade e funcionamento offline. A interface, com um design moderno e responsivo, oferece uma visão clara do progresso, incluindo calendários detalhados e contadores de sequência (streaks) em tempo real.

## ✨ Funcionalidades Principais

* **Dashboard Principal:**
    * Visualização de todos os hábitos cadastrados em formato de cartões.
    * Cada cartão exibe o nome do hábito, a contagem total de registros, e um mini-calendário do mês atual com os dias de atividade marcados.
    * Contador de sequência (streak) individual para cada hábito, atualizado em tempo real.
    * Um "Feed de Anotações" opcional que agrega e exibe todas as anotações (gerais e de hábitos) em um único fluxo cronológico.

* **Gerenciamento de Hábitos:**
    * Formulário na barra lateral para adicionar novos hábitos de maneira rápida.
    * Lista de hábitos na barra lateral com acesso rápido à navegação.
    * Menu de ações rápidas (ao passar o mouse) para editar o nome ou excluir um hábito diretamente da barra lateral.

* **Visualização Detalhada do Hábito:**
    * Página dedicada para cada hábito, acessada pelo dashboard ou pela barra lateral.
    * Calendário interativo para registrar atividades, com capacidade de alternar entre a visualização mensal e anual.
    * Navegação entre meses e anos no calendário para visualizar o histórico completo.
    * Logs de atividades recentes listados em ordem cronológica, com opção de exclusão imediata.
    * Seção de anotações exclusiva para o hábito, permitindo adicionar, editar e excluir notas específicas.

* **Sistema de Anotações:**
    * Módulo de "Anotações Gerais" para notas que não estão vinculadas a um hábito específico.
    * Editor de anotações completo com suporte para múltiplas linhas.
    * Recurso de "Ver mais..." para anotações longas, mantendo a interface limpa.
    * Modal de edição maximizável, transformando o editor de notas em uma área de trabalho de tela cheia para maior foco.

* **Registro de Atividades (Logs):**
    * Modal de registro que permite adicionar uma atividade para qualquer dia (passado ou presente) com data e hora específicas.
    * Visualização, dentro do modal, de todos os outros registros feitos no mesmo dia, com opções para editar ou excluir.

* **Contador de Sequência (Streak):**
    * Exibição dinâmica do tempo decorrido (dias, horas, minutos e segundos) desde o último registro válido.
    * A sequência é considerada "quebrada" se houver um intervalo de mais de 48 horas entre os registros.

* **Gerenciamento de Dados do Usuário:**
    * Funcionalidade de **Backup** que gera e baixa um arquivo `habitflow-backup.json` contendo todos os dados da aplicação.
    * Funcionalidade de **Restauração** que permite ao usuário importar um arquivo de backup `.json` para restaurar seus dados, substituindo os atuais.
    * "Zona de Perigo" com a opção de **Limpar Todos os Dados**, que apaga permanentemente todas as informações do `localStorage` após uma confirmação.

* **Interface e Experiência do Usuário:**
    * Interface reativa com atualizações automáticas sem a necessidade de recarregar a página.
    * Design moderno com efeito *Glassmorphism*.
    * Responsividade para boa visualização em desktops, tablets e dispositivos móveis.
    * Atalhos de teclado (ex: `Esc` para fechar modais).
    * Segurança básica através da sanitização de HTML para prevenir ataques XSS ao exibir dados inseridos pelo usuário.

## 🚀 Tecnologias Utilizadas
O projeto foi construído com um foco em simplicidade e performance, utilizando tecnologias web fundamentais.

* **HTML5:** Estrutura semântica do conteúdo.
* **CSS3 (com Tailwind CSS):** Estilização moderna e responsiva, utilizada via CDN para prototipagem rápida.
* **JavaScript (Vanilla JS):** Toda a lógica da aplicação, incluindo manipulação do DOM, gerenciamento de estado, e interatividade, é escrita em JavaScript puro, sem frameworks ou bibliotecas externas.
* **Web Storage API (`localStorage`):** Utilizada para a persistência de todos os dados do usuário diretamente no navegador.

## 🏁 Como Executar o Projeto
A aplicação é totalmente *client-side* e não requer um servidor ou processo de compilação.

1.  Salve o código completo fornecido como um único arquivo, por exemplo, `index.html`.
2.  Abra o arquivo `index.html` em qualquer navegador web moderno (como Chrome, Firefox, Edge, ou Safari).
3.  A aplicação funcionará localmente. Todos os hábitos e anotações que você criar serão salvos no `localStorage` do seu navegador e estarão disponíveis na próxima vez que você abrir o arquivo.