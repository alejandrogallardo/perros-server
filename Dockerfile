# Usa una imagen oficial de Node.js como base 
FROM node:20.18-alpine3.20 
# Establece el directorio de trabajo en el contenedor 
WORKDIR /usr/src/app 
# Copia el archivo package.json y package-lock.json 
COPY package*.json ./ 
# Instala las dependencias de la aplicación (NestJS y otros paquetes) 
RUN npm install 
# Copia todo el proyecto al contenedor 
COPY . . 
# Instala NestJS globalmente en el contenedor (opcional si lo necesitas) 
RUN npm install -g @nestjs/cli@10.4.2
# Expone el puerto 3000 para acceder a la aplicación 
EXPOSE 3000 
# Comando para ejecutar la aplicación en modo producción 
CMD ["npm", "run", "start:dev"]