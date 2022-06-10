Backend Tijolo
==============

Esta é a parte mais "negócio" do Tijolo. Ela faz a gestão dos cadastros e regras do negócio.

## Estrutura

O projeto segue a estrutura clássica **SOLID**:

1. `Controller`: Classes que expõem a API e fazem a comunicação direta com os clientes;
2. `Service`: Classes de Serviços que normalmente recebem comandos vindo dos controllers e executam os mesmos (como, por
   exemplo, cadastrar um novo produto, ou efetuar uma busca)
3. `Persistence`: Classes que controlam a gravação e obtenção dos dados. Elas são responsáveis por se comunicar com o
   banco de dados da forma como necessário (executando SQL ou comandos do Mongo, por exemplo)

## Dependências

O projeto utiliza o [NodeJS](https://nodejs.org/) como servidor e o [MongoDB](https://www.mongodb.com/) como banco de
dados primário.

Para facilitar no desenvolvimento, é disponibilizado um arquivo `docker-compose` que configura um ambiente com um banco
MongoDB que pode ser apagado e recriado a vontade. Para se usar este recurso é necessário
a [instalação e configuração do Docker](https://docs.docker.com/engine/install/) na sua máquina.

Assumindo que o docker esteja instalado e configurado, basta executar o comando `docker-compose up` na raíz do projeto
para inicializar o MongoDB local para desenvolvimento. Para pará-lo, basta executar `docker-compose down`.

>**Nota:** O ambiente de desenvolvimento continuará ativo mesmo após reiniciar o computador!

## Deploy

A fazer.
