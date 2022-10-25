FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","--spring.config.name=application","-Duser.timezone=Asia/Seoul","/app.jar"]