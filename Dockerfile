# ベースイメージの指定
FROM node:latest

# 作業ディレクトリを指定
WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .
COPY prisma ./prisma/

# コンテナのポートを指定
EXPOSE 8080

# 起動コマンドの指定
CMD [ "npm", "start" ]
