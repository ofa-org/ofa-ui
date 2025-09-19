# 组件库技术说明
ofa-ui 是一个基于 Vue 3 的组件库项目，采用 Monorepo 架构管理多个子包。该项目支持快速创建组件、主题定制和文档生成，目标用户是使用 Vue 3 技术栈的前端开发者。

- 模块化架构：采用 Monorepo 结构，各功能模块解耦清晰
- 现代化技术栈：基于 Vue 3、Vite、TypeScript 等现代前端技术
- 完善的工程化配置：支持按需引入、自动导入、样式隔离等
- 良好的扩展性：通过 ConfigProvider 和 hooks 提供灵活的配置能力
- 完整的开发体验：包含脚手架、测试、文档、构建等全流程工具

# 项目结构
项目采用 pnpm workspace 实现的 Monorepo 架构，包含以下核心包：

- @ofa-ui/cli - 组件脚手架工具
- @ofa-ui/components - 组件实现
- @ofa-ui/core - 核心架构和构建配置
- @ofa-ui/hooks - 自定义 Vue hooks
- @ofa-ui/locale - 国际化语言包
- @ofa-ui/theme - 样式和主题
- @ofa-ui/utils - 工具函数
- @ofa-ui/constants - 全局常量
- @ofa-ui/play - 本地开发调试环境
- @ofa-ui/docs - 文档网站

# 核心技术特性
## 组件系统
- 使用内置 `@ofa-ui/cli` 脚手架快速生成组件模板
- 使用 BEM 命名规范（通过自定义 useNamespace hook 实现）
- 支持组件按需引入和自动导入（通过 OfaResolver 实现）


## 样式系统
- 使用 Sass 作为 CSS 预处理器
- 实现了 BEM 命名方法论的样式架构
- 支持 CSS 变量主题定制
- 包含样式重置（reset.css）

##  国际化
- 多语言支持（中文简体、中文繁体、英文、日文）
- 通过 useLocale hook 实现语言切换
- 支持通过 ConfigProvider 组件进行全局配置

##  构建系统
- 使用 Vite 作为构建工具
- 支持两种构建格式：ES 模块和 UMD
- 集成 TypeScript 类型声明生成
- 支持组件样式自动导入

##  测试系统
- 使用 Vitest 进行单元测试
- 使用 Vue Test Utils 进行组件测试
 
# 实现细节


## 脚手架
ofa-cli 使用了以下第三方 npm 包：

- commander - 用于处理命令行参数和命令定义
- inquirer - 用于创建交互式命令行界面，提示用户输入信息
- ejs - 用于模板渲染，将组件模板文件生成具体组件文件
- fs-extra - 提供了比原生 fs 模块更强大的文件系统操作功能
- chalk - 用于美化终端输出，添加颜色和样式

### 1. 命令解析和定义
使用 `commander` 库定义了 component 命令及其别名 c：

```js
program
  .command('component').alias('c')
  .description('创建一个组件开发模板')
  .argument('[component-name]', '组件名称')
  .action(async (componentName, options) => {
    // 处理命令逻辑
  })
```

### 2. 用户交互
通过 `inquirer` 库实现用户交互，当用户未提供组件名称时提示输入：

```js
const questions = []
if (!name) {
  questions.push({
    type: 'input',
    name: 'componentName',
    message: '请选择组件名称:',
    validate: (value) => {
      if (!value.trim()) return '组件名称不能为空'
      return true
    },
  })
}

const answers = await inquirer.prompt(questions)
```

### 3. 模板渲染
使用 `ejs` 模板引擎渲染组件模板文件：

```js
if (extname(entry.name) === '.ejs') {
  const content = await fs.readFile(srcPath, 'utf8')
  const rendered = ejs.render(content, data, {
    escape: (str) => str,  // 自定义转义函数
  })
  await fs.writeFile(destPath, rendered)
}
```

### 4. 文件操作
通过 fs-extra 库进行文件和目录操作：

```js

// 检查目录是否存在
if (await fs.pathExists(targetDir)) {
  throw new Error(`组件目录 '${componentName}' 已存在`)
}

// 确保目录存在
await fs.ensureDir(targetDir)

// 读取目录内容
const entries = await fs.readdir(src, { withFileTypes: true })

// 复制文件
await fs.copy(srcPath, destPath)
```

### 5. 终端输出美化
使用 `chalk` 库美化终端输出：

```js
console.log(chalk.green(`组件 '${componentName}' 创建成功！`))
console.log(chalk.gray(`请到 ${targetDir} 目录下查看组件`))
```

### 工作流程
1. 运行命令 ofa-cli component [组件名]
2. commander 解析命令和参数
3. 如果未提供组件名，则使用 inquirer 提示用户输入
4. 验证目标目录是否已存在，避免覆盖
5. 准备模板数据（组件名的 PascalCase 形式等）
6. 使用 fs-extra 遍历模板目录
7. 对 .ejs 文件使用 ejs 渲染引擎生成实际文件
8. 对普通文件直接复制到目标目录
9. 使用 chalk 输出成功或失败信息

模板文件位于 packages/cli/template/components/temp/ 目录中

模板中使用 <%= variableName %> 语法插入变量，如组件名等。

## 主题样式

## 全局配置

## 国际化

## 文档网站

## 打包构建发布

### 打包配置

### 发包

### 自动部署文档网站

### 组件类型文件声明提示

<!-- unplugin-vue-components 生成 components.d 配个 Volar -->

## 测试/调试

### TDD开发模式

### 本地预览

