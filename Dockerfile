FROM resin/raspberrypi3-node

COPY package.json /package.json
RUN npm install

CMD ["node", "index.js"]