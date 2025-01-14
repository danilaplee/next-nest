# Pexels Integration Demo

This is a demo of integration with a third party image search provider Pexels

## Requirements

- Backend 
  - ```Redis``` running on ```localhost:6379``` or
  - ```REDIS_HOST```, ```REDIS_USER```, ```REDIS_PASS``` and ```REDIS_PORT``` environment variables
  - ```PEXELS_API_KEY``` environment variable
  - ```PORT``` environment variable
  - Run with
  ``` yarn ```
  ``` yarn start ```

- Frontend
  - ```PORT``` environment variable
  - ```API_URL``` environment variable pointing to the backend
  - or ```backend``` running on ```localhost:3000```
  - Run with
  ``` yarn ```
  ``` yarn dev ```

## Project Structure:

- ```pexels-api```

  This is the repo for the backend integration with Pexels a free image stock, using a queue to process images without breaking the rate limits of the api. Features:
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

## Screenshots:
![search](docs/search.png)

![cat](docs/cat.png)

![pagination](docs/pagination.png)