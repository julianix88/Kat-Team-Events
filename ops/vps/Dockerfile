FROM php:8.3.36-apache-bookworm
RUN apt-get update && apt-get install -y --no-install-recommends libonig-dev msmtp ca-certificates \
    && docker-php-ext-install mbstring \
    && rm -rf /var/lib/apt/lists/* \
    && a2enmod headers rewrite
COPY production/ /var/www/html/
# The live Linux host has two byte-identical image trees. Windows stores one.
RUN test -d /var/www/html/images && ln -s images /var/www/html/Images
COPY ops/vps/site.conf /etc/apache2/conf-available/kat-site.conf
COPY ops/vps/php.ini /usr/local/etc/php/conf.d/kat.ini
RUN a2enconf kat-site
HEALTHCHECK --interval=30s --timeout=5s CMD php -r '$s=@fsockopen("127.0.0.1",80);exit($s?0:1);'
