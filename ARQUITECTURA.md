# Arquitectura del Sistema - Reto Gas Natural

## 📋 Resumen del Reto

**Objetivo General:** Desarrollar un proceso ETL automatizado que integre datos públicos de producción, demanda y regalías de gas natural, consolidándolos en un dashboard interactivo para consulta y análisis en tiempo real.

**Objetivos Específicos:**
- OE1: Diseñar e implementar proceso ETL que extraiga y consolide datos de ANH, MME y UPME
- OE2: Generar archivo de salida actualizado (Excel/CSV) con información estandarizada y validada
- OE3: Construir dashboard interactivo para visualizar evolución por entidad, período y territorio

## 🏗️ Arquitectura Propuesta

### Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  Dashboard Interactivo (React + D3.js/Chart.js)            │
│  - Visualizaciones de producción, demanda y regalías       │
│  - Filtros por entidad, período, territorio                │
│  - Exportación de datos                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API
┌──────────────────────┴──────────────────────────────────────┐
│                        BACKEND                               │
│  API REST (FastAPI)                                          │
│  - Endpoints para consulta de datos                         │
│  - Autenticación y autorización                              │
│  - Exportación de archivos (Excel/CSV)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                    BASE DE DATOS                             │
│  PostgreSQL / SQLite                                         │
│  - Almacenamiento de datos consolidados                     │
│  - Histórico de ejecuciones ETL                             │
│  - Metadatos de fuentes                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                    PROCESO ETL                               │
│  Scripts Python (Scheduled Tasks)                            │
│  ├── Extract: Scraping/API de ANH, MME, UPME               │
│  ├── Transform: Limpieza, validación, estandarización        │
│  └── Load: Carga a BD y generación de archivos              │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** React 18+ con TypeScript
- **Visualización:** 
  - Recharts o Chart.js para gráficos
  - Leaflet o Mapbox para mapas de Colombia
- **UI Components:** Material-UI o Ant Design
- **Estado:** React Query para gestión de datos del servidor
- **Build:** Vite

### Backend
- **Framework:** FastAPI (Python)
- **ORM:** SQLAlchemy
- **Validación:** Pydantic
- **Documentación:** Swagger/OpenAPI automático

### ETL
- **Lenguaje:** Python 3.11+
- **Librerías:**
  - `pandas` - Manipulación de datos
  - `requests` / `httpx` - Extracción de datos
  - `beautifulsoup4` / `selenium` - Web scraping si es necesario
  - `openpyxl` / `xlsxwriter` - Generación de Excel
  - `sqlalchemy` - Conexión a base de datos
  - `pydantic` - Validación de datos
  - `schedule` / `APScheduler` - Programación de tareas

### Base de Datos
- **Producción:** PostgreSQL
- **Desarrollo:** SQLite (para simplicidad inicial)

### Infraestructura
- **Contenedores:** Docker y Docker Compose
- **Orquestación ETL:** 
  - APScheduler para ejecución programada
  - Alternativa: GitHub Actions / Cron jobs

## 📁 Estructura del Proyecto

```
Datos2025/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/            # Páginas principales
│   │   ├── services/         # Clientes API
│   │   ├── hooks/            # Custom hooks
│   │   └── utils/            # Utilidades
│   ├── public/
│   └── package.json
│
├── backend/                  # API FastAPI
│   ├── app/
│   │   ├── api/              # Endpoints
│   │   ├── models/           # Modelos SQLAlchemy
│   │   ├── schemas/          # Schemas Pydantic
│   │   ├── services/         # Lógica de negocio
│   │   └── main.py           # Aplicación principal
│   ├── alembic/              # Migraciones DB
│   └── requirements.txt
│
├── data/                     # Scripts ETL y scrapers
│   ├── extractors/           # Extractores por fuente
│   │   ├── anh.py            # Extracción ANH
│   │   ├── mme.py            # Extracción MME
│   │   └── upme.py           # Extracción UPME
│   ├── transformers/         # Transformadores
│   │   ├── standardizer.py   # Estandarización
│   │   └── validator.py      # Validación
│   ├── loaders/              # Cargadores
│   │   ├── database.py       # Carga a BD
│   │   └── file_generator.py # Generación Excel/CSV
│   ├── orchestrator.py       # Orquestador ETL
│   └── requirements.txt
│
├── docker-compose.yml        # Orquestación de servicios
├── .env.example              # Variables de entorno
└── README.md
```

## 🔄 Flujo de Datos

### 1. Proceso ETL (Automático - Diario/Semanal)

```
┌─────────────┐
│   Fuentes   │
│  ANH, MME,  │
│    UPME     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  EXTRACT    │  ← Scraping/API calls
│  (Raw Data) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ TRANSFORM   │  ← Limpieza, validación, estandarización
│ (Cleaned)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   LOAD      │  ← Carga directa a BD + Generación Excel/CSV
│ (Database)  │
└─────────────┘
```

### 2. Consulta de Usuario

```
Usuario → Frontend → Backend API → Base de Datos → Respuesta JSON → Visualización
```

## 📊 Modelo de Datos

### Tablas Principales

1. **gas_production** - Producción de gas natural
   - id, fecha, campo, entidad, volumen, unidad, territorio

2. **gas_demand** - Demanda de gas natural
   - id, fecha, sector, entidad, volumen, unidad, territorio

3. **gas_royalties** - Regalías de gas natural
   - id, fecha, campo, entidad, monto, territorio

4. **etl_executions** - Historial de ejecuciones ETL
   - id, fecha_ejecucion, fuente, estado, registros_procesados, errores

5. **data_sources** - Metadatos de fuentes
   - id, nombre, url, tipo, ultima_actualizacion

## 🔌 Endpoints API Propuestos

### Datos
- `GET /api/v1/production` - Producción con filtros
- `GET /api/v1/demand` - Demanda con filtros
- `GET /api/v1/royalties` - Regalías con filtros
- `GET /api/v1/consolidated` - Datos consolidados

### Exportación
- `GET /api/v1/export/excel` - Descargar Excel consolidado
- `GET /api/v1/export/csv` - Descargar CSV consolidado

### Metadatos
- `GET /api/v1/sources` - Información de fuentes
- `GET /api/v1/executions` - Historial de ejecuciones ETL
- `GET /api/v1/stats` - Estadísticas generales

## ⚙️ Automatización ETL

### Opciones de Ejecución

1. **APScheduler** (Recomendado para desarrollo)
   - Ejecución programada dentro de la aplicación
   - Fácil de configurar y depurar

2. **Cron Jobs** (Producción)
   - Tareas programadas del sistema
   - Más robusto para producción

3. **GitHub Actions** (Alternativa)
   - Si se requiere ejecución en la nube
   - Útil para CI/CD

### Frecuencia Sugerida
- **Producción:** Diaria (cada 24 horas)
- **Demanda:** Semanal (según disponibilidad de datos)
- **Regalías:** Mensual (según ciclo de liquidación)

## 🔒 Consideraciones de Seguridad

- Validación de inputs en API
- Rate limiting
- CORS configurado apropiadamente
- Variables de entorno para credenciales
- Logging de operaciones críticas

## 📈 Escalabilidad

- Cache de consultas frecuentes (Redis opcional)
- Paginación en endpoints
- Índices en base de datos
- Compresión de respuestas grandes

## 🚀 Próximos Pasos

1. Configurar estructura de carpetas
2. Implementar extractores básicos para cada fuente
3. Crear modelos de base de datos
4. Desarrollar API básica
5. Construir dashboard frontend
6. Implementar automatización ETL
7. Testing y validación

