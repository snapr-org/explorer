FROM phusion/baseimage:master-amd64

ARG VERSION=v3.0.0-b300ecf

RUN apt-get update && apt-get install wget -y

WORKDIR /usr/local/bin

RUN wget https://github.com/snapr-org/snapr/releases/download/${VERSION}/snapr_${VERSION}-x86_64-linux-gnu

RUN chmod +x snapr_${VERSION}-x86_64-linux-gnu

WORKDIR /data

RUN wget https://github.com/snapr-org/snapr/releases/download/${VERSION}/chain_spec_testnet.json

EXPOSE 30333 9933 9944

VOLUME ["/data"]

ENTRYPOINT ["snapr_${VERSION}-x86_64-linux-gnu"]
