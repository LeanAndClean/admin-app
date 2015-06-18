# Admin App

Web app to administer the product catalog

## Configuration parameters

```
SERVICE_PORT=5010
```

## Register external services
[Musicbrainz](http://musicbrainz.org)

```
curl -X PUT \
http://46.101.191.124:8500/v1/catalog/register \
-d '{
  "Datacenter": "dc1",
  "Node": "node1",
  "Address": "72.29.166.157",
  "Service": {
    "Service": "musicbrainz",
    "Port": 80
  }
}'
```

## Build container

```
docker build -t admin-app .
```

## Run container locally

```
docker run -t -d -p 5010:5010 admin-app
```

## Push container into private registry

```
docker tag admin-app:latest 46.101.191.124:5000/admin-app:0.0.3
docker push 46.101.191.124:5000/admin-app:0.0.3
```

## Deploy container from Shipyard

### OSX/Linux

```
curl -X POST \
-H 'Content-Type: application/json' \
-H 'X-Service-Key: pdE4.JVg43HyxCEMWvsFvu6bdFV7LwA7YPii' \
http://46.101.191.124:8080/api/containers?pull=true \
-d '{  
  "name": "46.101.191.124:5000/admin-app:0.0.3",
  "cpus": 0.1,
  "memory": 64,
  "environment": {
    "SERVICE_CHECK_SCRIPT": "curl -s http://46.101.191.124:5010/healthcheck",
    "SERVICE_PORT": "5010"
  },
  "hostname": "",
  "domain": "",
  "type": "service",
  "network_mode": "bridge",
  "links": {},
  "volumes": [],
  "bind_ports": [  
    {  
       "proto": "tcp",
       "host_ip": null,
       "port": 5010,
       "container_port": 5010
    }
  ],
  "labels": [],
  "publish": false,
  "privileged": false,
  "restart_policy": {  
    "name": "no"
  }
}'
```

### Windows

```
$Uri = "http://46.101.191.124:8080/api/containers?pull=true"

$Headers = @{
  "X-Service-Key" = "pdE4.JVg43HyxCEMWvsFvu6bdFV7LwA7YPii"
  "Content-Type" = "application/json"
}

$Body = @"
{  
  "name": "46.101.191.124:5000/admin-app:0.0.3",
  "cpus": 0.1,
  "memory": 64,
  "environment": {
    "SERVICE_CHECK_SCRIPT": "curl -s http://46.101.191.124:5010/healthcheck",
    "SERVICE_PORT": "5010"
  },
  "hostname": "",
  "domain": "",
  "type": "service",
  "network_mode": "bridge",
  "links": {},
  "volumes": [],
  "bind_ports": [  
    {  
       "proto": "tcp",
       "host_ip": null,
       "port": 5010,
       "container_port": 5010
    }
  ],
  "labels": [],
  "publish": false,
  "privileged": false,
  "restart_policy": {  
    "name": "no"
  }
}
"@

Invoke-RestMethod -Uri $Uri -Method Post -Headers $Headers -Body $Body
```
