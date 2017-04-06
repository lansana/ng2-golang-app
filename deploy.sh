#!/usr/bin/env bash

RANCHER_STACK="ng2"
RANCHER_ENV="1a5"
RANCHER_COMPOSE_FILE="rancher-compose.yml"
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Build image
docker build -t angular2-golang-chat-room .

# Tag AWS ECR repo
docker tag angular2-golang-chat-room ***REMOVED***.dkr.ecr.us-east-1.amazonaws.com/angular2-golang-chat-room:latest

# Push to ECR
docker push ***REMOVED***.dkr.ecr.us-east-1.amazonaws.com/angular2-golang-chat-room:latest

# Update stack on Rancher
rancher --env ${RANCHER_ENV} up -d \
  --stack ${RANCHER_STACK} \
  --rancher-file ${RANCHER_COMPOSE_FILE} \
  --file ${DOCKER_COMPOSE_FILE} \
  --force-upgrade

# Confirm update on rancher
rancher --env ${RANCHER_ENV} up -d \
  --stack ${RANCHER_STACK} \
  --rancher-file ${RANCHER_COMPOSE_FILE} \
  --file ${DOCKER_COMPOSE_FILE} \
  --confirm-upgrade