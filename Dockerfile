# Etapa 1: Compilar TypeScript
FROM node:alpine3.20 as ts-compiler
WORKDIR /TemplateBackend
COPY package*.json ./
COPY tsconfig*.json ./
RUN apk add --no-cache git
RUN npm cache clean --force
RUN npm install
COPY . ./
RUN npm run build

# Etapa 2: Remover TypeScript
FROM node:alpine3.20 as ts-remover
WORKDIR /TemplateBackend
COPY --from=ts-compiler /TemplateBackend/package*.json ./
COPY --from=ts-compiler /TemplateBackend/build/src ./
RUN apk add --no-cache git
RUN npm cache clean --force
RUN npm install --only=production

# Etapa 3: Construir imagen final
FROM node:alpine3.20
WORKDIR /TemplateBackend
COPY --from=ts-remover /TemplateBackend ./

RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/America/Bogota /etc/localtime && echo "America/Bogota" > /etc/timezone

USER 1000
EXPOSE 4500/tcp
WORKDIR /TemplateBackend
CMD ["node", "App.js"]
