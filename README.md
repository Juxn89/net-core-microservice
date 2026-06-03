# LibraryMS — Microservices in the Wild

[![.NET](https://img.shields.io/badge/.NET-8.0-512bd4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Angular](https://img.shields.io/badge/Angular-19.2-dd0031?logo=angular&logoColor=white)](https://angular.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-4db33d?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-2019-cc2927?logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/en-us/sql-server)
[![Ocelot](https://img.shields.io/badge/Ocelot-24.0-0075ca?logo=dotnet&logoColor=white)](https://github.com/ThreeMammals/Ocelot)
[![Docker](https://img.shields.io/badge/Docker-Compose-1d76db?logo=docker&logoColor=white)](https://www.docker.com/)

> A library management system that puts microservices design patterns into practice —
> JWT auth, API gateway routing, dual-database strategy, and a full Angular SPA.

---

## What lives here

Three independent .NET 8 services and an Angular 19 frontend that together let you browse, create, and manage books and authors. Each service owns its own database and communicates exclusively through the gateway — no service talks directly to another.

```
┌─────────────────────────────────────────────────────┐
│            Angular 19 SPA  :4200                    │
│    (Material UI · RxJS · SSR via Express)           │
└─────────────────────────┬───────────────────────────┘
                          │  HTTP + JWT Bearer
                          ▼
┌─────────────────────────────────────────────────────┐
│           API Gateway  :5000  (Ocelot 24)           │
│    validates JWT · routes · applies CORS policy     │
└──────────────┬──────────────────────┬───────────────┘
               │                      │
               ▼                      ▼
┌──────────────────────┐   ┌──────────────────────────┐
│  Security Service    │   │   Library Service         │
│       :5069          │   │        :5159              │
│                      │   │                           │
│  ASP.NET Identity    │   │  MongoDB.Driver 3.3       │
│  EF Core 9 · CQRS   │   │  Books · Authors · Pagination│
│  MediatR · AutoMapper│   │                           │
│  FluentValidation    │   │  pre-seeded:              │
│  JWT generation      │   │  16 authors · 15 books    │
└──────────┬───────────┘   └───────────┬───────────────┘
           │                           │
           ▼                           ▼
  ┌────────────────┐         ┌─────────────────────┐
  │  SQL Server    │         │      MongoDB         │
  │  :14330        │         │      :27017          │
  │  SecurityDB    │         │      LibraryDB       │
  └────────────────┘         └─────────────────────┘
```

---

## Services at a glance

| Service | Port | Database | Responsibility |
|---------|------|----------|----------------|
| `Services.API.Gateway` | 5000 | — | Route requests, validate JWT tokens |
| `Services.API.Security` | 5069 | SQL Server — SecurityDB | Register, login, issue JWT tokens |
| `Services.API.Library` | 5159 | MongoDB — LibraryDB | CRUD and pagination for books & authors |
| Angular Client | 4200 | — | SPA frontend with Material Design |

---

## API endpoints

All routes go through the gateway on port **5000**.

### Public (no token required)

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/user/register` | Create a new account |
| `POST` | `/user/login` | Authenticate and receive a JWT |
| `GET` | `/user` | Get current user profile |

### Protected (JWT Bearer required)

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/authors` | List all authors |
| `POST` | `/authors` | Create an author |
| `GET` | `/authors/{id}` | Get author by ID |
| `PUT` | `/authors/{id}` | Update author |
| `DELETE` | `/authors/{id}` | Remove author |
| `POST` | `/authors/pagination` | Paginated authors with name filter |
| `POST` | `/authors/pagination-filter` | Paginated authors with advanced filter |
| `GET` | `/books` | List all books (includes author details) |
| `POST` | `/books` | Create a book |
| `GET` | `/books/{id}` | Get book by ID |
| `POST` | `/books/pagination` | Paginated books |

Interactive docs are available at each service's `/swagger` endpoint while running locally.

---

## Tech stack

| Layer | Technology | Version |
|-------|-----------|---------|
| API Gateway | Ocelot | 24.0.0 |
| Auth Service | ASP.NET Core + EF Core | 8.0 / 9.0.6 |
| Auth patterns | MediatR · AutoMapper · FluentValidation | 13 · 15 · 12 |
| Auth tokens | JWT Bearer (HMAC-SHA256, 7-day expiry) | 8.0.18 |
| Library Service | ASP.NET Core + MongoDB.Driver | 8.0 / 3.3.0 |
| Frontend | Angular + Angular Material | 19.2.0 / 19.2.17 |
| Frontend state | RxJS | 7.8.0 |
| Auth DB | SQL Server 2019 (via Docker) | latest |
| Library DB | MongoDB 6 (via Docker) | latest |
| Containers | Docker Compose | 3.8 |

---

## Pre-loaded data

The MongoDB container seeds itself on first start using `init-mongo.js`:

- **16 authors** — Gabriel García Márquez, Carlos Ruiz Zafón, and 14 more classic literary figures
- **15 books** — tied to those authors with titles, descriptions, prices, and publish dates

The SQL Server database is created and migrated by EF Core on the first run of the Security service.

---

## Quick start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js v18+](https://nodejs.org/) and Angular CLI (`npm install -g @angular/cli`)

### 1 — Start the databases

```bash
docker-compose up -d
```

This starts MongoDB on `:27017` and SQL Server on `:14330`, both with persistent volumes.

### 2 — Set the JWT secret

The Security service and the Gateway both need a signing key. Set it via user-secrets for each:

```bash
# API Gateway
dotnet user-secrets set "Jwt:Key" "YourSuperSecretKey" \
  --project Microservices/Services.API.Gateway/Services.API.Gateway.csproj

# Security Service
dotnet user-secrets set "Jwt:Key" "YourSuperSecretKey" \
  --project Microservices/Services.API.Security/Services.API.Security.csproj
```

Use the same key in both. The Library service reads it from the gateway — no secret needed there.

### 3 — Run the backend services

Open three terminals (or use `dotnet run` in the background):

```bash
# Terminal 1 — Gateway
dotnet run --project Microservices/Services.API.Gateway/Services.API.Gateway.csproj

# Terminal 2 — Security (also runs EF Core migrations on startup)
dotnet run --project Microservices/Services.API.Security/Services.API.Security.csproj

# Terminal 3 — Library
dotnet run --project Microservices/Services.API.Library/Services.API.Library.csproj
```

### 4 — Run the frontend

```bash
cd client
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200). Register an account, log in, and start browsing.

---

## Project structure

```
net-core-microservice/
├── docker-compose.yml               # MongoDB + SQL Server
├── init-mongo.js                    # Authors & books seed data
│
├── Microservices/
│   ├── Microservices.sln
│   │
│   ├── Services.API.Gateway/        # Ocelot gateway
│   │   ├── ocelot.json              # All route definitions
│   │   └── Program.cs               # JWT validation + CORS setup
│   │
│   ├── Services.API.Security/       # Auth microservice
│   │   ├── Controllers/
│   │   │   └── UserController.cs    # register · login · current-user
│   │   └── Core/
│   │       ├── Application/         # MediatR commands (Register, Login, CurrentUser)
│   │       ├── Entities/User.cs     # Extends ASP.NET IdentityUser
│   │       ├── JWT/                 # Token generation & user session extraction
│   │       └── Persistence/         # EF Core context + migrations
│   │
│   └── Services.API.Library/        # Books & authors microservice
│       ├── Controllers/
│       │   ├── AuthorsController.cs # Full CRUD + pagination
│       │   └── BooksController.cs   # Full CRUD + pagination with author join
│       └── Core/
│           ├── Entities/            # Books, AuthorEntity, Document base
│           ├── ContextMongoDB/      # MongoDB connection context
│           └── Repository/          # Generic MongoDB repository
│
└── client/                          # Angular 19 SPA
    └── src/app/
        ├── security/                # Login · register · auth service
        ├── books/                   # Book list with dialog-based add/edit
        ├── book/                    # Book detail page
        ├── authors/                 # Author list
        ├── navigation/              # App shell / nav bar
        └── interceptors/            # Attaches JWT to every outgoing request
```

---

## Design decisions

**SQL Server for authentication, MongoDB for the library.**
User accounts and credentials benefit from the ACID guarantees and relational schema enforcement that SQL Server provides. Books and authors are document-shaped data with variable fields and no joins required at the database level — MongoDB is a natural fit.

**JWT validation at the gateway, not in individual services.**
Centralizing auth at the Ocelot layer means the Library service stays completely stateless and free of auth logic. Downstream services trust that the gateway has already validated the token.

**MediatR + CQRS only in the Security service.**
The Library service is CRUD-heavy with no complex business rules, so a repository pattern is enough. The Security service has more distinct operations (register vs. login vs. session retrieval) that benefit from explicit command and handler separation.

---

## Based on

[Microservicios con ASP.NET Core, Angular, MongoDB y Docker](https://www.udemy.com/course/microservicios-aspnet-core-5-angular-mongodb/?couponCode=MT150725A) — Udemy course.

---

## GitHub description and labels

**Repository description** (paste in Settings → General):
```
Library management system built with .NET 8 microservices, Ocelot API Gateway, Angular 19, MongoDB and SQL Server.
```

**Labels** (create via Issues → Labels or `gh label create`):

| Label | Hex color | Description |
|-------|-----------|-------------|
| `microservices` | `#0075ca` | Microservices architecture patterns |
| `dotnet` | `#512bd4` | .NET / ASP.NET Core related |
| `angular` | `#dd0031` | Angular frontend |
| `mongodb` | `#4db33d` | MongoDB related |
| `api-gateway` | `#e4e669` | Ocelot API Gateway |
| `jwt-auth` | `#d93f0b` | JWT authentication & security |
| `docker` | `#1d76db` | Docker & containerization |
| `educational` | `#cfd3d7` | Educational / course project |

Create them all at once with the GitHub CLI:

```bash
gh label create microservices --color 0075ca --description "Microservices architecture patterns"
gh label create dotnet        --color 512bd4 --description ".NET / ASP.NET Core related"
gh label create angular       --color dd0031 --description "Angular frontend"
gh label create mongodb       --color 4db33d --description "MongoDB related"
gh label create api-gateway   --color e4e669 --description "Ocelot API Gateway"
gh label create jwt-auth      --color d93f0b --description "JWT authentication & security"
gh label create docker        --color 1d76db --description "Docker & containerization"
gh label create educational   --color cfd3d7 --description "Educational / course project"
```
