#!/usr/bin/env bash
set -e

cd $(dirname $0)

BASE_NAME=$(cat ../docker-image-base-name.txt)
HERE=$PWD

#-----------------------------------------------------------------------------------------------------------------------
cd ..
#if [[ ! -e dist ]] ; then
  yarn
  yarn build:prod
#fi

#-----------------------------------------------------------------------------------------------------------------------
DOCKERIZE_VERSION=v0.6.1
DOCKERIZE_ARCH=dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz

mkdir -p docker/downloads/dockerize
cd docker/downloads/dockerize

if [[ ! -x dockerize ]] ; then
  DOWN_URL1=http://192.168.11.23/var/soft/dockerize/dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz
  DOWN_URL2=https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz
  if ! wget -O ${DOCKERIZE_ARCH} ${DOWN_URL1} ; then
    wget -O ${DOCKERIZE_ARCH} ${DOWN_URL2}
  fi
  tar xvf ${DOCKERIZE_ARCH}
  rm -f ${DOCKERIZE_ARCH}
  [ -e dockerize ]
  chmod +x dockerize
  [ -x dockerize ]
fi

cd ${HERE}/../docker
rm -rf downloads/arch/
mkdir downloads/arch/
cp run.sh healthcheck.sh nginx.conf.template.txt downloads/dockerize/dockerize downloads/arch/
mkdir -p downloads/arch/public/
cp -r ${HERE}/../dist/* downloads/arch/public/

chmod +x downloads/arch/run.sh
chmod +x downloads/arch/healthcheck.sh
chmod +x downloads/arch/dockerize

rm -f   downloads/arch.zip
cd downloads/arch/
zip -q -r ../arch.zip *
