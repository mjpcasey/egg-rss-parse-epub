/**
 * 预编译js文件(只能预编译模块化的包)
 * 使用方式: 
 * 1. 在package.json中配置好预编译命令, 启动预编译命令之后再进行开发.
 * 2. 生产环境中在DllReferencePlugin忽略要编译的包, 并在html模板上引入预编译过后的dll文件
 */
// 1. path.join('字段1','字段2'....) 使用平台特定的分隔符把所有的片段链接生成相对路径,遇到..和../时会进行相对路径计算
// 2. path.resolve('字段1','字段2'....) 从右到左拼接路径片段,返回一个相对于当前工作目录的绝对路径,当遇到/时表示根路径,遇到../表示上一个目录, 如果还不是完整路径则自动添加当前绝对路径
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 整个项目的根目录
const root = path.join(__dirname);
// 预编译文件配置项
const configs = {
  // 预编译后文件的输出目录
  outputPath: path.join(root, 'dll')
}

module.exports = {
  // 入口文件
  entry: {
    // 键为抽取后的js文件名称, 数组中如果为node_modules文件夹里的包,则直接写名, 如果是其他位置的包则写入路径(绝对路径)
    vendor: []
  },
  // 查找解析入口文件entry所在的根目录文件夹, 默认为项目的根目录
  context: root,
  // 输出文件
  output: {
    // 输出目录
    path: configs.outputPath,
    // 输出的文件名
    filename: "[name]_dll.js",
    // 配置这项作为变量声明导出(script引入后在全局作用域可用)
    library: "[name]_[hash:8]",
    // 默认导出的类型(不同类型使用时引入方式不一样)
    // libraryTarget: 'var'
  },
  mode: 'production',
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      // 生成的json文件路径
      path: path.join(configs.outputPath, "[name]_manifest.json"),
      name: "[name]_[hash:8]",
      // 上下文环境路径, 必填，为了与DllReferencePlugin存在与同一上下文中）
      context: root
    })
  ]
};