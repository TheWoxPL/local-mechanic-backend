const expectedTypes = ['fix', 'feat'];

module.exports = {
  plugins: [
    {
      rules: {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        'custom-type-enum': ({ type }: { type: string }) => {
          if (!expectedTypes.includes(type)) {
            return [
              false,
              `Type must be one of: ${expectedTypes.join(', ')} \nExample: feat: add new feature`
            ];
          }
          return [true];
        }
      }
    }
  ],
  rules: {
    'custom-type-enum': [2, 'always']
  }
};
