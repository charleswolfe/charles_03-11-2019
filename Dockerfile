FROM php:7

RUN apt-get update -y && apt-get install -y openssl zip unzip git sqlite3 libsqlite3-dev \
    && docker-php-ext-install  pdo_mysql opcache bcmath  mbstring








RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app
COPY . /app

RUN touch /app/storage/db/database.sqlite
RUN /usr/bin/sqlite3 /app/storage/db/database.sqlite
RUN composer install

RUN php artisan migrate

CMD php artisan serve --host=0.0.0.0 --port=8181


EXPOSE 8181