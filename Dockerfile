FROM node:12.18.0-alpine
WORKDIR /usr/src/app
# package.jsonとyarn.lockを/usr/src/appにコピー
# COPY ["react-sample/package.json", "react-sample/yarn.lock", "./"]
# パッケージをインストール
# RUN yarn install
# RUN npm cache clean --force
# RUN npm install
# ファイルを全部作業用ディレクトリにコピー
# COPY . .
# コンテナを起動する際に実行されるコマンド
# ENTRYPOINT [ "yarn", "start" ]
# RUN npm run build