# Image source
FROM nginx:alpine

# Copie des fichiers dans le conteneur
COPY ./Assets /usr/share/nginx/html/Assets
COPY ./index.html /usr/share/nginx/html/index.html

# Expose le port 80 (port par défaut nginx)
EXPOSE 80