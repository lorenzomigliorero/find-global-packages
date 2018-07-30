# Get global Packages
A little utility to find installed global packages with npm or yarn.
## Functions

<dl>
<dt><a href="#getGlobalDir">getGlobalDir(params)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getGlobalPackages">getGlobalPackages(params)</a> ⇒ <code>Array.string</code></dt>
<dd></dd>
</dl>

<a name="getGlobalDir"></a>

## getGlobalDir(params) ⇒ <code>string</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Get global dir by client |

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | npm or yarn |

<a name="getGlobalPackages"></a>

## getGlobalPackages(params) ⇒ <code>Array.string</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Provide appropriate props |

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| scope | <code>string</code> |  | Get packages by @scope. |
| filter | <code>callback</code> |  | A custom filter callback. |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | Preferred client, npm or yarn. |


## Usage
```
const { getGlobalPackages } = require('get-global-packages');

getGlobalDir().then(dir => {
    console.log(dir); // ['lodash', 'rimraf']
})

getGlobalPackages().then(packages => {
    console.log(packages); // ['lodash', 'rimraf']
})

getGlobalPackages({
    client: 'npm',
    scope: '@custom-scope',
    filter: name => name.includes('starter-kit'),
}).then(packages => {
    console.log(packages);
})
```