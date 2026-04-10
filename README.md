# Apellidos v2

Una aplicación moderna de Next.js para explorar información sobre apellidos hispanos. La interfaz permite buscar, filtrar por letra inicial y acceder a documentos PDF con información detallada.

## ✨ Características

- 🔍 **Barra de búsqueda** en tiempo real para encontrar apellidos
- 📑 **Navegación por letra** A-Z para explorar categorías
- 📄 **Vista de PDFs** con soporte para desktop (abrir en nueva pestaña) y mobile (descargar)
- 💻 **Interfaz amigable** construida con React y Tailwind CSS
- 🐳 **Docker y Docker Compose** listos para production
- ⚡ **Optimizado** con Next.js 16 y Turbopack

## 🛠️ Stack Tecnológico

- **Next.js 16.2.3** - React framework con App Router
- **TypeScript** - Para seguridad de tipos
- **Tailwind CSS 4** - Estilos utilitarios
- **Lucide React** - Iconos modernos
- **Node.js 22** - Runtime de JavaScript
- **Docker** - Containerización

## 📋 Requisitos Previos

- Node.js 22.x o superior
- npm 10.x o superior
- Docker y Docker Compose (opcional, para despliegue)

## 🚀 Instalación Local

### 1. Verificar requisitos
```bash
node --version   # Debe ser v22.x o superior
npm --version    # Debe ser 10.x o superior
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### 4. Construir para production
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
apellidos-v2/
├── app/
│   ├── api/
│   │   └── pdfs/
│   │       └── route.ts          # API endpoint para PDFs
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── components/
│   ├── SearchBar.tsx             # Barra de búsqueda
│   ├── LetterNavigation.tsx       # Botones por letra
│   └── PdfCard.tsx               # Tarjeta de PDF
├── lib/
│   └── pdfs.ts                   # Utilidades para escanear PDFs
├── public/                       # Archivos estáticos
├── apellidos/                    # PDFs organizados por letra
│   ├── A/
│   ├── B/
│   └── ...
├── Dockerfile                    # Configuración Docker
├── docker-compose.yml            # Orquestación Docker
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Cómo funciona

### Fuente de datos
Los PDFs se encuentran en la carpeta `/apellidos`, organizados por letra inicial:
- `/apellidos/A/` - Apellidos que comienzan con A
- `/apellidos/B/` - Apellidos que comienzan con B
- etc.

Cada carpeta contiene dos versiones de cada PDF:
- `apellido.pdf` - Versión original
- `apellido-clean.pdf` - Versión limpia/procesada

### API de PDFs
El endpoint `/api/pdfs` proporciona:
- `GET /api/pdfs` - Obtener todos los PDFs organizados por letra
- `GET /api/pdfs?action=search&query=term` - Buscar PDFs por nombre
- `GET /api/pdfs?action=letter&letter=A` - Obtener PDFs de una letra
- `GET /api/pdfs?action=letters` - Obtener letras disponibles

### Frontend
- **SearchBar** - Busca en tiempo real mientras escribes
- **LetterNavigation** - Filtros por letra A-Z
- **PdfCard** - Muestra cada PDF con opción de abrir/descargar

## 🐳 Despliegue con Docker

### 1. Construir imagen Docker
```bash
docker build -t apellidos-v2 .
```

### 2. Ejecutar con Docker Compose
```bash
docker-compose up
```

La aplicación estará disponible en `http://localhost:3000`

### 3. Detener el contenedor
```bash
docker-compose down
```

### Notas sobre Docker
- El Dockerfile usa multi-stage build para optimizar el tamaño
- Incluye health check para monitoreo
- Los PDFs se montan como volumen read-only
- En production, soporta la variable de entorno `NEXTAUTH_URL`

## 📝 Scripts disponibles

- `npm run dev` - Iniciar servidor de desarrollo con hot reload
- `npm run build` - Construir aplicación para production
- `npm start` - Ejecutar aplicación en production
- `npm run lint` - Ejecutar ESLint para verificar código

## 🚧 Próximos pasos

### Backend
Este proyecto actualmente sirve archivos PDF desde el sistema de archivos local. Para una versión futura con backend:

1. Crear API backend (Node.js, Python, etc.)
2. Almacenar metadatos en base de datos
3. Actualizar `/api/pdfs` para consumir backend
4. Separar frontend y backend en contenedores diferentes

### Mejoras sugeridas
- [ ] Agregar paginación para listas grandes
- [ ] Implementar filtros avanzados
- [ ] Agregar información de vista previa de PDF
- [ ] Sistema de favoritos/guardados
- [ ] Modo oscuro
- [ ] Soportar múltiples idiomas

## 🐛 Troubleshooting

### El servidor no inicia
```bash
# Limpiar cache y reinstalar
rm -rf .next node_modules
npm install
npm run dev
```

### PDFs no se encuentran
```bash
# Verificar que la carpeta apellidos existe
ls -la apellidos/

# Verificar permisos
chmod -R 755 apellidos/
```

### Error de puerto 3000 en uso
```bash
# Cambiar puerto (en package.json o usar flag)
npm run dev -- -p 3001
```

## 📄 Licencia

Ver archivo [LICENSE](LICENSE)

