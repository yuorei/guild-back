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

db_reset:
	docker compose down -v
	docker compose up -d
	rm -r ./prisma/migrations
	npx prisma migrate dev --name init
	npx prisma generate