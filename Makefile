.PHONY: build
build: ## Build the development docker image.
	docker compose -f docker/docker-compose.yml build

.PHONY: start
start: ## Start the development docker container.
	docker compose -f docker/docker-compose.yml up -d

.PHONY: logs
logs: ## Stop the docker container.
	docker compose -f docker/docker-compose.yml logs
	
.PHONY: stop
stop: ## Stop the docker container.
	docker compose -f docker/docker-compose.yml down
