FROM node:20.18 AS node
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build

FROM httpd:2.4
COPY --from=node /app/dist/szpk-population-census/browser /usr/local/apache2/htdocs
