# Imobiliária Dockerizada — Front, API fake e Backend Python

Este repositório contém um exemplo de aplicação para gerenciamento de imóveis. O projeto reúne:

- um frontend estático (HTML/CSS/JS) servido por Nginx;
- uma API fake baseada em `json-server` (dados em `api/db.json`);
- um conjunto de scripts Python (CLI) no diretório `backend/`.

Tudo orquestrado com Docker Compose para facilitar o desenvolvimento e testes locais.

## Principais funcionalidades

- Listagem, criação, edição e exclusão de imóveis (CRUD) via frontend.
- Registro de vendas (persistido no `json-server`).
- Frontend responsivo e estilizado (CSS moderno, botões unificados e toasts).
- Orquestração via Docker Compose (serviços: `front`, `db`, `app`).
- `Makefile` com atalhos úteis para desenvolvimento.

## Stack e ferramentas

- Frontend: HTML5, CSS, JavaScript (vanilla), servido por Nginx em um container.
- Fake API: json-server (dados em `api/db.json`).
- Backend: scripts Python (CLI) em `backend/`.
- Orquestração: Docker, Docker Compose.

## Pré-requisitos

- Docker
- Docker Compose
- Make (opcional)

## Como rodar (quickstart)

1. Subir todos os serviços (build + up):

```bash
# usando Makefile (recomendado)
make up

# ou via docker-compose diretamente
docker-compose up -d --build
```

2. Acessar:

- Frontend (UI): [http://localhost:8080](http://localhost:8080)
- Fake API (json-server): [http://localhost:3030](http://localhost:3030) (endpoints: `/imoveis`, `/vendas`)

## Comandos úteis

- Parar e remover containers:

```bash
make down
# ou
docker-compose down
```

- Ver logs:

```bash
make logs
make logs-front   # logs do front
make logs-db      # logs do json-server
```

- Rebuild de apenas um serviço (ex.: front):

```bash
docker-compose build front && docker-compose up -d front
```

## Configurações e detalhes importantes

- O `json-server` usa o arquivo `api/db.json` como base de dados. Alterações via API são persistidas nesse arquivo mapeado em volume.
- Para evitar problemas em Apple Silicon, o `docker-compose.yaml` pode incluir `platform: linux/amd64` para o serviço do json-server.
- O backend Python permanece como CLI (não convertido para API REST). Se desejar que o frontend fale com o backend em vez do json-server, é necessário transformar o backend em um microserviço HTTP (ex.: Flask/FastAPI).

## Estrutura do repositório (resumo)

- `frontend/` — HTML/CSS/JS, `Dockerfile` do Nginx, assets servidos pelo container `front`.
- `api/` — `db.json` para o json-server.
- `backend/` — código Python (scripts CLI) e `Dockerfile`.
- `docker-compose.yaml` — orquestra serviços (`app`/`db`/`front`).
- `Makefile` — atalhos para desenvolvimento.

## Possíveis melhorias

- Configurar Nginx para servir como proxy `/api` → json-server (evita hardcode de host:porta no frontend).
- Converter `backend` para uma API HTTP (Flask/FastAPI) e encaminhar chamadas do front para o backend.
- Adicionar testes automatizados e CI (GitHub Actions) que façam build e smoke tests dos serviços.
- Melhorias UX: validações de formulário, fila de toasts mais robusta, carregamento (spinners) e estado offline mínimo.

## Contribuição

- Abra issues para bugs e sugestões.
- Para contribuições por PR: crie uma branch a partir de `main`, adicione testes/descrições relevantes e envie um pull request com explicação do que mudou.

## Licença

- (Escolha a licença desejada, por exemplo MIT) — adicione um arquivo `LICENSE` com a licença escolhida.

