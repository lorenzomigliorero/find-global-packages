const { exec, execSync } = require('child_process');

const filterByKey = (obj, predicate) => Object.keys(obj)
	.filter(key => predicate(key))
	.reduce((out, key) => {
		out[key] = obj[key];
		return out;
	}, {});

/**
 * @param {Object} params - Get global dir by client
 * @property {string} client=yarn - npm or yarn
 * @returns {string}
 */
const getGlobalDir = ({ client = 'yarn' } = {}) => {
	const command = client === 'yarn' ? 'yarn global dir' : 'npm root -g';
	let dir = `${execSync(command).toString()}`.trim();
	if (client === 'npm') dir = dir.replace(/(\/|\\)node_modules/i, '');
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
 * @property {function} filter - A custom filter callback.
 * @property {boolean} extended - Get extended info, such as name, version and description.
 * @property {string} client=yarn - Preferred client, npm or yarn.
 * @returns {Array.string|Array.Object}
 */
const getGlobalPackages = ({
	scope = '',
	filter,
	extended,
	client = 'yarn'
} = {}) => {
	let { dependencies } = getGlobalPackagesList({ client });
	dependencies = filterByKey(dependencies, key => key.startsWith(scope) && (typeof (filter) === 'function' ? filter(key) : true));
	if (!extended) return Object.keys(dependencies)
	return Object.keys(dependencies).map(key => {
		const {
			version,
			description,
		} = require(`${getGlobalDir({ client })}/node_modules/${key}/package.json`); 
		return {
			name: key,
			version,
			description,
		}
	});
};

/**
 * @param {Object} params - Provide appropriate props
 * @property {string} name - Package name.
 * @property {string} key - Request specific key, example: version.
 * @property {string} client=yarn - Preferred client, npm or yarn.
 * @returns {Object}
 */
const getRemotePackageInfo = ({
	client = 'yarn',
	name,
	key = ''
}) => {
	if (client === 'npm') {
		const info = execSync(`npm view ${name} --json ${key}`).toString();
		return JSON.parse(info);
	} else if (client === 'yarn') {
		const info = execSync(`yarn info ${name} --json ${key}`).toString();
		return JSON.parse(info).data;
	}
};

module.exports = {
	getGlobalPackages,
	getGlobalDir,
	getRemotePackageInfo,
};