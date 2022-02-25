FROM node:17-alpine AS builder

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY . .

RUN npm install

ENV NODE_ENV production
RUN npm run build

FROM nginx:1.21-alpine AS runner
COPY --from=builder /home/node/app/build /usr/share/nginx/html
EXPOSE 80
