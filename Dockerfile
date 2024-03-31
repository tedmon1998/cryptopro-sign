# Базовый образ с КриптоПро
FROM debian:buster-slim as cryptopro-generic

# Устанавливаем timezone и основные переменные окружения
ENV TZ="Europe/Moscow" \
    docker="1" \
    LICENSE="" \
    ESIA_ENVIRONMENT='test' \
    CERTIFICATE_PIN='testcer'

# Устанавливаем переменные окружения для файлов ЕСИА
ENV ESIA_CORE_CERT_FILE "/cryptopro/esia/esia_${ESIA_ENVIRONMENT}.cer" \
    ESIA_PUB_KEY_FILE "/cryptopro/esia/esia_${ESIA_ENVIRONMENT}.pub"

# Настройка временной зоны
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

# Добавляем файлы для установки КриптоПро
ADD cryptopro/install /tmp/src

# Устанавливаем зависимости и CryptoPro
RUN apt-get update && \
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
    ln -s /opt/cprocsp/sbin/amd64/cpconfig && \
    rm -rf /tmp/src

# Добавляем скрипты, сертификаты и файлы ЕСИА
ADD cryptopro/scripts /cryptopro/scripts
ADD cryptopro/certificates /cryptopro/certificates
ADD cryptopro/esia /cryptopro/esia

# Настраиваем КриптоПро в новом слое
FROM cryptopro-generic as configured-cryptopro

# Устанавливаем лицензию, если она указана
RUN ./cryptopro/scripts/setup_license ${LICENSE}

# Устанавливаем корневой сертификат есиа
RUN ./cryptopro/scripts/setup_root ${ESIA_CORE_CERT_FILE}

# Устанавливаем сертификат пользователя
RUN ./cryptopro/scripts/setup_my_certificate /cryptopro/certificates/certificate_bundle.zip ${CERTIFICATE_PIN}

# Настраиваем окружение Node.js и приложение
FROM node:14-buster-slim as nodejs-env

# Копируем настроенный КриптоПро в текущий слой
COPY --from=configured-cryptopro / / 

# Устанавливаем Node.js зависимости и собираем приложение
COPY package*.json tsconfig*.json versions.json nest-cli.json ./
COPY src ./src

RUN npm ci -q && \
    npm run build && \
    npm prune --production

# Открываем порт и задаем команду запуска
EXPOSE 3037
CMD ["npm", "start"]
