# Multi-stage build for Spring Boot application
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy Maven configuration
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy generated JAR
COPY --from=builder /app/target/*.jar app.jar

# Render will provide the PORT environment variable
EXPOSE 8080

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]