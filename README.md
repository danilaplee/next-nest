# Pexels Integration Demo

This is a demo of integration with a third party image search provider Pexels

## Requirements

- Backend 
  - ```Redis``` on ```localhost:6379```
  - ```PEXELS_API_KEY``` environment variable

- Frontend
  - ```PORT``` environment variable
  - ```API_URL``` environment variable pointing to the backend
  - or ```backend``` running on ```localhost:3000```

## Project Structure:

- ```pexels-api```

  This is the repo for the background integration with Pexels a free image stock, using a queue to process images without breaking the concurrency limits of the api. Features:
  - Redis Bull Queus
  - Redis Caching
  - Scheduling with Cron Jobs
  - Microservices with Redis Pub/Sub

- ```pexels-grid```

  is the frontend created in react and nextjs with custom implementation of the:
  - paginated virtual grid
  - routing
  - server-side rendering
  - search
  - nested modals.

![cat](docs/search.png)

![cat](docs/cat.png)