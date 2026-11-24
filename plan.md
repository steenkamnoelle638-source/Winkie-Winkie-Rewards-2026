# Vriende Oscar Rewards — plan

## Implementering

Die webwerf word as ’n responsiewe React/TypeScript-enkelsy-toepassing gebou met vier hoofroetes: `/` vir reëls en naamkeuse, `/vote` vir die vrae, `/results` vir die beskermde resultate en `/ranking` vir ranglyste. Die eerste weergawe gebruik ’n realistiese demo-datalaag in `localStorage` sodat die hele gebruikersvloei onmiddellik toetsbaar is; die projek is wel met Manus Server + Database geïnisialiseer sodat deelnemers, stemme, media en uitslae later sonder ’n frontend-herbou na Drizzle/tRPC kan skuif.

Die kern van die produk is ’n enkele kieser-sessie: die gebruiker kies ’n naam, bevestig dat die reëls gelees is, stem een keer per vraag, en die kandidaat met dieselfde naam word uit daardie vraag se opsies gefiltreer. Stemkeuses word plaaslik bewaar en kan nie per ongeluk verloor word nie. Resultate vereis die demo-adminwagwoord `oscar2026`; die beskermde uitslae wys hoofkategorieë, subkategorie-bydraes, podiums en ’n geanimeerde algemene onthulling met ’n swart spanningsoorgang, 3de → 2de → 1ste plek en ’n langer wag voor 1ste plek. Die ranking-blad toon ’n per-vraag ranglys met stemtalle, persentasies en ’n gesamentlike totaal.

## Projekstruktuur

- `client/src/App.tsx`: roetes, sessie-navikasie en globale layout.
- `client/src/pages/Home.tsx`: reëls, hosts/co-hosts, naamkeuse en toegang tot stemming.
- `client/src/pages/Vote.tsx`: stemvrae, kandidaatkaarte, selfstem-filter, vordering en voltooiing.
- `client/src/pages/Results.tsx`: admin-slot, hoofkategorie-podiums en algemene wenner-onthulling.
- `client/src/pages/Ranking.tsx`: ranglyste per vraag en totale telling.
- `client/src/data/awards.ts`: demo-deelnemers, hosts, vrae, subkategorieë, voorbeeldvideo’s en berekeningshelpers.
- `client/src/lib/storage.ts`: klein plaaslike sessie-/stemdatalaag met veilige JSON-hulpfunksies.
- `client/src/index.css`: donker filmiese visuele stelsel.
- `public/manus-routes.json`: volledige route-manifes.
- `server/` en `drizzle/`: voorbereide plek vir die toekomstige persistente databasis- en admin-implementering.

## Ontwerp

### Style directions

1. **Midnight awards broadcast** — 0.92
2. Gallery editorial / warm paper — 0.04
3. Neon game night — 0.04

### Gekose rigting: Midnight awards broadcast

- **Design Movement:** Hedendaagse film-toekenningsuitsending met ’n donker ateljee, sagte amber-lig en luukse fluweelgevoel.
- **Core Principles:** sterk fokus op die huidige aksie; ruim donker lug rondom inhoud; goud slegs vir betekenisvolle beklemtoning; elke staat voel soos ’n klein seremoniële oomblik.
- **Color Philosophy:** ink-swart en warm steenkool skep spanning; sjampanje-goud dra erkenning; gedempte koraal bring menslikheid en energie; sagte roomwit hou lang teks leesbaar.
- **Layout Paradigm:** asimmetriese “stage + rail”-uitleg: groot hoofpaneel aan die linkerkant, status/metadata in ’n smal regter-rail; op klein skerms stapel dit in dieselfde narratiewe volgorde.
- **Signature Elements:** ’n goue nommerplaatjie; afgeronde portret-kaders met filmkorrel; dun “spotlight” lyne en sterretjie-glans in die agtergrond.
- **Interaction Philosophy:** elke klik moet soos vordering op ’n aandprogram voel—duidelike status, kort terugvoer en geen verrassende modals vir gewone stemming nie.
- **Animation:** stadige ligpuls in hero’s, staggered reveal op kaarte, podiumhoogtes wat met easing inkom, en ’n swart “lights out” fase voor die algemene wenner-onthulling.
- **Typography System:** `DM Sans` vir UI en lopende teks; `Cormorant Garamond` vir emosionele hoofopskrifte, wennername en seremoniële labels. Groot vertoonkoppe is kort; metadata is uppercase met ruim letterspasiëring.
- **Brand Essence:** ’n private, speelse awards night vir mense wat mekaar ken — persoonlik, filmies, onvergeetlik. Personality: warm, dramaties, ondeund.
- **Brand Voice:** CTA’s is direk en vriendelik (“Gaan voort na vrae”, “Maak die koevert oop”); microcopy gee konteks (“Jou naam bepaal watter kandidaat jy nie kan kies nie”).
- **Wordmark & Logo:** ’n eenvoudige medalje/ster-simbool langs die woordmerk “Vriende / OSCARS”.
- **Signature Brand Color:** `#D7B06A` sjampanje-goud.

## Materiaalbeperkings

Die huidige deelnemers en fotos is demo-inhoud, omdat geen groepfoto’s of finale name deur die gebruiker verskaf is nie. Die databestande is doelbewus sentraal gehou sodat die demo-waardes maklik met werklike data, fotos, stemme en videolêers vervang kan word.
