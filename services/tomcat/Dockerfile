FROM tomcat:8-jre8 
LABEL maintainer="hopher <565983236@qq.com>"

# 设置服务根目录
ENV SERVICE_PATH ./services/tomcat

#RUN apt-get update
ENV CATALINA_HOME /usr/local/tomcat
WORKDIR $CATALINA_HOME

COPY $SERVICE_PATH/config/server.xml  conf/
COPY $SERVICE_PATH/config/ssl conf/ssl

# catalina.sh: /usr/local/tomcat/bin/catalina.sh
ENV JAVA_OPTS="-Djava.security.egd=file:/dev/../dev/urandom -Duser.timezone=GMT+08 -Dorg.apache.el.parser.SKIP_IDENTIFIER_CHECK=true"
CMD ["catalina.sh", "run"]