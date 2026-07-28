# August Råd & Byg — Hjemmeside

Professionel hjemmeside for August Råd & Byg, bygget med Next.js 16, Tailwind CSS v4 og TypeScript.

---

## Mappestruktur

```
august-raad-byg/
├── app/
│   ├── actions/
│   │   └── contact.ts          # Server Action — sender email via Resend
│   ├── components/
│   │   ├── BeforeAfterSlider.tsx   # Før/efter billede-slider
│   │   ├── ContactForm.tsx         # Kontaktformular med validering
│   │   ├── CountUp.tsx             # Animerede tæller-tal
│   │   ├── FadeUp.tsx              # Fade-in animation ved scroll
│   │   ├── FloatingCall.tsx        # Flydende opkaldsknap (mobil)
│   │   └── Navbar.tsx              # Navigation med scroll-spy
│   ├── globals.css             # CSS-variabler, responsive grids
│   ├── layout.tsx              # Root layout, fonte, meta-tags
│   └── page.tsx                # Hele forsiden (alle sektioner)
│
├── public/
│   ├── logo.svg                # Logo til lys baggrund
│   ├── logo-white.svg          # Logo til mørk baggrund
│   ├── logo-real.png           # Originalt logo (PNG)
│   └── renovations/            # Optimerede før/efter billeder
│
├── originals/                  # Råfiler fra kamera/WhatsApp (IKKE i git)
│
├── .env.example                # Miljøvariabler — kopiér til .env.local
├── netlify.toml                # Netlify deployment-config
├── next.config.ts              # Next.js konfiguration
├── package.json
└── tsconfig.json
```

---

## Kom i gang lokalt

```bash
# 1. Installér afhængigheder
npm install

# 2. Kopiér miljøvariabler
cp .env.example .env.local
# Åbn .env.local og udfyld RESEND_API_KEY

# 3. Start udviklings-server
npm run dev
# Åbn http://localhost:3000
```

---

## Miljøvariabler

Kopiér `.env.example` til `.env.local` og udfyld:

| Variabel | Beskrivelse | Påkrævet |
|----------|-------------|----------|
| `RESEND_API_KEY` | API-nøgle fra [resend.com](https://resend.com) — gratis op til 3.000 emails/md | For email |
| `CONTACT_EMAIL` | Hvilken email kontaktbeskeder sendes til | Nej (bruger default) |
| `SUPABASE_URL` | Projekt-URL fra [supabase.com](https://supabase.com) | Nej — uden den gemmes leads ikke i en database |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role-nøgle (Project Settings → API) | Nej, se ovenfor |

### Lead-database (Supabase)

Alle formularer (kontaktformular, tilbudsberegner, nyhedsbrev) gemmer et lead i en
Supabase-database ud over at sende email — så du kan se/eksportere alle
henvendelser i ét overblik, selv dem der aldrig blev til en sag.

1. Opret gratis projekt på [supabase.com](https://supabase.com)
2. Åbn **SQL Editor** i dit projekt og kør indholdet af [`supabase/schema.sql`](supabase/schema.sql)
3. Under **Project Settings → API**, kopiér `Project URL` og `service_role` nøglen
4. Sæt dem som `SUPABASE_URL` og `SUPABASE_SERVICE_ROLE_KEY` i `.env.local` (og i dit hostingmiljø)
5. Se alle indkomne leads under **Table Editor → leads** i Supabase-dashboardet

Uden disse variabler virker alle formularer stadig præcis som før (kun email) — databasen er et supplement, ikke en forudsætning.

### Hero-video

Læg en `.mp4`-fil i `public/videos/hero.mp4`, så afspiller forsiden den automatisk
i stedet for det statiske foto — ingen kodeændringer nødvendige.

---

## Deploy

### ▲ Vercel (nuværende setup — anbefalet)
Hvert push til `main` deployer automatisk via GitHub-integration.
```bash
git push origin main
```
Tilføj miljøvariabler under: Vercel → Project → Settings → Environment Variables

---

### Netlify
1. Opret projekt på [app.netlify.com](https://app.netlify.com) → "Import from Git"
2. Vælg GitHub-repo
3. Build command: `npm run build` | Publish: `.next`
4. Tilføj miljøvariabler under Site Settings → Environment Variables
5. `netlify.toml` er allerede klar i projektet

---

### Railway
1. Gå til [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Vælg repo — Railway registrerer Next.js automatisk
3. Tilføj miljøvariabler under Variables-fanen

---

### Fly.io
```bash
fly launch
fly secrets set RESEND_API_KEY=re_xxxx CONTACT_EMAIL=info@augustraadogbyg.dk
fly deploy
```

---

### Statisk hosting (GitHub Pages, Apache, nginx)
Aktivér statisk eksport i `next.config.ts` ved at fjerne kommentar-tegnet:
```ts
output: "export",   // ← fjern //
```
**Bemærk:** Med static export virker kontaktformularen ikke (Server Actions kræver Node.js).
Kør `npm run build` — output havner i `out/`-mappen.

---

## Opdatering af indhold

| Hvad skal ændres | Fil | Søg efter |
|------------------|-----|-----------|
| Telefon / email / adresse | `app/page.tsx` | `+45 12 34 56 78` |
| Kundeanmeldelser | `app/page.tsx` | `quote:` i testimonials-arrayet |
| Ydelser (9 kort) | `app/page.tsx` | `const services` øverst |
| Processkridt | `app/page.tsx` | `const processSteps` |
| Før/efter billeder | `public/renovations/` | Udskift filer, opdatér paths i `page.tsx` |
| Galleri-billeder | `app/components/Gallery.tsx` | `galleryImages`-arrayet |
| Prisberegner-satser | `app/components/PriceCalculator.tsx` | `pricePerM2`, `minTotal` |
| Farver | `app/globals.css` | `:root { --navy, --gold ... }` |
| Fonte | `app/layout.tsx` | `Cormorant_Garamond`, `Jost` |
| Lead-magnet PDF | `public/downloads/byggeguide.pdf` | Genskab med `python scripts/generate_byggeguide.py` |
