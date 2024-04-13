import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import terser from '@rollup/plugin-terser';

export default {
  input: './src/leaflet_rollup.js', // バンドル対象のファイル名
  output: {
    file: './dist/bundle.js', // 出力ファイル名
    format: 'esm', // ESモジュール形式で出力する
    sourcemap: true, // ソースマップを作成(元jsファイルでデバッグできる)
  },

  plugins: [
    peerDepsExternal(), // 重複した依存関係を削除(バンドルサイズを削減)
    del({ targets: 'dist/*' }), // 出力先を削除
    css({ output: 'bundle.css' }), // importしたcssファイルの出力先
    resolve(), // importしたライブラリの依存関係を解決して、node_moduleから見つける
    commonjs(), // commonjs形式のライブラリを読み込み可能にする
    terser(), // minify(圧縮)
  ],
};
