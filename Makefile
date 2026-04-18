up:
	export WWWGROUP=$(id -g) WWWUSER=$(id -u) && docker-compose up
down:
	docker compose down
build:
	export WWWGROUP=$(id -g) WWWUSER=$(id -u) && docker-compose up --build