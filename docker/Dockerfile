FROM node:15
WORKDIR /app
# below command will copy package.json to working directory ("." or "/app" both are same)
COPY package.json .
        ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only-production; \
        fi
#below command will copy all file   s source code into the docker image 
COPY . ./
# below port is default set
ENV PORT 3000
EXPOSE $PORT
CMD ["node","start"]