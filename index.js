const request = require('request');
const { spawnSync } = require('child_process');

const defaultParameterError = (msg) => {
  throw new Error(`Missing ${msg} parameter`);
};

const getSpawn = ({
  command,
  args = [],
}) => {
  const spawn = spawnSync(command, args);
  const { stderr, stdout } = spawn;
  const err = stderr.toString();
  if (err) throw new Error(err);
  return stdout.toString().trim();
};

const filterByKey = (obj, predicate) => Object.keys(obj)
  .filter(key => predicate(key))
  .reduce((out, key) => {
    out[key] = obj[key]; // eslint-disable-line
    return out;
  }, {});

/**
 * @param {Object} options
 * @property {string} client=yarn - npm or yarn
 * @returns {string}
 * @example
 * getGlobalDir();
 *
 * // returns
 * '/Users/foo/.config/yarn/global'
 */
const getGlobalDir = ({ client = 'yarn' } = {}) => {
  let dir = getSpawn({
    command: client,
    args: client === 'npm' ? ['root', '-g'] : ['global', 'dir'],
  });
  if (client === 'npm') dir = dir.replace(/(\/|\\)node_modules/i, '');
  return dir;
};

/**
 * @param {Object} options
 * @property {string} name - Package name.
 * @property {string} client=yarn - npm or yarn
 * @returns {string}
 * @example
 * getGlobalPackagePath({ name: 'jest' });
 *
 * // returns
 * '/Users/foo/.config/yarn/global/node_modules/jest'
 */
const getGlobalPackagePath = ({
  name,
  client = 'yarn',
}) => `${getGlobalDir({ client })}/node_modules/${name}`;

const getGlobalPackagesList = ({ client }) => {
  if (client === 'npm') {
    const list = getSpawn({
      command: 'npm',
      args: ['list', '-g', '--depth=0', '--json'],
    });
    return JSON.parse(list.toString());
  }
  return require(`${getGlobalDir({ client })}/package.json`);
};

/**
 * @param {Object} options
 * @property {string} scope - Get packages by @scope.
 * @property {function} filter - A custom filter callback.
 * @property {boolean} extended - Get extended info, such as name, version and description.
 * @property {string} client=yarn - Preferred client, npm or yarn.
 * @returns {Array.string|Array.Object}
 * @example
 * getGlobalPackages();
 *
 * // returns
 * ['jest', 'vue-cli']
 * @example
 * getGlobalPackages({ extended: true });
 *
 * // returns
 * [
 *   {
 *     name: 'jest',
 *     version: '23.6.0',
 *     description: 'Delightful JavaScript Testing'.
 *   },
 *   {
 *     name: 'vue-cli',
 *     version: '2.9.6',
 *     description: 'A simple CLI for scaffolding Vue.js projects.'
 *   }
 * ]
 */
const getGlobalPackages = ({
  scope = '',
  filter = undefined,
  extended = false,
  client = 'yarn',
} = {}) => {
  let { dependencies } = getGlobalPackagesList({ client });
  dependencies = filterByKey(dependencies, key => key.startsWith(scope) && (typeof (filter) === 'function' ? filter(key) : true));
  if (!extended) return Object.keys(dependencies);
  return Object.keys(dependencies).map((key) => {
    const {
      version,
      description,
    } = require(`${getGlobalDir({ client })}/node_modules/${key}/package.json`);
    return {
      name: key,
      version,
      description,
    };
  });
};

/**
 * @param {Object} options
 * @property {boolean} extended - Get extended info, such as name, version and description.
 * @property {string} client=yarn - Preferred client, npm or yarn.
 * @returns {Boolean|Object}
 * @example
 * checkIfPackageIsGloballyInstalled({ name: 'vue-cli' });
 *
 * // returns true
 * @example
 * getGlobalPackages({
 *   extended: true,
 *   name: 'vue-cli'
 * });
 *
 * // returns
 * {
 *   name: 'vue-cli',
 *   version: '2.9.6',
 *   description: 'A simple CLI for scaffolding Vue.js projects.'
 * }
 */
const checkIfPackageIsGloballyInstalled = ({
  client = 'yarn',
  extended = false,
  name = defaultParameterError('name'),
}) => {
  const packages = getGlobalPackages({
    client,
    extended,
    filter: key => key === name,
  });
  const pkg = packages.find(p => (extended ? p.name === name : p === name));
  return !extended ? !!pkg : pkg || false;
};

/**
 * @param {Object} options
 * @property {string} name - Package name.
 * @property {string} key - Request specific key, example: version.
 * @property {string} client=yarn - Preferred client, npm or yarn.
 * @returns {Object}
 * @example
 * getRemotePackageInfo({
 *   name: 'vue-cli',
 *   key: 'version'
 * })
 *
 * //returns
 * '2.9.6'
 * @example
 * getRemotePackageInfo( name: 'vue-cli' })
 *
 * //returns
 * {
 *   name: 'vue-cli',
 *   version: '2.9.6',
 *   description: 'A simple CLI for scaffolding Vue.js projects.'
 * }
 */
const getRemotePackageInfo = ({
  client = 'yarn',
  name = defaultParameterError('name'),
  key = '',
}) => {
  const spawn = getSpawn({
    command: client,
    args: [client === 'npm' ? 'view' : 'info', name, '--json', key],
  });
  return client === 'yarn' ? JSON.parse(spawn).data : spawn;
};

/**
 * @param {Object} options Read here for params documentation https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search
 * @returns {Promise.Array.Object}
 * @example
 * getRemotePackages({ search: 'react' }).then((response) => {
 *   console.log(response);
 * })
 *
 * // returns
 * [
 *   {
 *     name: 'react',
 *     version: '16.6.0',
 *     description: 'React is a JavaScript library for building user interfaces.'.
 *   },
 *   {
 *     name: 'react-router',
 *     version: '4.3.1',
 *     description: 'Declarative routing for React'.
 *   },
 *   ...
 * ]
 */
const getRemotePackages = (params = {}) => new Promise((resolve, reject) => {
  const url = 'https://registry.npmjs.org/-/v1/search';
  request.get({
    url,
    qs: params,
    json: true,
  }, (err, response, body) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(body.objects.map(({
      package: {
        name,
        description,
        version,
      },
    }) => ({
      name,
      description,
      version,
    })));
  });
});

module.exports = {
  getGlobalPackages,
  getRemotePackages,
  getRemotePackageInfo,
  getGlobalDir,
  checkIfPackageIsGloballyInstalled,
  getGlobalPackagePath,
};
