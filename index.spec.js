const {
	getGlobalPackages,
	getGlobalDir,
} = require('./index');

it('npm global dir', () => {
	const dir = getGlobalDir({ client: 'npm' });
	expect(typeof dir).toBe('string');
});

it('npm global packages', () => {
	const packages = getGlobalPackages({
		scope: '@aquestsrl',
		client: 'npm',
	});
	expect(Array.isArray(packages)).toBe(true);
});

it('yarn global dir', () => {
	const dir = getGlobalDir({ client: 'yarn' });
	expect(typeof dir).toBe('string');
});

it('yarn global packages', () => {
	const packages = getGlobalPackages();
	expect(Array.isArray(packages)).toBe(true);
});
