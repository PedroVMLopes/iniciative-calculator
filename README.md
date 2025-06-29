# RPV - Assistente para RPGs de Mesa
## 📝 Descrição

O RPV é uma aplicação criada para apoiar Dungeons Masters na organização das sessões de D&D.
Com ele, é possível:

  - Cadastrar e acompanhar jogadores e inimigos junto às suas iniciativas, pontos de vida e condições.

  - Aplicar efeitos e gerenciar o estado de cada um facilmente.

  - Utilizar um sisteminha de criação de NPCs, que escolhe aleatoriamente a classe social, profissão e traços de personalidade para poupar tempo na hora de preparar suas aventuras.

🔹 Tecnologias utilizadas

    React — para a construção da interface

    JavaScript — como a principal linguagem de programação

    Electron — para proporcionar uma versão desktop da aplicação

    LocalStorage — para o armazenamento permanente dos personagens, inimigos e NPCs criados

## ⚙ Instalação

- Caso queira baixar e usar a aplicação final em seu computador, o instalador dela está no Google Drive:
  https://drive.google.com/drive/u/1/folders/1ngA243r2AfNMAHVmCo6PaA6PJc0yROEc

Siga os seguintes caminhos para instalar e usar o RPV:

  Clone o repositório:

    git clone https://github.com/PedroVMLopes/iniciative-calculator

  Vá até o diretório:

    cd iniciative-calculator

  Instale as dependências:

    npm install

  Inicie o aplicativo:

    npm start

Isso deve preparar o aplicativo para execução no seu computador.

## 🔹 Uso

Depois que o aplicativo for iniciado:

  - Use a barra lateral para adicionar personagens, aplicar efeitos, e acompanhar o HP de cada um. Ao adicionar um personagem a rolagem de iniciativa dele é feita automaticamente
  - Caso queira, é possível agrupar mais de um inimigo com a mesma iniciativa (Ex: um hobgoblin com um cão de guarda); isso pode ser feito clicando em "Adicionar ao grupo". Clique nesse botão para cada inimigo que você deseja adicionar ao grupo, e quando todos forem adicionados clique em "Enviar Grupo".

  - Vá até a página de **Criação de NPCs** para gerar facilmente NPCs aleatórios, sendo capaz de especificar a classe social, a profissão e até os seus traços de personalidade.

  - Vá até a página de **Fichas** para ver uma lista de uma grande gama de fichas pré montadas de D&D. Elas englobam diversos casos e possuem informações completas prontas para serem utilizadas caso alguém do grupo deseje atacar alguém inesperado, basta utilizá-las como base para seu NPC.
