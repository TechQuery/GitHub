# GitHub 中文版

基于 WebCell v3 + Parcel 2 构建的现代化 GitHub 中文版应用，支持 PWA。

## 技术栈

1. **编程语言**：[HTML 5][html5]、[CSS 3][css3]、[TypeScript][typescript]

2. **Web 组件化框架**：[WebCell v3](https://github.com/EasyWebApp/WebCell) - 基于 Stage-3 装饰器的现代 Web 组件框架

3. **状态管理**：[MobX](https://mobx.js.org/) + [MobX-RESTful](https://github.com/idea2app/MobX-RESTful)

4. **路由管理**：[cell-router](https://github.com/EasyWebApp/cell-router)

5. **构建工具**：[Parcel 2](https://parceljs.org/) - 零配置构建工具

6. **包管理器**：[PNPM](https://pnpm.io/) - 高效的包管理器

7. **UI 框架**：[Bootstrap 5](https://getbootstrap.com/) (工具类) + [BeerCSS](https://beercss.com/) (组件)

8. **代码质量**：[ESLint 9](https://eslint.org/) + [TypeScript ESLint](https://typescript-eslint.io/)

9. **开放数据**：[GitHub REST API v3](https://docs.github.com/en/rest)

## 特性

- ✅ **现代化架构**：使用 WebCell v3 Stage-3 装饰器语法
- ✅ **类型安全**：完整的 TypeScript 类型支持
- ✅ **代码分离**：异步加载非首页路由，优化加载性能
- ✅ **PWA 支持**：完整的 Progressive Web App 体验
- ✅ **响应式设计**：适配各种设备尺寸
- ✅ **实时数据**：直接使用 GitHub API 获取真实数据

## 开发

```bash
# 安装依赖
pnpm install

# 开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint

# 自动修复代码风格
pnpm lint --fix
```

## 部署

构建后的文件在 `dist/` 目录中，可直接部署到任何静态文件服务器。

## 技术参考

1. [WebCell 官方文档](https://web-cell.dev/)
2. [Web Components 标准](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)
3. [MobX 文档][mobx-docs]
4. [Parcel 文档][parcel-docs]

[html5]: https://developer.mozilla.org/zh-CN/docs/Web/HTML
[css3]: https://developer.mozilla.org/zh-CN/docs/Web/CSS
[typescript]: https://www.typescriptlang.org/
[mobx-docs]: https://mobx.js.org/
[parcel-docs]: https://parceljs.org/
