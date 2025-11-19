# Gerenciador de Contatos — Desafio Fullstack Pleno

## 📌 Descrição do Projeto
Este projeto consiste no desenvolvimento de uma aplicação **Fullstack** para gerenciamento de contatos, permitindo que usuários cadastrem, visualizem, editem e removam contatos.  
As informações sensíveis — **e-mail** e **telefone** — são **criptografadas** no banco de dados para garantir segurança.

O frontend foi desenvolvido em **React/Next.js** e o backend em **NestJS**, ambos utilizando **TypeScript**.  
O projeto também contempla responsividade e integração completa entre frontend e backend.

---

## 🚀 Funcionalidades
- Cadastro de contatos (Nome, E-mail, Telefone)  
- Criptografia de e-mail e telefone no banco de dados  
- Listagem de contatos  
- Visualização detalhada (dados descriptografados)  
- Edição de contatos  
- Exclusão de contatos  
- Layout responsivo  
- Integração total via API REST

---

## 🧰 Tecnologias Utilizadas

### **Frontend (guard-front)**
- **React.js / Next.js**
- **TypeScript**
- **TailwindCSS**
- **Fetch API**
- **Component Libraries** (HeroUI, ShadCN, etc.)
- **React Testing Library / Jest**

### **Backend (guard-api)**
- **NestJS**
- **TypeScript**
- **TypeORM**
- **class-validator**
- **Criptografia de e-mail e telefone**
- **PostgreSQL**
- **Jest**

---

## 📚 Referências de Estudo
- Curso Udemy (Fullstack/React):  
  https://www.udemy.com/share/10bKHN3@Pap6ucUtFV18qcPM4iP0orZxTYgeyyHuOgH1TKumBmsW4-0DyPwlBFU5KWgz2I8O9A==/

- Curso Udemy (NestJS):  
  https://www.udemy.com/share/1097Bw3@n_8_m6tMTQ_GdYlQgjBUI729KU0xkSjPEYjIX6juHIfWSIwlYGWuxenZ6jr5wUDmzw==/

- Vídeo YouTube — NestJS + TypeORM:  
  https://youtu.be/dFFpjjD9cj4?si=6fnZYvSadbbCOAFU

- Vídeo YouTube — React + Auth/Forms:  
  https://youtu.be/ju983eSUw-8?si=_T0zKDrIVFcC2jT_

---

## 🧩 Requisitos do Desafio

### **Requisitos Funcionais**
- Cadastrar contato com nome, e-mail e telefone  
- Criptografar e-mail e telefone  
- Listar contatos cadastrados  
- Visualizar e descriptografar dados  
- Editar e remover contatos existentes  

### **Requisitos Não Funcionais**
- Código totalmente em **TypeScript**  
- Frontend responsivo  
- Testes automatizados (unitários e/ou integração)  
- Comunicação entre frontend e backend via API REST

---

## 📂 Estrutura do Projeto

### **Frontend**
- Página de criação de contato  
- Página de listagem  
- Página de visualização com dados descriptografados  
- Página de edição  
- Comunicação com o backend usando Fetch API  
- Responsividade aplicada

### **Backend**
- **POST /contacts** → cria contato  
- **GET /contacts** → lista contatos  
- **GET /contacts/:id** → exibe contato descriptografado  
- **PUT /contacts/:id** → edita contato  
- **DELETE /contacts/:id** → remove contato  
- Middleware/Service para criptografia  
- Validações com `class-validator`  

---

## 🎨 Protótipo
O design pode ser visualizado no Figma neste link:

🔗 **https://www.figma.com/design/HguK6UApzEaA4aCegPm2kh/Gerenciador-de-contatos-(Community)?node-id=3-376&node-type=canvas**

---

## 🛠️ Como executar o projeto

### **1. Clone o repositório**
```bash
git clone https://github.com/SEU-USUARIO/NOME-DO-REPO.git
```

### **2. Instale as dependências**

#### Frontend
```bash
cd guard-front
npm install
npm run dev
```

#### Backend
```bash
cd guard-api
npm install
npm run start:dev
```

### **3. Configure o banco de dados**
Crie o arquivo `.env` contendo:

```
DATABASE_URL=postgres://user:password@localhost:5432/guard
```

### **4. Rode as migrações**
```bash
npx prisma migrate dev
```

---

## ✔️ Status do Projeto
🔄 Em desenvolvimento — novas melhorias e testes sendo adicionados.
