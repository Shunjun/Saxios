import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import camelCase from 'lodash.camelcase';
// import babel from '@rollup/plugin-babel'
import typescript2 from 'rollup-plugin-typescript2';
import sourceMaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete';
import alias from '@rollup/plugin-alias';

const pkg = require('./package.json');

const libraryName = pkg.name;

export default {
  input: `src/core/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  // 在这里注明你不想包含在捆绑包中的外部模块（例如：'lodash'）
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    // babel({ babelHelpers: 'bundled' })
    typescript2({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    sourceMaps(),
    del({ targets: 'dist/*' }),
    alias({
      entries: {
        '@': path.resolve(__dirname, 'src'),
      },
    }),
  ],
};
