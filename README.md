```
██████╗  ██████╗  ██████╗ ███████╗ █████╗
██╔══██╗██╔═══██╗██╔═══██╗╚══███╔╝██╔══██╗
██████╔╝██║   ██║██║   ██║  ███╔╝ ███████║
██╔══██╗██║   ██║██║   ██║ ███╔╝  ██╔══██║
██████╔╝╚██████╔╝╚██████╔╝███████╗██║  ██║
╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝

```

React + NodeJS + Electron 项目开发模板。

https://github.com/yuri2peter/booza

## Features

- 前后端分离
- typescript支持
- 热更新开发预览
- 依赖共享
- webpack打包，减少release体积
- 高度可配置化的项目技术栈
- 自动化编译和打包脚本

## Quick Start

```sh
$ npm ci --silent
$ npm start
```

OR

```sh
$ sh init.sh
```

## File Structure

```
- assets 固定资源文件
- dev 开发脚本和工具
- dist 编译后代码和运行目录
- package 打包工具
- patches npm包补丁
- src/common 公共代码
- src/renderer 前端代码
- src/server 后端代码
```

## Configs

详见 [src/common/config.ts](src/common/config.ts)。
