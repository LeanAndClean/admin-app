FROM microsoft/aspnet:1.0.0-beta4

RUN apt-get update -y && apt-get install --no-install-recommends -y -q \
    curl \
    python \
    build-essential \
    git \
    ca-certificates

RUN mkdir /nodejs && \
    curl http://nodejs.org/dist/v0.10.33/node-v0.10.33-linux-x64.tar.gz | \
    tar xvzf - -C /nodejs --strip-components=1

ENV PATH $PATH:/nodejs/bin

RUN npm install -g grunt-cli bower

ADD . /app

WORKDIR /app

RUN dnu restore

ENV SERVICE_PORT=5010

EXPOSE 5010

ENTRYPOINT sleep 99999999999 | dnx . Microsoft.AspNet.Hosting --server Kestrel --server.urls http://localhost:$SERVICE_PORT
