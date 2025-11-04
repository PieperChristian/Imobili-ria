.PHONY: up down build logs logs-front logs-db ps restart

up:
	@echo "Subindo serviços (foreground em background)..."
	@docker-compose up -d --build

down:
	@echo "Parando e removendo containers..."
	@docker-compose down

build:
	@echo "Build das imagens..."
	@docker-compose build

logs:
	@echo "Exibindo logs de todos os serviços (Ctrl+C para sair)..."
	@docker-compose logs -f

logs-front:
	@echo "Exibindo logs do serviço front..."
	@docker-compose logs -f front

logs-db:
	@echo "Exibindo logs do serviço db (json-server)..."
	@docker-compose logs -f db

ps:
	@echo "Containers em execução:"
	@docker ps

restart:
	@echo "Reiniciando serviços..."
	@docker-compose restart
