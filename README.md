# Pexels Integration Demo

This is a demo of integration with a third party image search provider [Pexels](https://pexels.com)
![search](docs/search.png)

## Project Structure:

- ```pexels-api```

  This is the folder for the backend integration with Pexels a free image stock, using a queue to process images without breaking the rate limits of the api. Features:
  - Microservices with Redis Pub/Sub
  - Redis Bull Queues
  - Redis Caching
  - Scheduling with Cron Jobs
  - ```pexels-api/src/app.module.ts``` > ```pexels-api/src/pexels.controller.ts``` - api + queue producer + sub
  - ```pexels-api/src/micro.module.ts``` > ```pexels-api/src/pexels.service.ts``` - queue consumer + scheduling + pub
  

- ```pexels-grid```

  is the frontend created in react and nextjs with the following features:
  - Paginated virtual grid
  - Server-Side Rendering
  - Search
  - SPA Routing
  - Nested Routing

## Docker Compose

#### The easiest way to run is using [docker-compose](https://docs.docker.com/compose/) and prebuilt images from [dockerhub](hub.docker.com) it will automatically setup redis and routing between services you will have the client running on [http://localhost:5257](http://localhost:5257)

``` 
git clone git@github.com:danilaplee/next-nest.git
cd next-nest
mkdir redis
chmod 777 redis
PEXELS_API_KEY='paste-your-apikey' \
REDIS_VOLUME_PATH=$(pwd)/redis \
PUBLIC_API_URL='http://localhost:5256/' \
REDIS_PASSWORD='yourpassword123' \ 
docker compose up -d
open http://localhost:5257
```

## Requirements For Development

- Backend 
  #### This will setup a local server with live updates for you
  - [Redis](https://redis.com) running on [localhost:6379](localhost:6379)
  - ```PEXELS_API_KEY``` the key that you can get from the [pexels website](https://pexels.com) after registering
  - ```QUEUE_CONSUMER``` environment variable set to ```true```
  - ```API_PRODUCER``` environment variable set to ```true```
  - Run with
  ``` yarn ```
  ``` yarn start ```

- Frontend
  #### This will setup a local client with live updates for you
  - ```PORT``` by default ```3000``` or ```3001``` if backend running
  - ```API_URL``` by default is set to [http://localhost:3000/](http://localhost:3000/)
  - Run with
  ``` yarn ```
  ``` yarn dev ```

## More Screenshots:

![cat](docs/cat.png)

![pagination](docs/pagination.png)