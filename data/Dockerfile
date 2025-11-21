# data/Dockerfile
FROM python:3.12-slim

# Dependencias del sistema (ampliar cuando agreguemos Playwright)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    ca-certificates \
    gnupg \
    wget \
    # utilidades
    unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar requirements e instalarlas (se copiará el archivo requirements.txt)
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copiar el código
COPY . /app

# Variables por defecto
ENV SUPABASE_URL=""
ENV SUPABASE_SERVICE_KEY=""
ENV CONFIG_OBJECT_NAME="sources_config.json"
ENV CONFIG_POLL_INTERVAL=300
ENV WEBHOOK_SECRET=""

# Exponer puerto del webhook listener
EXPOSE 8000

# Entry point por defecto
CMD ["python", "scheduler/runner.py"]
