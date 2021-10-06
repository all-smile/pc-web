# 基础镜像
FROM nginx:1.17.3
# 解压并复制到nginx挂载目录
ADD pc-web.tar.gz /usr/share/nginx/html