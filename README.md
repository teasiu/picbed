# GitHub PicBed For MWeb

MWeb 是 macOS/iOS 上的一款优秀的 MarkDown 编辑器，其内嵌的图片上传功能方便快捷，目前已经支持许多知名图床和对象存储，但并未适配 GitHub 仓库 + JsDelivr CDN 这种图床方案。

万幸的是，MWeb 提供了自定义图床的功能，通过本项目的接口作为桥接器，MWeb 可以十分优雅地上传图片至 GitHub 仓库，并自动插入至 MarkDown 中。

## 使用方法

本项目可以快速部署至 Vercel 上。

1. Fork 本项目
2. 在 Vercel 中 Import 本项目
3. 在 Vercel 添加环境变量
    `REPO`：存放图片 GitHub 仓库名（如 teasiu/pic）
    `TOKEN`：GitHub Personal Access Token（自己找一找在哪里生成，只需要给 Repo 权限即可）
    `SECRET`：通信密钥（自己设定一个，后面要用到）
4. 重新触发一次 Vercel Build
5. 记录下 Vercel 分配的域名
6. 在 MWeb 中添加自定义图床，配置如下图：
7. Enjoy~

## 关于合规性

目前关于是否允许将 GitHub + JsDelivr 用作图床尚有争议，个人认为作为独立开发者在不滥用的前提下将其用作图床可以接受，但不认可将其用作个人网盘或存储大量大型文件的行为

## 感谢❤️
