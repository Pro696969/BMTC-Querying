FROM mysql:8.0

COPY ./main.sql ./docker-entrypoint-initdb.d/01-main.sql
COPY ./dump-routes.sql ./docker-entrypoint-initdb.d/02-dump-routes.sql
COPY ./dump-stops.sql ./docker-entrypoint-initdb.d/03-dump-stops.sql
COPY ./functionality.sql ./docker-entrypoint-initdb.d/04-functionality.sql


EXPOSE 3306

CMD [ "mysqld" ]