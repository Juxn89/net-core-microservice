# Microservices with ASP.NET Core | Angular | MongoDB | Docker 🚀

[![.NET](https://img.shields.io/badge/.NET-8.0-blue?logo=dotnet)](https://dotnet.microsoft.com/)
[![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)](https://angular.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-2019-blue?logo=microsoftsqlserver)](https://www.microsoft.com/en-us/sql-server)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://www.docker.com/)
[![Udemy Course](https://img.shields.io/badge/Udemy-Course-orange?logo=udemy)](https://www.udemy.com/course/microservicios-aspnet-core-5-angular-mongodb/?couponCode=MT150725A)

---

## 📚 About This Project

This repository is part of the [Udemy course](https://www.udemy.com/course/microservicios-aspnet-core-5-angular-mongodb/?couponCode=MT150725A) on building microservices with ASP.NET Core, Angular, MongoDB, and Docker.  
It demonstrates a modern microservices architecture with:

- **API Gateway**
- **Security Microservice** (Authentication & Authorization, SQL Server)
- **Library Microservice** (Book management, MongoDB)
- **Angular Client** (Frontend SPA)

---

## 🏗️ Architecture

![Microservices Architecture](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*p86HNk_uPGe2lz11NTDKmg.png)

---

## 🛠️ Technologies Used

- **Backend:** ASP.NET Core 8, MediatR, AutoMapper, FluentValidation, JWT, Entity Framework Core
- **Frontend:** Angular 19, Angular Material, RxJS, Flex Layout
- **Databases:** SQL Server (Security), MongoDB (Library)
- **API Gateway:** Ocelot (or your implementation)
- **Containerization:** Docker, Docker Compose

---

## ⚡ Quick Start

### 1. Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) 🐳
- [.NET 8 SDK](https://dotnet.microsoft.com/download) 💻
- [Node.js (v18+)](https://nodejs.org/) & [Angular CLI](https://angular.io/cli) 🌐

### 2. Clone the Repository

### 3. Configure User Secrets for JWT Authentication 🔑

Some backend microservices require a secret key for JWT authentication.  
You must set the `Jwt:Key` secret before running these services locally.

For each microservice that requires it (e.g., **Security**, **Gateway**), run:

```bash
dotnet user-secrets set "Jwt:Key" "YourSuperSecretKey" --project <PathToProjectFile>
```

Replace `<PathToProjectFile>` with the path to the `.csproj` file of the microservice.

### 4. Navigate to Client Folder

Run the following command in your terminal:

```bash
cd client
```

### 5. Install Angular Dependencies

Ensure you're in the `client` directory and run:

```bash
npm install
```

### 6. Update Environment Variables

Create a `.env` file in the `client` directory based on the provided `.env.example`. Update values as necessary.

### 7. Run the Application

To start the Angular frontend, use:

```bash
ng serve
```

Visit [http://localhost:4200](http://localhost:4200) in your browser.

---

## 🌐 Backend Endpoints

- **Security Microservice:** Handles authentication, user management, JWT issuance.
- **Library Microservice:** Manages books and related data.
- **API Gateway:** Routes requests to the appropriate microservice.

> _For detailed API endpoints, refer to the Swagger UI at each service's `/swagger` endpoint._

---

## 📦 Angular Client Dependencies

Key dependencies from `package.json`:

- `@angular/core`, `@angular/material`, `@angular/flex-layout`, `rxjs`, `express`, etc.

## 📖 Further Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [ASP.NET Core Docs](https://learn.microsoft.com/en-us/aspnet/core/)
- [Docker Documentation](https://docs.docker.com/)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 🏆 License

This project is for educational purposes as part of the Udemy course.

---

_Enjoy building microservices! 🚀_

> Replace `"YourSuperSecretKey"` with a strong, unique value.

_Repeat these steps for any other microservice (such as the API Gateway) that uses JWT authentication and expects a `Jwt:Key` in its configuration._
