cd $(dirname $0)
pwd
# ls
# npm install -g yarn
# yarn
# # 清理缓存
rm -rf node_modules/.cache
rm -rf dist
# 打包
npm run build
# 进入打包目录
cd dist
tar -zcvf pc-web.tar.gz ./*
cd ..
mkdir -p docker
mv dist/pc-web.tar.gz docker/
cp -r Dockerfile docker/
cd docker
ls
docker build -t pc-web:latest .
