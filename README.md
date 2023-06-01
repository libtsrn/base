[![Discord](https://img.shields.io/discord/777430548951728149?label=chat&logo=discord)](https://discord.gg/kfMwZUyGFG)
# 私のウェブサイト
このリポジトリの所有者のウェブサイトです。  
ウェブフレームワークにAstroを使用していて、ブログページはmicroCMSとの連携によって実現しており、ウェブサイトはJamstackな構成となっています。

## 必要要件
開発する場合、npmではなくpnpmを使ってください。  
ビルドのみの場合は、npmで構いません。

## ビルド方法
`npm i`または`pnpm i`で依存関係をインストールした後、`npm build`または`pnpm build`でビルドを開始できます。  
### ブログページについて
microCMSからブログのデータを読み込みます。
microCMSのAPIを使ってブログページもビルドを行う場合は、`.env.template`を参考に`.env`ファイルを作成し、そこに必要な情報を書き込んでください。  
また、microCMSのAPIキーを`.env`に設定したまま一時的に起動したい場合、`NO_MICROCMS=1`のように環境変数を設定して起動してください。そうすると、ブログが空の状態でビルドが始まります。
（Unix系での起動例：`NO_MICROCMS=1 pnpm start`）