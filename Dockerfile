FROM node:16-bullseye

RUN npm install -g gatsby-cli@4.19.0
#RUN groupadd app && useradd --system -g app app
#USER app
WORKDIR /app


COPY package*.json .
#COPY packages/shared/package*.json ./packages/shared/
#COPY packages/starter/package*.json ./packages/starter/
RUN yarn install
COPY . .

EXPOSE 8000
# cd to the starter project
#WORKDIR /app/packages/starter
#RUN gatsby telemetry --disable
CMD ["yarn", "develop"]
