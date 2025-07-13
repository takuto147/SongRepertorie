# ① Build ステージ（Maven & JDK）
FROM maven:3.9.10-eclipse-temurin-21-jdk AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ② 実行ステージ（軽量ランタイム）
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
