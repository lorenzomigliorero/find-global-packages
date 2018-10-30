# Get global Packages
A little utility to find installed global packages with npm or yarn.
## Functions

<dl>
<dt><a href="#getGlobalDir">getGlobalDir(params)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getGlobalPackages">getGlobalPackages(params)</a> ⇒ <code>Array.string</code> | <code>Array.Object</code></dt>
<dd></dd>
<dt><a href="#getRemotePackageInfo">getRemotePackageInfo(params)</a> ⇒ <code>Object</code></dt>
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

## getGlobalPackages(params) ⇒ <code>Array.string</code> \| <code>Array.Object</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Provide appropriate props |

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| scope | <code>string</code> |  | Get packages by @scope. |
| filter | <code>function</code> |  | A custom filter callback. |
| extended | <code>boolean</code> |  | Get extended info, such as name, version and description. |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | Preferred client, npm or yarn. |

<a name="getRemotePackageInfo"></a>

## getRemotePackageInfo(params) ⇒ <code>Object</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Provide appropriate props |

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Package name. |
| key | <code>string</code> |  | Request specific key, example: version. |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | Preferred client, npm or yarn. |


## Usage
```
const {
    getGlobalDir,
    getGlobalPackages,
    getGlobalPackages,
} = require('get-global-packages');

const globalDir = getGlobalDir({ client 'npm' });
// /Users/foo/node/node_modules

const globalPackages = getGlobalPackages();
// ['react', 'react-router', 'vue', 'lodash', '@myscope/react-utils']

const scopedGlobalPackages = getGlobalPackages({
    client: 'npm',
    filter: name => name.includes('react'),
});
// ['react', 'react-router', '@myscope/react-utils']
```