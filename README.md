# Get global Packages
A little utility to find installed global packages with npm or yarn.
## Modules

<dl>
<dt><a href="#module_getGlobalPackage">getGlobalPackage</a> ⇒ <code>Promise</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Params">Params</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_getGlobalPackage"></a>

## getGlobalPackage ⇒ <code>Promise</code>

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>Params</code>](#Params) | Provide appropriate props |

<a name="Params"></a>

## Params : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| scope | <code>string</code> |  | Get packages by @scope. |
| filter | <code>callback</code> |  | A custom filter callback. |
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
    scope: '@custom-scope',
    filter: name => name.includes('starter-kit'),
}).then(packages => {
    console.log(packages);
})
```