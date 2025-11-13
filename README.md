API Patas Douradas

Esta é a API backend para o projeto "Patas Douradas", um sistema de e-commerce (petshop) desenvolvido como projeto académico. A API é construída com Spring Boot e segue uma arquitetura baseada em Entidades, Repositórios, Serviços e Controladores.

🚀 Tecnologias Utilizadas

Java 21

Spring Boot 3

Spring Data JPA (Hibernate)

Spring Security (com autenticação básica)

H2 Database (Banco de dados em memória)

Maven

▶️ Como Executar o Projeto

Siga estes passos para clonar e executar o projeto localmente.

1. Pré-requisitos

JDK 21 (ou superior) instalado.

Maven instalado e configurado no seu PATH.

Um IDE Java, como IntelliJ IDEA (recomendado) ou Eclipse.

2. Clonar o Repositório

Abra o seu terminal ou Git Bash e utilize o comando git clone:

git clone: https://github.com/kaiofernandesdevs/spring-patas-douradas.git


3. Executar a Aplicação

Abra o projeto no seu IDE (ex: IntelliJ).

Espere o Maven descarregar todas as dependências (pode demorar um pouco na primeira vez).

Encontre a classe principal PatasdouradasApiApplication.java (em src/main/java/com/senacwebpatasdouradas/demo/).

Clique com o botão direito e selecione "Run 'PatasdouradasApiApplication.main()'".

O servidor será iniciado. A API estará disponível em http://localhost:8080.

🗃️ Acesso ao Banco de Dados (H2 Console)

O projeto está configurado para usar um banco de dados H2 em memória com credenciais fixas (definidas no application.properties).

1. Link do Console:

http://localhost:8080/h2-console

2. Login de Segurança (Pop-up do Navegador):

Utilizador: user

Senha: user123

3. Login da Página H2 (Após o pop-up):

JDBC URL: jdbc:h2:mem:patasdouradasdb

User Name: user

Password: (deixe em branco)

🧑‍💻 Autores

Kaio Fernandes

Matheus