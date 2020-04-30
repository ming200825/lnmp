docker 部署 nginx mysql5 mysql8 php56 php72 php73 php74 swoole java dotnet nodejs go pureftpd redis rabbitmq phpmyadmin mongodb



curl -fsSL https://get.docker.com/ | sh
systemctl start docker
systemctl enable docker
docker -venison

# curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
cp docker-compose-1.25.3 /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version 

vi /etc/docker/daemon.json
{
    "registry-mirrors": ["https://7peuoxyf.mirror.aliyuncs.com"]
}

#systemctl restart docker
systemctl daemon-reload

yum install unzip screen
systemctl status crond
