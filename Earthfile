FROM node:14.15.0
WORKDIR /usr/build

deps:
    COPY package.json package-lock.json ./
    RUN npm install
    SAVE ARTIFACT package-lock.json AS LOCAL ./package-lock.json

build:
    FROM +deps
    COPY . .
    RUN npm run-script build
    SAVE ARTIFACT json AS LOCAL json
    SAVE ARTIFACT js AS LOCAL js
    SAVE ARTIFACT ts AS LOCAL ts
