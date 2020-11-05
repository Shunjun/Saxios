const envPreset = [
  '@babel/preset-env',
  {
    // 只导入需要的 polyfill
    useBuiltIns: 'usage',
    // 指定 corjs 版本
    corejs: 3,
    // 禁用模块化方案转换
    modules: false,
  },
];

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['@babel/preset-typescript', envPreset],
    plugins: [["@babel/plugin-proposal-class-properties", { "loose": true }]],
  };
};
