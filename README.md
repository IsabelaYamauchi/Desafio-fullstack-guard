# Desafio Fullstack Pleno - Gerenciador de Contatos

## Descrição do Projeto

Este desafio consiste em desenvolver um site responsivo para gerenciar contatos, onde os usuários poderão cadastrar novos contatos com as informações de nome, e-mail e telefone. As informações de e-mail e telefone devem ser criptografadas no banco de dados para garantir a segurança dos dados. O projeto deverá ser implementado utilizando **React.js** ou **Next.js** no frontend e **NestJS** no backend, ambos com **TypeScript**. Testes também deverão ser implementados.

## Funcionalidades

- Cadastro de contatos (Nome, E-mail, Telefone)
- O e-mail e o telefone devem ser criptografados
- Listagem de contatos cadastrados
- Visualização de contatos (com e-mail e telefone descriptografados)
- Edição de contatos
- Remoção de contatos

## Tecnologias Utilizadas

### Frontend:
- **React.js** ou **Next.js**
- **TypeScript**
- **Axios** ou Fetch API (para comunicação com o backend)
- **TailwindCSS** com ou sem framework
- **Jest** ou **React Testing Library** para testes unitários

### Backend:
- **NestJS**
- **TypeScript**
- **Prisma** (ou outro ORM de sua escolha)
- **Criptografia** usando **bcrypt** ou **crypto**
- **PostgreSQL** ou **MySQL** (livre escolha de banco de dados relacional)
- **Jest** para testes unitários e integração

## Requisitos

### Funcionais:
- O usuário deve conseguir cadastrar um contato com nome, e-mail e telefone.
- O e-mail e o telefone devem ser criptografados no banco de dados.
- O usuário deve conseguir visualizar a lista de contatos cadastrados.
- O usuário deve poder editar e remover um contato existente.

### Não Funcionais:
- O projeto deve ser desenvolvido em **TypeScript**.
- O frontend deve ser responsivo.
- O código deve ser acompanhado de testes automatizados (unitários e/ou de integração).

## Estrutura do Projeto

### Frontend
- Página de cadastro de contatos
- Página de listagem de contatos
- Página de edição de contatos
- Integração com a API (backend)

### Backend
- Rota para cadastro de contatos (POST `/contacts`)
- Rota para listagem de contatos (GET `/contacts`)
- Rota para editar um contato (PUT `/contacts/:id`)
- Rota para remover um contato (DELETE `/contacts/:id`)
- Criptografia de e-mail e telefone

## Protótipo

Você pode visualizar o design do projeto no Figma através deste [link para o Figma](https://www.figma.com/design/HguK6UApzEaA4aCegPm2kh/Gerenciador-de-contatos-(Community)?node-id=3-376&node-type=canvas&t=qziGjsfmSU7qIBuo-0).


