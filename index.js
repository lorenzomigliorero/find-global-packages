const { exec, execSync } = require('child_process');

/**
 * @param {Object} params - Get global dir by client
 * @property {string} client=yarn - npm or yarn
 * @returns {string}
 */
const getGlobalDir = ({ client = 'yarn' } = {}) => {
	const command = client === 'yarn' ? 'yarn global dir' : 'npm root -g';
	let dir = `${execSync(command).toString()}`.trim();
	if (client === 'npm') dir = dir.replace('/node_modules', '');
	return dir;
};

const getGlobalPackagesList = ({ client }) => {
	if (client === 'npm') {
		const list = execSync('npm list -g --depth=0 --json').toString();
		return JSON.parse(list);
	} else if (client === 'yarn') {
		return require(`${getGlobalDir({ client })}/package.json`);
	}
};

/**
 * @param {Object} params - Provide appropriate props
 * @property {string} scope - Get packages by @scope.
 * @property {callback} filter - A custom filter callback.
 * @property {string} client=yarn - Preferred client, npm or yarn.
 * @returns {Array.string}
 */
const getGlobalPackages = ({
	scope = '',
	filter,
	client = 'yarn'
} = {}) => {
	const { dependencies } = getGlobalPackagesList({ client });
	return Object.keys(dependencies).filter(dep => dep.startsWith(scope) && (typeof (filter) === 'function' ? filter(dep) : true));
};

module.exports = {
	getGlobalPackages,
	getGlobalDir,
};