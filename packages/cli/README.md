## 创建RMS 子项目的脚手架


### 创建子项目流程

rms-create [文件夹/项目名] --port [端口号] --id [模块名]
#### 1. 创建子项目
```
npx rms-create p rms-tools --port 3000 --id tools
```

#### 2. 更新子模块
```
 git submodule add --force git@gitlab.lezhilong.cn:frontend/components.git src/components

 git submodule update --init --recursive
```

#### 2. 配置基座项目 Framework
1. 注册子应用
```
src\microApps\index.ts
```
2. 配置菜单颜色和图标
```
src\store\modules\auth\index.ts
```
3. 配置子应用url
```
.env.*
```

#### 3. 配置菜单权限