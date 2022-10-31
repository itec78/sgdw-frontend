FROM node:14-alpine3.16 AS builder

WORKDIR /usr/src/frontend

COPY website/ .

ARG SDOW_API_URL=https://api.seigradidiwikipedia.it
ARG WIKI_LANG=it

RUN npm ci
RUN npm run build
RUN for f in $(find ./build -name '*.css' -or -name '*.js' -or -name '*.svg' -or -name '*.txt' -or -name '*.html'); do \
        gzip -9 -k "$f" & \
        brotli --best --keep "$f" & \
    done; \
    wait


####################################################

FROM alpine:3.16

WORKDIR /var/www/html

RUN apk add --no-cache nginx nginx-mod-http-brotli

COPY website/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/frontend/build ./

EXPOSE 80
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]