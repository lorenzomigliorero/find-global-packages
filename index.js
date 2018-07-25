const { exec } = require('child_process');

/**
 * Get unfiltered global deps
 * @param {string} client - Preferred client
 * @returns {Promise}
 */
const getGlobalPackages = ({ client }) => new Promise((resolve, reject) => {
	const command = client === 'yarn' ? 'yarn global dir' : 'npm list -g --depth=0 --json';
	exec(command, (err, stdout) => {
		if (err) reject(err);
		const { dependencies } = client === 'yarn' ? require(`${stdout.trim()}/package.json`) : JSON.parse(stdout);
		resolve(Object.keys(dependencies));
	});
});

/**
 * A little utility to find installed global packages with `npm` or `yarn`.
 * @param {string} startWith - A simple filter by string.
 * @param {string} client=yarn - Preferred client, npm or yarn.
 * @returns {Promise}
 */
const getFilteredGlobalPackages = async ({ startWith = '', client = 'yarn' } = {}) => {
	const dependencies = (await getGlobalPackages({ client }));
	return dependencies.filter(deps => deps.startsWith(startWith));
};

module.exports = getFilteredGlobalPackages;
