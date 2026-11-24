# Vriende Oscar Rewards — vanilla plan

## Implementering

Die webwerf gebruik nou ’n eenvoudige vanilla stack: `public/index.html` vir die HTML-shell, `public/app.js` vir alle interaksie en roetering, `public/styles.css` vir die awards-night ontwerp, en `server.js` as ’n klein Express API. Alle deelnemers, vrae, stemtellings en admin-sessies word in SQLite gestoor; `data/schema.sql` beskryf die datamodel en `data/awards.sqlite` word tydens runtime gesaai en deur `.gitignore` uitgesluit.

Die vier roetes bly `/`, `/vote`, `/results` en `/ranking`. Die kieser kies sy naam en bevestig die reëls; elke stem word met `POST /api/votes` na SQLite gestoor en selfstem word server-side geweier. Die resultate word slegs deur `POST /api/admin/login` ontsluit. Die resultateskerm wys nou doelbewus eers die drie hoofkategorieë en hul podiums. Eers onder daardie kategorie-afdeling begin die algehele wenner-onthulling met ’n swart skerm en die 3de → 2de → 1ste tydsberekening.

## Projekstruktuur

- `public/index.html`: vanilla HTML-shell.
- `public/app.js`: roetering, API-kliënt, stemvloei, admin-slot, podiums, onthulling en ranking-rendering.
- `public/styles.css`: responsiewe filmiese awards-night ontwerp.
- `server.js`: Express static server, SQLite bootstrap, API-endpoints en resultaatberekening.
- `data/schema.sql`: SQLite-tabelle vir deelnemers, vrae, tellinge, stemme en admin-sessies.
- `public/manus-routes.json`: volledige route-manifes.

## Resultatevertoning

Hoofkategorie-wenners is die eerste inhoud op die beskermde resultateblad. Die algehele top 3 word eers daarna gewys, met ’n aparte “Begin algehele onthulling”-aksie en langer wagtyd voor eerste plek.

## Ontwerp

Die bestaande Midnight awards broadcast-rigting bly behoue: ink-swart, sjampanje-goud, sagte roomwit, Cormorant Garamond vir seremonie-opskrifte, DM Sans vir UI, portretkaders, dun spotlight-lyne en ’n filmiese lig-uit-fase.

## Runtime-nota

Die SQLite-lêer is doelbewus runtime-data en word nie na GitHub gestoot nie. Vir produksie op ’n ephemeral container moet SQLite op ’n gemonteerde persistente volume of ’n ander durabele databasis geplaas word indien stemdata oor deploys heen behoue moet bly.
