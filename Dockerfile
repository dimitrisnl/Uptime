FROM resin/raspberrypi3-node

COPY package.json /package.json
RUN npm install

COPY . /app
CMD ["node", "/app/index.js"]