# 构建阶段
FROM node:20.9.0-alpine AS builder

WORKDIR /app

# 安装指定版本 yarn
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

COPY package.json yarn.lock* ./

# 安装依赖（包含devDependencies，保证astro可用）
RUN yarn install --frozen-lockfile
# 修复 Astro CLI 权限问题
RUN chmod -R +x node_modules/.bin

COPY . .
# 单独修复 astro CLI 权限
RUN chmod +x node_modules/.bin/astro

RUN yarn build

# 生产运行阶段
FROM node:20.9.0-alpine

WORKDIR /app

# 安装指定版本 yarn
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

COPY --from=builder /app/package.json /app/yarn.lock* ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.astro ./.astro
COPY --from=builder /app/public ./public

RUN yarn install --production --frozen-lockfile

EXPOSE 4321

CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "4321"]
