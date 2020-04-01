FROM node:12.13.1-alpine


# 设置时区
ENV TIMEZONE=Asia/Shanghai
RUN mkdir -p /app && ln -snf /usr/share/zoneinfo/$TIMEZONE /etc/localtime && echo $TIMEZONE > /etc/timezone \
    && npm config set registry https://registry.npm.taobao.org/



# 创建应用目录 && 替换淘宝npm镜像

#COPY ../../www/app /app
ENTRYPOINT ["node","/app/app.js"]