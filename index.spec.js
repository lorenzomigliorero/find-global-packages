const {
  getRemotePackageInfo,
  getGlobalPackages,
  getGlobalPackagePath,
  getGlobalDir,
} = require('./index');

['yarn', 'npm'].forEach((client) => {
  it(`${client} global dir`, () => {
    const dir = getGlobalDir({ client });
    expect(typeof dir).toBe('string');
  });

  it(`${client} global package path`, () => {
    const path = getGlobalPackagePath({
      name: 'yarn',
      client,
    });
    console.log(path);
    expect(typeof path).toBe('string');
  });

  it(`${client} global packages`, () => {
    const packages = getGlobalPackages({ client });
    expect(Array.isArray(packages)).toBeTruthy();
    if (packages.length > 0) {
      expect(packages).toContainEqual(expect.any(String));
    }
  });

  it(`${client} global packages extended`, () => {
    const packages = getGlobalPackages({
      scope: '@aquestsrl',
      client,
      extended: true,
    });
    expect(Array.isArray(packages)).toBeTruthy();
    if (packages.length > 0) {
      expect(packages).toContainEqual(expect.objectContaining({
        name: expect.any(String),
        description: expect.any(String),
        version: expect.any(String),
      }));
    }
  });

  it(`${client} remote package info`, () => {
    const info = getRemotePackageInfo({
      name: 'react',
      client,
      key: 'description',
    });
    expect(typeof (info)).toBe('string');
  });
});
