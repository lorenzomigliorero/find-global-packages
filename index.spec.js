const getGlobalPackages = require('./index');

it('npm global packages', async () => {
	const packages = await getGlobalPackages({
		scope: '@aquestsrl',
		client: 'npm',
	});
	expect(Array.isArray(packages)).toBe(true);
});

it('yarn global packages', async () => {
	const packages = await getGlobalPackages();
	expect(Array.isArray(packages)).toBe(true);
});
