FROM nginx:stable-alpine

# Remove o default do container
RUN rm /etc/nginx/conf.d/default.conf

# Copia o novo config
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
