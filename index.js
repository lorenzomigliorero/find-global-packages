 const { exec } = require('child_process');

const getGlobalPackages = ({ client }) => new Promise((resolve, reject) => {
	const command = client === 'yarn' ? 'yarn global dir' : 'npm list -g --depth=0 --json';
	exec(command, (err, stdout) => {
		if (err) reject(err);
		const { dependencies } = client === 'yarn' ? require(`${stdout.trim()}/package.json`) : JSON.parse(stdout);
		resolve(Object.keys(dependencies));
	});
});

/**
 * @typedef {Object} Params
 * @property {string} scope - Get packages by @scope.
 * @property {callback} filter - A custom filter callback.
 * @property {string} client=yarn - Preferred client, npm or yarn.
 */
/**
 * @module getGlobalPackage
 * @param {Params} params - Provide appropriate props
 * @returns {Promise}
 */
module.exports = async ({
	scope = '',
	filter,
	client = 'yarn'
} = {}) => {
	const dependencies = (await getGlobalPackages({ client }));
	return dependencies.filter(dep => dep.startsWith(scope) && (typeof(filter) === 'function' ? filter(dep) : true));
};
