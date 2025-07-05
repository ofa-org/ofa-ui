#!/usr/bin/env node
import { program } from 'commander'
import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import inquirer from 'inquirer'
import ejs from 'ejs'
import fs from 'fs-extra'

// 获取ES模块中的__filename和__dirname等效值
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 动态导入chalk（因为它是纯ESM包）
const importChalk = import('chalk')

// 项目配置
const { version } = JSON.parse(
  await fs.readFile(join(__dirname, '../package.json'), 'utf8')
)

async function main () {
  const { default: chalk } = await importChalk

  // 创建组件命令
  program
    .command('component').alias('c')
    .description('创建一个组件开发模板')
    .argument('[component-name]', '组件名称')
    .action(async (componentName, options) => {
      try {
        const answers = await promptForMissingComponent(componentName, options)
        await createComponent(answers)
        console.log(chalk.green(`🎉 组件 '${answers.componentName}' 创建成功!`))
      } catch (error) {
        console.error(chalk.red(`创建组件失败: ${error.message}`))
        process.exit(1)
      }
    })

  // 解析命令行参数
  program.parse(process.argv)
}

// 提示用户输入组件信息
async function promptForMissingComponent (name, options) {
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

  return {
    componentName: name || answers.componentName,
    dir: './packages/components',
  }
}


// 创建组件
async function createComponent ({ componentName, dir }) {
  const projectDir = process.cwd()
  const targetDir = join(projectDir, dir, componentName)
  const templateDir = join(__dirname, '../template/components/temp')

  if (await fs.pathExists(targetDir)) {
    throw new Error(`组件目录 '${componentName}' 已存在`)
  }

  await fs.ensureDir(targetDir)

  const templateData = {
    name: componentName,
    // 小写
    nameLower: componentName.toLowerCase(),
  }

  await renderTemplateFiles(templateDir, targetDir, templateData)
}

// 渲染模板文件
async function renderTemplateFiles (src, dest, data) {
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    let newFileName = entry.name.replace(/\.ejs$/, '')

    // 示例：根据组件名添加前缀或后缀
    if (newFileName === 'index.vue.ejs') {
      newFileName = `${templateData.name}.vue`
    }

    const destPath = join(dest, newFileName)

    if (entry.isDirectory()) {
      await fs.ensureDir(destPath)
      await renderTemplateFiles(srcPath, destPath, data)
    } else {
      if (extname(entry.name) === '.ejs') {
        const content = await fs.readFile(srcPath, 'utf8')
        const rendered = ejs.render(content, data, {
          escape: (str) => str,
        })
        await fs.writeFile(destPath, rendered)
      } else {
        await fs.copy(srcPath, destPath)
      }
    }
  }
}

// 转换为 PascalCase
function toPascalCase (str) {
  return str
    .split(/[^a-zA-Z0-9]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

// 启动程序
main().catch((err) => {
  console.error('程序执行出错:', err)
  process.exit(1)
})