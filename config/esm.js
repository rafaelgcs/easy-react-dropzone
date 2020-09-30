import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'index.esm.js',
    dir: 'dist',
    name: 'dropzoneReact',
    format: 'esm'
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