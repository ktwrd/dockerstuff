FROM node:16-buster-slim

RUN apt-get update &&
	apt-get install -y git &&
	apt-get install -y wget gnupg &&
	dpkg --add-architecture i386 &&
	wget -nc https://dl.winehq.org/wine-builds/winehq.key &&
	apt-ket add wilehq.key &&
	echo "deb https://dl.winehq.org/wine-builds/debian/ buster main" >> /etc/apt/sources.list &&
	apt-get update &&
	apt-get install -y --install-recommends winehq-stable &&
	apt-get install -y python3 python3-pip build-essential libopenjp2-tools mono-devel bsdtar rpm gcc-multilib g++-multilib &&
	npm install -g grunt grunt-shell &&

CMD [ "node" ]
