import typescript from '@rollup/plugin-typescript';

const shared = {
  input: 'src/index.ts',
  external: ['react', 'react-dom'],
};

export default [
  {
    ...shared,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        outDir: 'dist/esm',
      }),
    ],
  },
  {
    ...shared,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        outDir: 'dist/cjs',
      }),
    ],
  },
];
