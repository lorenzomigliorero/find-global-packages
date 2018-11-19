const {
  getGlobalDir,
  getGlobalPackagePath,
  getGlobalPackages,
  checkIfPackageIsGloballyInstalled,
} = require('../index');
const { extended } = require('./types');
const { clients } = require('./constants');

describe('global function', () => {
  clients.forEach((client) => {
    it.only(`${client} global dir`, () => {
      const dir = getGlobalDir({ client });
      expect(typeof dir).toBe('string');
    });

    it(`${client} global package path`, () => {
      const path = getGlobalPackagePath({
        name: 'yarn',
        client,
      });
      expect(typeof path).toBe('string');
    });

    it(`${client} global packages`, () => {
      const packages = getGlobalPackages({ client });
      expect(Array.isArray(packages)).toBeTruthy();
      if (packages.length > 0) {
        expect(packages).toContainEqual(expect.any(String));
      }
    });

    it(`${client} global packages - extended`, () => {
      const packages = getGlobalPackages({
        client,
        extended: true,
      });
      expect(Array.isArray(packages)).toBeTruthy();
      if (packages.length > 0) {
        expect(packages).toContainEqual(expect.objectContaining(extended));
      }
    });

    it(`${client} check if package is globally installed`, () => {
      const packageIsInstalled = checkIfPackageIsGloballyInstalled({
        client,
        name: 'yarn',
      });
      expect(typeof packageIsInstalled).toBe('boolean');

      /** Required parameter error handling */
      expect(() => checkIfPackageIsGloballyInstalled({
        client,
      })).toThrow();
    });

    it(`${client} check if package is globally installed - extended`, () => {
      const packageIsInstalled = checkIfPackageIsGloballyInstalled({
        client,
        name: 'yarn',
        extended: true,
      });
      if (packageIsInstalled) {
        expect(packageIsInstalled).toEqual(expect.objectContaining(extended));
      } else {
        expect(packageIsInstalled).toBe(false);
      }
    });
  });
});
