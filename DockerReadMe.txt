1) Create all files named as Dockerfile, .docker-compose.yml & .dockerignore
2) Inside the Dockerfile apply all below stuffs

        FROM node:alpine
        WORKDIR /usr/src/server
        COPY package*.json .
        RUN npm ci
        COPY . .
        CMD ["npm", "start"]

3) Inside .dockerignore file, apply below stuffs

        ./node_modules
        Dockerfile
        .dockerignore
        docker-compose.yml

4) Inside .docker-compose.yml file, apply below stuffs

        version: '3.9' #This version should be at least 3 or above 3

        services:
        # MongoDB services
        mongo_db:
            container_name: db_container
            image: mongo:latest
            restart: always
            volumes:
            - mongo_db:/data/db

        # Node API services
        api:
            build: .
            ports:
                - 5555:5000  #First port is you hope to run the application after dockerized : Second port is local server running port
            environment: #You should add your all environment variables 
                PORT: 5000
                LOCAL_URI: mongodb://mongo_db:27017/ecom #instead of localhost we have added as mongo_db
                CLOUDINARY_CLOUD_NAME: university-student
                CLOUDINARY_API_KEY: 652641367849156
                CLOUDINARY_API_SECRET: 1Mtx_xr2x3HD2aMhuc_NBbpSdpQ
                JWT_SECRET: MERNSECRET
                MAIL_FROM: "darshanikaushalya7788dkd@gmail.com"
                MAIL_HOST: "smtp.mailtrap.io"
                MAIL_PORT: 2525
                MAIL_USER: "61a9c3f66a34cb"
                MAIL_PASS: "378e9934937787"
            depends_on:
            - mongo_db

        volumes:
          mongo_db: {}


