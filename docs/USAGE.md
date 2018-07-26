## Usage with yarn
```
const getGlobalPackages = require('get-global-packages');

getGlobalPackages().then(packages => {
    console.log(packages); // ['lodash', 'rimraf']
})
```

## Usage with npm
```
const getGlobalPackages = require('get-global-packages');

getGlobalPackages({ client: 'npm' }).then(packages => {
    console.log(packages);
})
```

## Get scoped packaged
```
const getGlobalPackages = require('get-global-packages');

getGlobalPackages({
    client: 'npm',
    scope: '@custom-scope',
    filter: name => name.includes('starter-kit'),
}).then(packages => {
    console.log(packages);
})
```