# NM Soluciones Integrales

## Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Bootstrap 5 + Bootstrap Icons
- **Backend**: Supabase (Auth, Database, Storage)
- **Hosting**: Netlify (app + functions serverless)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: ESLint + Prettier

## Estructura del proyecto
```
├── src/                    # Codigo fuente React/TSX
│   ├── components/         # Componentes reutilizables
│   ├── pages/              # Paginas
│   ├── hooks/              # Custom hooks
│   ├── services/           # Supabase, APIs externas
│   ├── types/              # Definiciones TypeScript
│   ├── utils/              # Utilidades
│   ├── App.tsx             # Router principal
│   └── main.tsx            # Entry point
├── netlify/functions/      # Serverless functions (Netlify)
├── secrets/                # Claves locales (NO COMMITEAR)
│   └── README.md           # Consultar antes de pedir keys
├── tests/                  # Tests unitarios (Vitest)
├── e2e/                    # Tests E2E (Playwright)
├── public/                 # Assets estaticos
├── opencode.json
├── package.json
└── .env.example
```

## Reglas IMPORTANTES
1. **NUNCA** hardcodear API keys o secrets. Consultar `secrets/README.md` primero.
2. **NUNCA** commite el directorio `secrets/` ni archivos `*-config.js` con valores reales.
3. Las Netlify Functions usan `process.env.GOOGLE_API_KEY` desde variables de entorno de Netlify.
4. Las variables de entorno para Vite usan prefijo `VITE_` (ej: `VITE_SUPABASE_URL`).
5. Usar rama `develop` para desarrollo diario.
6. Solo `main` hace deploy a produccion en Netlify.
7. Tests con Vitest: archivos `*.test.ts` / `*.spec.ts` junto al codigo.
8. Tests E2E con Playwright en `e2e/`.
9. Escribir componentes funcionales con hooks. Evitar clases.
10. Para nuevas paginas (inventario, carrito, pedidos, pagos, reportes), crear en `src/pages/` con TypeScript.

## Scripts disponibles
- `npm run dev` — Servidor de desarrollo Vite
- `npm run build` — Build produccion
- `npm run test` — Tests unitarios
- `npm run test:e2e` — Tests E2E Playwright
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Servicios externos
- **Supabase**: Base de datos PostgreSQL, autenticacion, storage
- **Google Drive API**: Documentos publicos, galeria de imagenes, contenido dinamico
- **YouTube Data API**: Ultimos videos del canal
- **Netlify**: Hosting + funciones serverless
