FROM node:12.10.0

ENV APP_DIR=/payment-services
RUN mkdir  ${APP_DIR}
RUN mkdir  ${APP_DIR}/logs

# Note : POC only
# TODO : Copy specific file.
COPY . ${APP_DIR}/
WORKDIR  ${APP_DIR}
RUN npm install

EXPOSE 3001

CMD ["npm" , "start"]