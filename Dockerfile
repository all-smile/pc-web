# 基础镜像
FROM nginx:1.17.3
MAINTAINER xiao<find_onepiece@163.com>
# 解压并复制到nginx挂载目录 nginx容器内的路径
ADD pc-web.tar.gz /usr/share/nginx/html
# ADD pc-web.tar.gz /usr/local/webserver/nginx