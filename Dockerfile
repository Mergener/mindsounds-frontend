FROM node:lts-alpine as builder
RUN npm install -g typescript
WORKDIR /app
COPY . /app
RUN tsc --build ./tsconfig.json

FROM nginx:alpine

COPY --from=builder /app/site /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf