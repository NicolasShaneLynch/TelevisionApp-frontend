# Fase 1: Costruire l'applicazione Angular
FROM node:latest AS builder

# Imposta la directory di lavoro per l'applicazione
WORKDIR /usr/src/app

# Copia i file package.json e package-lock.json nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze npm
RUN npm install

# Copia l'intero codice dell'applicazione nella directory di lavoro
COPY . .

# Costruisci l'applicazione per la produzione
RUN npm run build --prod

# Fase 2: Servire l'applicazione Angular utilizzando Nginx
FROM nginx:latest

# Rimuovi i contenuti predefiniti della directory html di NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia l'applicazione Angular costruita dalla fase precedente nella directory html di NGINX
COPY --from=builder /usr/src/app/dist/frontend-contrader /usr/share/nginx/html

# Copia la configurazione personalizzata di NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Espone la porta 80 per consentire l'accesso esterno
EXPOSE 8085