import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    dir: 'dist',
    name: 'dropzoneReact',
    format: 'cjs'
  },
  external: [
    '@material-ui/core',
    '@material-ui/icons',
    'notistack',
    'react',
    'react-dom',
    'react-dropzone'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ]
};