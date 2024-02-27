# Bee monorepo

## 前言

Bee monorepo 是一个全栈项目，包含了后台管理系统和后端服务。

1. <strong>husky</strong> 在提交时自动 lint 提交de消息、代码和运行测试
2. <strong>lerna</strong> 管理和发布包，开发环境监听文件改动并自动构建包
3. <strong>nx</strong> 可配置本地和远程缓存，加快构建时间，lerna 的缓存依赖 nx,多人开发时可以共享远程缓存，并提供 projects
   graph 可视化
4. <strong>/apps</strong> 目录下是项目
5. <strong>/packages</strong> 目录下是项目依赖包
    - <strong>/common</strong> 公共包
    - <strong>/backend</strong> 仅后端
    - <strong>/frontend</strong> 仅前端

## 运行项目

前置条件：
> 安装 [pnpm](https://pnpm.io/installation)

### 一、监听并打包子项目

```bash
pnpm run watch:pkg
```

### 二、运行后台管理系统

```bash
# 分别运行 server 和 admin 项目 
pnpm run server:dev
pnpm run admin:dev
```

```bash
# 同时运行 server 和 admin 项目 
pnpm run admin:server:dev
```

## 提交规范

### 一、Commit

git add xx 之后，使用如下命令提交代码，然后 husky 会自动运行 lint-staged 和 commitlint

```bash
git commit -m ""
```

### 二、Version and Publish

```bash
lerna version --no-private
```

```bash
lerna publish --no-private
```
