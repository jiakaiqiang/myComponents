const path = require("path");
function resolve(dir) {
  path.join(__dirname, dir);
}
module.exports = {
  lintOnSave:false,
  configureWebpack: {
    resolve: {
      extensions: ["js", "vue"],
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config){
    config.optimization.minimizer('terser').tap((args)=>{
      args[0].terserOptions.compress.drop_console=true
      return args
    })
  }
};
