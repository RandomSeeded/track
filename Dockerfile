FROM mhart/alpine-node:8.12
ADD backend/*.json /backend/
WORKDIR backend/
RUN  npm ci
ADD backend/lib /backend/lib
ADD frontend/dist /frontend/dist
WORKDIR /
CMD ["node", "backend/lib/app.js"]
