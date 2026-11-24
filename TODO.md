# TODO

## 1. Vanilla stack
- [x] Die frontend gebruik gewone HTML, JavaScript en CSS sonder React of TypeScript in die runtime-pad.
- [x] Die backend gebruik ’n klein Express JavaScript-server met SQLite via Node se ingeboude `node:sqlite`.
- [x] SQLite-schema en runtime-seeding is by `data/schema.sql` en `server.js` geïmplementeer.

## 2. Reëls-, gasheer- en naamkeuseblad
- [x] Die eerste bladsy wys reëls en fotos van die hosts en co-hosts.
- [x] Die gebruiker kan bevestig dat die reëls gelees is.
- [x] Die gebruiker kies sy naam uit ’n dropdown voordat stemming begin.

## 3. Stemblad
- [x] Die tweede bladsy bevat verskeie vrae met kandidaat-opsies en fotos.
- [x] Die gekose gebruiker se naam en foto word uit die stemopsies verwyder.
- [x] Stemkeuses word per vraag in SQLite gestoor en kan nie selfstem nie.

## 4. Resultate en onthulling
- [x] Die resultate-roete vra ’n admin-wagwoord voor die dashboard vertoon word.
- [x] Die hoofkategorie-wenners en hul top-3-podiums wys eerste op die resultateblad.
- [x] Die algehele top-3 verskyn ná die hoofkategorieë.
- [x] Die algehele onthulling speel swart → derde → tweede → eerste, met ’n langer wag voor eerste plek.

## 5. Rankingblad
- [x] Die vierde bladsy wys almal se ranking per vraag.

## 6. Bewysbare demo-ervaring
- [x] Desktop- en mobiel-uitlegte is ingesluit.
- [x] Die route-manifes sluit `/`, `/vote`, `/results`, `/ranking` en `/404` in.
- [ ] Vervang demo-deelnemers, fotos, videos en password met die finale groepdata.
- [ ] Plaas SQLite op ’n durabele volume voordat die produksie-omgewing deploys moet oorleef.
