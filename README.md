# Admin App

Web app to administer the product catalog

##Configuration

```
export SERVICE_PORT=5010
export PUBLISH_SERVICE=<ip>:<port>
export SERVICE_VERSION=0.0.3
```

## Register external services
[Musicbrainz](http://musicbrainz.org)

```
curl -X PUT \
http://46.101.191.124:8500/v1/catalog/register \
-d '{
  "Datacenter": "dc1",
  "Node": "musicbrainz",
  "Address": "72.29.166.157",
  "Service": {
    "Service": "musicbrainz",
    "Port": 80
  }
}'
```

##Build container

```
docker build -t admin-app .
```

##Run locally

```
docker run -it -p $SERVICE_PORT:$SERVICE_PORT admin-app
```

##Publish into private registry

```
docker tag admin-app:latest $PUBLISH_SERVICE/admin-app:$SERVICE_VERSION
docker push $PUBLISH_SERVICE/admin-app:$SERVICE_VERSION
```
