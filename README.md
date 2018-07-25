# Find Global Packages

A little utility to find installed global packages with `npm` or `yarn`.

**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| startWith | <code>string</code> |  | A simple filter by string. |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | Preferred client, npm or yarn. |

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
    startWith: '@custom-scope',
}).then(packages => {
    console.log(packages);
})
```
