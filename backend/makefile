run:
	./vendor/bin/sail up
composer:
	docker run --rm -it \
		   -u "$(id -u):$(id -g)" \
		   -v "$(PWD):/var/www/html" \
		   -w /var/www/html \
		   laravelsail/php84-composer:latest \
		   /bin/bash
composer-install:
	docker run --rm \
		   -u "$(id -u):$(id -g)" \
		   -v "$(PWD):/var/www/html" \
		   -w /var/www/html \
		   laravelsail/php84-composer:latest \
		   composer install --ignore-platform-reqs
migrate:
	./vendor/bin/sail up -d
	./vendor/bin/sail artisan migrate
migrate-fresh-seed:
	./vendor/bin/sail up -d
	./vendor/bin/sail artisan migrate:fresh --seed

# Call these with the name="" as parameter
controller:
	./vendor/bin/sail artisan make:controller $(name)
model:
	./vendor/bin/sail artisan make:model $(name)
seeder:
	./vendor/bin/sail artisan make:seeder $(name)
# model="" is the name of the model to create the factory
factory:
	./vendor/bin/sail artisan make:factory $(name) --model=$(model)
# table="" is the name of the table
migration:
	./vendor/bin/sail artisan make:migration $(name) --create=$(table)
