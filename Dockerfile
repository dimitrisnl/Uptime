FROM resin/raspberrypi3-node

COPY package.json /package.json
RUN npm install

#COPY src/ /usr/src/app
#MD ["node", "/usr/src/app/index.js"]