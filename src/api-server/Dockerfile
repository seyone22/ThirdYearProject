# Use an official Python runtime as a parent image
FROM python:3.11.8-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Copy requirements file separately to leverage Docker cache
COPY requirements.txt /app/

# Install dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy the rest of the application code
COPY . /app/

# Add a non-root user
RUN adduser -D demoapp
USER demoapp

# Expose the port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD curl --fail http://localhost:5000/ || exit 1

# Run the application
CMD ["python", "app.py"]
