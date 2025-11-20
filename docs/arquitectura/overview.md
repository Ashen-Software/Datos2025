Arquitectura Detallada
----------------------

### 1\. Orquestación y Ejecución (GitHub Actions)

#### Workflows Implementados

**check-updates.yml** (Liviano - Ejecución Semanal/Mensual)

*   **Trigger:** Cron programado + activación manual
    
*   **Función:** Verifica cambios en fuentes usando Requests + BeautifulSoup
    
*   **Salida:** Dispara ETL completo solo si detecta cambios
    
*   **Costo:** Mínimo (ejecución rápida sin contenedores)
    

**full-etl.yml** (Completo - Solo cuando hay cambios)

*   **Trigger:** Desde check-updates o manual
    
*   **Contenedor:** Playwright + Python para extracción robusta
    
*   **Proceso:** Extracción → Transformación → Carga
    
*   **Costo:** Solo cuando es necesario (2-3 meses)
    

### 2\. Sistema de Logs y Monitorización

#### Estrategia de Logs Multi-nivel

**Nivel 1: Logs Estructurados en GitHub Actions**

*   Logs nativos de ejecución de workflows
    
*   Captura de stdout/stderr de todos los scripts
    
*   Retención automática según política de GitHub

**Nivel 2: Métricas de Performance**

*   Tiempos de ejecución por fuente
    
*   Volumen de datos procesados
    
*   Tasa de éxito/error por componente
    

#### Sistema de Alertas Multi-canal

**1\. GitHub Native Integrations**

*   Notificaciones email nativas sobre fallos de workflows
    
*   Configuración directa en repository settings

**2\. Custom Email Service**

*   Servicio SMTP gratuito (SendGrid, Mailjet free tier)
    
*   Notificaciones para stakeholders no técnicos
    

### 3\. Procesamiento de Datos (ETL)

#### Tecnologías Clave

*   **Python 3.9+**: Lenguaje principal
    
*   **Playwright**: Extracción robusta en sitios complejos
    
*   **Pandas**: Transformación y limpieza de datos
    
*   **BeautifulSoup**: Scraping liviano para detección
    
*   **Supabase Python Client**: Carga eficiente
    

#### Estrategia de Procesamiento

1.  **Extracción Resiliente**: Reintentos automáticos con backoff
    
2.  **Validación en Tiempo Real**: Schemas, rangos, consistencia
    
3.  **Procesamiento Incremental**: Solo datos nuevos/cambiados
    
4.  **Idempotencia**: UPSERTs para evitar duplicados
    

### 4\. Almacenamiento y Backend (Supabase)

#### Esquema de Base de Datos

DEFINIR

#### Optimizaciones para Dashboard

*   Vistas materializadas para consultas frecuentes
    
*   Índices en campos de filtro común (fecha, entidad, territorio)
    
*   Políticas RLS para seguridad de datos
    

### 5\. Frontend y Despliegue

#### Stack Tecnológico

*   **Angular 16+**: Framework principal
    
*   **Tailwind CSS**: Estilización y responsive design
    
*   **Supabase JS Client**: Conexión directa a datos
    
*   **Chart.js/NGX-Charts**: Visualizaciones de datos
    

#### Estrategia de Despliegue

*   **Vercel/Netlify**: Despliegue continuo desde main branch
    
*   **Variables de Entorno**: Configuración segura de endpoints
    
*   **CDN Global**: Distribución optimizada de assets
    

Plan de Implementación por Hitos
--------------------------------

### Hito 1: Infraestructura Base

*   Configuración de repositorio y GitHub Actions
    
*   Esquema de base de datos en Supabase
    
*   Sistema de logging básico
    

### Hito 2: Detección de Cambios

*   Scrapers livianos para las 3 fuentes
    
*   Lógica de comparación y trigger
    
*   Configuración de alertas básicas
    

### Hito 3: ETL Completo

*   Contenedor Playwright + dependencias
    
*   Pipelines de transformación por fuente
    
*   Mecanismos de carga y UPSERT
    

### Hito 4: Dashboard

*   Aplicación Angular base
    
*   Visualizaciones principales
    
*   Despliegue en Vercel/Netlify
    

### Hito 5: Monitorización Avanzada

*   Dashboards de métricas ETL
    
*   Alertas proactivas
    
*   Documentación operativa
    

Estimación de Costos
--------------------

### Capa Gratuita Disponible

*   **GitHub Actions**: ~2,000 minutos/mes (suficiente para uso estimado)
    
*   **Supabase**: 500MB base de datos + 1GB storage (adecuado para inicio)
    
*   **Vercel/Netlify**: Despliegue frontend gratuito
    
*   **Slack**: Webhooks gratuitos para alertas
    

### Puntos de Escalación Futura

*   Supabase Pro: >500MB de datos o >50k filas/mes
    
*   GitHub Actions: >2,000 minutos/mes de procesamiento
    
*   Monitorización: Migración a DataDog si requiere analytics avanzados
    

Runbook Operativo
-----------------

### Procedimientos Comunes

1.  **Ejecución Manual ETL**: Trigger via GitHub UI
    
2.  **Debug de Fallos**: Revisión de logs en GitHub Actions + tabla etl\_logs
    
3.  **Recuperación de Errores**: Re-ejecución con limpieza opcional de datos corruptos
    
4.  **Actualización de Scrapers**: Modificación de selectores ante cambios en fuentes
    

### Métricas de Salud

*   Tiempo de ejecución promedio por fuente
    
*   Tasa de éxito de extracción (>95% objetivo)
    
*   Latencia datos fuente → dashboard (<24 horas)
    
*   Disponibilidad del dashboard (>99.5%)