# Vriende Oscar Rewards

’n Eenvoudige stemwebwerf vir die vriendegroep se Oscars. Die toepassing se eie kode gebruik gewone HTML, CSS en JavaScript; stemme en deelnemers word in SQLite gehou.

## Begin plaaslik

Vereis Node.js 22.5 of nuwer.

```sh
pnpm install
pnpm dev
```

Die webwerf is by `http://localhost:3000` beskikbaar. Stel `PORT` om ’n ander poort te kies, `SQLITE_PATH` om die databasislêer te skuif, en `ADMIN_PASSWORD` om die admin-wagwoord te stel (die demonstrasie-terugval is `oscar2026`).

## Belangrike lêers

- `public/index.html`, `public/styles.css`, `public/app.js`: gebruikerskoppelvlak en stemvloei.
- `server.js`: JavaScript API-bediener met SQLite-integrasie.
- `data/schema.sql`: SQLite-skema; die runtime-databasis (`data/awards.sqlite`) word plaaslik geskep en nie as kode gestoor nie.

Die saadlys bevat sewe deelnemers. Deelnemer 6 en 7 is tydelike plekhouers totdat hul regte name en foto’s bygevoeg word. Nuwe installasies begin met nul stemme. Die repository bevat ook pakketbestuurder- en platformkonfigurasie-lêers wat nodig is om die app te installeer en uit te voer; hulle is nie deel van die webwerf se runtime-kode nie.
