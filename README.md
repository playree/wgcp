# .env

```
NEXTAUTH_URL=http://localhost:63001
NEXTAUTH_SECRET={下記参照}
```

## NEXTAUTH_SECRET

```
$ openssl rand -base64 32
```

# Upgrade

```
yarn upgrade --latest
```