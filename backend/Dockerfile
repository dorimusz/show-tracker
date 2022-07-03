FROM node:14-alpine
ADD . /appDir
WORKDIR /appDir
CMD ["npm", "start"]
EXPOSE 4000
# 8080 ha ezen fut a backend, a DigitalOcean alapértelmezett beállítása ez

#Akármit akarunk deployolni, dockerrel egyszerű lesz. De ehhez kell egy dockerfile. Expresses nodejs-hez
# docker build . -t templatebackend - bárhogy elnevezhető. ennek aapján megtalálja a dockerfilet és épít nekünk egy imaget. ehhez kell fussin a docker alkalmazás a gépen.
# docker tag templatebackend dorimusz/templatebackend:1.0.0
# docker push dorimusz/templatevackend:1.0.0

# DigitalOcean platform - create new app
# database - mongodb, frankfurt: ehhez az ipmet és az appomat hozzáadni, más nem fér hozzá