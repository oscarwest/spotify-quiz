# Docker stuff
docker run --name mongo-quiz -d mongo

docker inspect -f '{{.NetworkSettings.IPAddress}}' mongo-quiz


# Redis
## run locally
docker run --name spotify-quiz-redis -p 6379:6379 -d redis

docker run --name spotify-quiz-redis -d redis

docker run -it --link spotify-quiz-redis:redis --rm redis redis-cli -h redis -p 6379


