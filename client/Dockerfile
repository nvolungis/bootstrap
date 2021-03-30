FROM node:14.15.4-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn
RUN yarn add react-scripts@4.0.3 -g

# add app
COPY . ./

CMD ["yarn", "start"]
