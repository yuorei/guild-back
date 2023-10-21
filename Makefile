build:
	docker compose build

up:
	docker compose up

stop:
	docker compose stop

down:
	docker compose down

rm:
	docker compose rm

db:
	docker compose exec postgres bash

create_table:
	npx prisma migrate dev --name init

prisma:
	prisma generate