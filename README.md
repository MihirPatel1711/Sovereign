# Sovereign

Frontend prototype for Sovereign, a premium formal workwear brand for women. Built with Next.js 16, React 19 and Tailwind 4.

## Run

```
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

- `/` home
- `/collection` the collection, with `?category=` filters
- `/product/[slug]` product page with the customiser
- `/suits` made to measure, by appointment
- `/suits/build` compose a three-piece online
- `/craft`, `/story`, `/appointment`, `/bag`, `/checkout`

Product data lives in `src/lib/data.ts`. Photography lives in `public/assets`.
