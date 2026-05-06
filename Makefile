up:
	export WWWGROUP=$$(id -g) WWWUSER=$$(id -u) && docker-compose up
migrate-fresh-seed:
	./backend/vendor/bin/sail artisan migrate:fresh --seed --force
down:
	docker compose down
build:
	export WWWGROUP=$$(id -g) WWWUSER=$$(id -u) && docker-compose up --build