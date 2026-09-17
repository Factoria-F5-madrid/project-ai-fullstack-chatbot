# Marginalia 📚 — taller: integra un asistente de IA conversacional en tu web

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/banner-noche.svg">
    <img src=".github/banner-dia.svg" alt="Marginalia — Bartleby, el libro de la casa, paseando por la balda" width="100%">
  </picture>
</p>

Esto que tienes delante es **Marginalia**, una página de libros que ya funciona.
En el taller vamos a añadirle, paso a paso, un asistente conversacional con IA:
**Margarita**, la prima de Bartleby (el librito que pasea por la balda).

Lo importante no es el chatbot de esta web: es el **patrón universal** que vas a
aprender, válido con React, PHP, Django o lo que uses mañana:

```
Usuario → Frontend → (HTTP) → Backend → (HTTP + API key) → Proveedor de IA
   ↑                                                            │
   └────────────────────── la respuesta vuelve ─────────────────┘
```

## Antes de venir a clase

Tienes este repo con un par de días de margen a propósito. Tu misión:
**instálalo, arráncalo y pasea por el código** (`server.js`, `books.js`,
`public/app.js`) para que te suene. Si algo falla o no lo entiendes, intenta
resolverlo por tu cuenta primero. Así el día de clase no gastamos ni un minuto
en instalaciones y empezamos directamente a construir el chatbot.

## Arrancar el punto de partida

Necesitas **Node.js 18 o superior** y **git**. Compruébalo:

```bash
node -v        # v18.x.x o más; si no, instala la LTS desde nodejs.org
git --version
```

Clona, instala y arranca:

```bash
git clone <URL-del-repo>
cd <carpeta-del-repo>
npm install
npm start
```

Abre **http://localhost:3000**: catálogo, buscador, filtros, día/noche y
Bartleby con sus citas (haz clic en él, que para eso está). **Todavía no hay
chatbot: lo construimos nosotros.**

Para parar el servidor: `Ctrl+C`. Para arrancarlo de nuevo: `npm start`.

### Si algo falla

- **`node -v` da menos de 18 (o no existe):** instala la LTS desde nodejs.org
  y vuelve a abrir la terminal.
- **`npm install` da errores:** borra la carpeta `node_modules` y repítelo.
- **"port 3000 already in use":** otro programa ocupa el puerto; ciérralo
  (o para el otro servidor con `Ctrl+C` en su terminal).

## El camino (lo haremos juntos en clase)

| Paso | Qué construimos | La lección |
|---|---|---|
| 1 | `llm.js` + `test-llm.js`: el servidor habla con la IA (sin web) | Es solo HTTP + JSON + una API key secreta |
| 2 | `POST /api/chat` con validación (probado con curl) | El backend expone la IA como API propia y no se fía del navegador |
| 3 | El frontend conectado: aparece Margarita | El navegador solo habla con NUESTRO backend |
| 4 | El historial (`conversacion`) | La IA no tiene memoria: la memoria es nuestra |
| 5 | System prompt + catálogo | La IA no conoce tu negocio: se lo cuentas tú en cada llamada |

## La API key (gratis, 2 minutos — hazlo también antes de clase)

1. https://aistudio.google.com → "Get API key" → crear (cuenta de Google, sin tarjeta).
2. `cp .env.example .env` y pega la clave en `GEMINI_API_KEY=`.
3. La key es un **secreto**: vive en `.env`, que está en `.gitignore`.
   Nunca en el código, nunca en el navegador, nunca en git.

Sin key también se puede seguir el taller: el código incluye un **modo
simulado** que responde de mentira (y lo dice).

## Estructura

```
server.js          Express: estáticos + GET /api/books  (aquí añadiremos /api/chat)
books.js           El catálogo (66 libros): nuestra "base de datos" local
public/            index.html + styles.css + app.js (la web; el CSS ya está listo)
.env.example       Plantilla de configuración (cópiala como .env)
```

## Límites del modo gratuito

La key gratuita de Gemini tiene topes de peticiones por minuto y por día (se ven
en el panel de AI Studio); para esta práctica sobran. Si responde con error de
límite, espera un minuto. Y en el nivel gratuito Google puede usar lo enviado
para mejorar sus modelos: no mandes datos personales.
