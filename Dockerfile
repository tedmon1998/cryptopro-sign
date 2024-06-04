# Базовый образ с КриптоПро
# FROM debian:stretch-slim as cryptopro-generic
# FROM node:stretch-slim as cryptopro-generic
FROM debian:buster-slim as cryptopro-generic


# Устанавливаем timezone
ENV TZ="Europe/Moscow" \
    docker="1"

ARG LICENSE='40400-00000-UKAC2-00QP8-MT29G'
ENV LICENSE ${LICENSE}

# prod или test
ARG ESIA_ENVIRONMENT='test'
ENV ESIA_CORE_CERT_FILE "/cryptopro/esia/esia_${ESIA_ENVIRONMENT}.cer"
ENV ESIA_PUB_KEY_FILE "/cryptopro/esia/esia_${ESIA_ENVIRONMENT}.pub"


ARG CERTIFICATE_PIN='1234567890'
ENV CERTIFICATE_PIN ${CERTIFICATE_PIN}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

WORKDIR /app

ADD cryptopro/install /tmp/src
# Устанавливаем зависимости и CryptoPro
ADD ./cryptopro /cryptopro

RUN apt-get update && \
    apt-get install -y dos2unix && \
    apt-get install -y zip && \
    dos2unix /cryptopro/scripts/setup_root && \
    dos2unix /cryptopro/scripts/setup_license && \
    dos2unix /cryptopro/scripts/setup_my_certificate && \
    dos2unix /cryptopro/scripts/lib/functions.sh && \
    apt-get install -y --no-install-recommends lsb-base expect libboost-dev unzip g++ curl && \
    cd /tmp/src && \
    tar -xf linux-amd64_deb.tgz && \
    linux-amd64_deb/install.sh && \
    cd /bin && \
    ln -s /opt/cprocsp/bin/amd64/certmgr && \
    ln -s /opt/cprocsp/bin/amd64/cpverify && \
    ln -s /opt/cprocsp/bin/amd64/cryptcp && \
    ln -s /opt/cprocsp/bin/amd64/csptest && \
    ln -s /opt/cprocsp/bin/amd64/csptestf && \
    ln -s /opt/cprocsp/bin/amd64/der2xer && \
    ln -s /opt/cprocsp/bin/amd64/inittst && \
    ln -s /opt/cprocsp/bin/amd64/wipefile && \
    ln -s /opt/cprocsp/sbin/amd64/cpconfig
# rm -rf /tmp/src

FROM cryptopro-generic as configured-cryptopro

# устанавливаем лицензию, если она указана
RUN /cryptopro/scripts/setup_license ${LICENSE}

# Устанавливаем корневой сертификат есиа
RUN /cryptopro/scripts/setup_root ${ESIA_CORE_CERT_FILE}

# Устанавливаем сертификат пользователя
# RUN /cryptopro/scripts/setup_my_certificate /cryptopro/certificates/certificate_bundle.zip ${CERTIFICATE_PIN}
RUN expect -c ' \
    spawn /cryptopro/scripts/setup_my_certificate /cryptopro/certificates/certificate_bundle.zip; \
    expect "password:"; \
    send -- "$env(CERTIFICATE_PIN)\r"; \
    expect eof'

# Настраиваем окружение Node.js и приложение
FROM node:14-buster-slim as nodejs-env

# Копируем настроенный КриптоПро в текущий слой
COPY --from=configured-cryptopro / / 

# Устанавливаем Node.js зависимости и собираем приложение
COPY ./dist ./app
WORKDIR /app
# Открываем порт и задаем команду запуска
EXPOSE 3037
RUN npm install
CMD ["npm", "start"]
# CMD ["tail", "-f", "/dev/null"]