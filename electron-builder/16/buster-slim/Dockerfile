FROM node:16-buster-slim

RUN apt update \
	&& apt install -y git \
	&& apt install -y wget gnupg \
	&& dpkg --add-architecture i386 \
	&& wget -nc https://dl.winehq.org/wine-builds/winehq.key \
	&& apt-key add winehq.key \
	&& echo "deb https://dl.winehq.org/wine-builds/debian/ buster main" >> /etc/apt/sources.list \
	&& apt update \
	&& apt install -y --install-recommends winehq-stable \
	&& apt install -y python3 python3-pip build-essential libopenjp2-tools mono-devel bsdtar rpm gcc-multilib g++-multilib \
	&& npm install -g grunt grunt-shell

CMD [ "node" ]
