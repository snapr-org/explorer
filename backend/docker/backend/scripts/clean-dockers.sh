#!/bin/bash
docker stop backend_crawler_1
docker stop backend_postgres_1
docker stop backend_graphql-engine_1
docker stop backend_smart-contract-verifier-api_1
docker stop backend_smart-contract-verifier_1

docker rm backend_crawler_1
docker rm backend_postgres_1
docker rm backend_graphql-engine_1
docker rm backend_smart-contract-verifier-api_1
docker rm backend_smart-contract-verifier_1

docker rmi crawler:latest
docker rmi smart-contract-verifier-api:latest
docker rmi smart-contract-verifier:latest

docker volume rm backend_db-data

