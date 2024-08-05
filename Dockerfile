FROM node:lts

WORKDIR /code

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

ENV SURREAL_HOST=http://localhost:8000
ENV SURREAL_SCOPE=
ENV SURREAL_DB=
ENV SURREAL_NS=

EXPOSE 3000

CMD pnpm run start