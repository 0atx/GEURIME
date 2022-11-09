FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
VOLUME ["/spring/logs"]
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul","/app.jar"]