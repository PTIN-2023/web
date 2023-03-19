# Build web
FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
COPY src ./src
RUN npm install
RUN npm run build-css

# Deploy
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./public/ /usr/share/nginx/html
COPY ./node_modules /usr/share/nginx/html/node_modules
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
