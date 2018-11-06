const {
  getRemotePackageInfo,
  getRemotePackages,
} = require('../index');
const { extended } = require('./types');
const { clients } = require('./constants');

describe('remote package', () => {
  clients.forEach((client) => {
    it(`${client} remote package info`, () => {
      const info = getRemotePackageInfo({
        name: 'react',
        client,
        key: 'description',
      });
      expect(typeof (info)).toBe('string');
    });
  });

  it('get remote packages', async () => {
    const packages = await getRemotePackages({
      text: '@babel/',
    });
    expect(Array.isArray(packages)).toBeTruthy();
    if (packages.length > 0) {
      expect(packages).toContainEqual(expect.objectContaining(extended));
    }
  });
});
