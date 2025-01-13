# Pexels Integration Demo

This is a demo of integration with a third party image search provider Pexels

## Requirements

- Backend 
  - Redis on ```localhost:6379```
  - ```PEXELS_API_KEY``` environment variable

- Frontend
  - ```PORT``` environment variable
  - ```API_URL``` environment variable pointing to the backend
  - or backend running on ```localhost:3000```

## This repo contains 2 folders:

- pexels-api 
  This is the repo for the background integration with Pexels a free image stock, using a queue to process images without breaking the concurrency limits of the api. Api is created with nestjs and queue with bull, storage is done with Redis.

- pexels-grid
  is the frontend created in react and nextjs with custom implementation of the paginated virtual grid, routing, search and nested modals.
