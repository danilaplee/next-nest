# Pexels Integration Demo

## This repo contains 2 folders:

- pexels-api 
  This is the repo for the background integration with Pexels a free image stock, using a queue to process images without breaking the concurrency limits of the api. Api is created with nestjs and queue with bull, storage is done with Redis.

- pexels-grid
  is the frontend created in react and nextjs with custom implementation of the paginated virtual grid, routing, search and nested modals.