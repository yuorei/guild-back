build:
	docker compose build

up:
	docker compose up

up_d:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down

rm:
	docker compose rm

db:
	docker compose exec postgres bash

ps:
	docker compose ps

create_table:
	npx prisma migrate dev --name init

prisma:
	prisma generate