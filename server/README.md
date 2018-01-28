# Docker stuff
docker run --name mongo-quiz -d mongo

docker inspect -f '{{.NetworkSettings.IPAddress}}' mongo-quiz



