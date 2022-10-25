FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
ARG ENV_FILE=build/libs/*.yml
COPY ${JAR_FILE} app.jar
COPY ${ENV_FILE} application.yml
ENTRYPOINT ["java","-jar","--spring.config.name=application","-Duser.timezone=Asia/Seoul","/app.jar"]