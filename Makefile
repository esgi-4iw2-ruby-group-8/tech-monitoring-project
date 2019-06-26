up:
	docker-compose up -d --build

down:
	docker-compose down

run:
	docker-compose up --build

install:
	docker exec -it frontend yarn install
	docker exec -it backend bundle install

create-db:
	docker-compose run --rm backend rake db:create

migrate-db:
	docker-compose run --rm backend rake db:migrate

drop-db:
	docker-compose run --rm backend rake db:drop

bash:
	docker exec -it backend bash

clean-front:
	cd front && \
	rm yarn.lock && \
	rm -rf node_modules
