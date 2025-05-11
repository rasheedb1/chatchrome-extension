chatchrome-extension/
├── public/
│   └── manifest.json             ✅ Manifest de la extensión
├── src/
│   ├── background.ts             ✅ Script de fondo para screenshot
│   ├── contentScript.ts         ✅ Script inyectado con UI
│   ├── injectChatUI.ts          ✅ Agrega el ChatUI al DOM
│   ├── helpers/
│   │   ├── getScreenshot.ts     ✅ Usa chrome API
│   │   ├── getDom.ts            ✅ Extrae HTML
│   │   ├── sendToWebhook.ts     ✅ POST a n8n
│   │   └── executeAction.ts     ✅ Ejecuta botones DOM
│   └── components/
│       ├── ChatUI.tsx           ✅ Chat con useChat
│       └── DynamicActions.tsx   ✅ Renderiza botones UI
├── pages/
│   └── api/
│       └── n8n-adapter.ts       ✅ Adaptador para el SDK
├── vite.config.ts               ✅ Compilador
├── tsconfig.json                ✅ TypeScript
├── package.json                 ✅ Dependencias
├── README.md
