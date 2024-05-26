

FROM node:15
WORKDIR /app
# below command will copy package.json to working directory ("." or "/app" both are same)
COPY package.json .
RUN npm install
#below command will copy all file   s source code into the docker image 
COPY . ./
# below port is default set
ENV PORT 3000
EXPOSE $PORT
CMD ["npm","start"]