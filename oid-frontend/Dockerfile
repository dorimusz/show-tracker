FROM nginx:1.15.2-alpine
COPY ./build /var/www
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]

# npm run build minden előtt, mert a 2. sorban ezzel a build mappával dolgozik, amit itt hoz létre
# docker build . -t dorimusz/templatefrontend:1.0.0
# docker push dorimusz/templatefrontend:1.0.0
# DO-n új app létrehozása

