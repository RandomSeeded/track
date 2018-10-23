FROM mhart/alpine-node:8.12
ADD *.json /
RUN npm ci
ADD /lib /lib
CMD ["node", "lib/app.js"]
