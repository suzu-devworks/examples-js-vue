# Settings Vite SSL

## Use openssh

手抜き .crt と .key 作成します。

```shell
PARENT="localhost"
openssl req \
-x509 \
-newkey rsa:4096 \
-sha256 \
-days 365 \
-nodes \
-keyout $PARENT.key \
-out $PARENT.crt \
-subj "/CN=${PARENT}" \
-extensions v3_ca \
-extensions v3_req \
-config <( \
  echo '[req]'; \
  echo 'default_bits= 4096'; \
  echo 'distinguished_name=req'; \
  echo 'x509_extension = v3_ca'; \
  echo 'req_extensions = v3_req'; \
  echo '[v3_req]'; \
  echo 'basicConstraints = CA:FALSE'; \
  echo 'keyUsage = nonRepudiation, digitalSignature, keyEncipherment'; \
  echo 'subjectAltName = @alt_names'; \
  echo '[ alt_names ]'; \
  echo "DNS.1 = ${PARENT}"; \
  echo "IP.1 = 127.0.0.1"; \
  echo '[ v3_ca ]'; \
  echo 'subjectKeyIdentifier=hash'; \
  echo 'authorityKeyIdentifier=keyid:always,issuer'; \
  echo 'basicConstraints = critical, CA:TRUE, pathlen:0'; \
  echo 'keyUsage = critical, cRLSign, keyCertSign'; \
  echo 'extendedKeyUsage = serverAuth, clientAuth')
```

.crt の内容は次のコマンドで確認します。

```shell
openssl x509 -noout -text -in $PARENT.crt
```

`vite.config.ts`

```ts
import basicSsl from "@vitejs/plugin-basic-ssl";
export default {
  server: {
    https: {
      key: fileURLToPath(new URL("./localhost.key", import.meta.url)),
      cert: fileURLToPath(new URL("./localhost.crt", import.meta.url)),
    },
  },
};
```

ブラウザ側の設定(unsafe)も必要です。

## @vitejs/plugin-basic-ssl plugin

自己署名証明書を自動的に作成しキャッシュするプロジェクト

- [サーバオプション](https://ja.vitejs.dev/config/server-options.html#server-https)

```shell
yarn add @vitejs/plugin-basic-ssl
```

`vite.config.ts`

```ts
import basicSsl from "@vitejs/plugin-basic-ssl";
export default {
  plugins: [basicSsl()],
};
```
