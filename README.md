# npm-node-utils
A little utility to get info about installed and remote npm packages.
## Functions

<dl>
<dt><a href="#getGlobalDir">getGlobalDir(options)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getGlobalPackagePath">getGlobalPackagePath(options)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getGlobalPackages">getGlobalPackages(options)</a> ⇒ <code>Array.string</code> | <code>Array.Object</code></dt>
<dd></dd>
<dt><a href="#checkIfPackageIsGloballyInstalled">checkIfPackageIsGloballyInstalled(options)</a> ⇒ <code>Boolean</code> | <code>Object</code></dt>
<dd></dd>
<dt><a href="#getRemotePackageInfo">getRemotePackageInfo(options)</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#getRemotePackages">getRemotePackages(options)</a> ⇒ <code>Promise.Array.Object</code></dt>
<dd></dd>
</dl>

<a name="getGlobalDir"></a>

## getGlobalDir(options) ⇒ <code>string</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | npm or yarn |

**Example**  
```js
getGlobalDir();

// returns
'/Users/foo/.config/yarn/global'
```
<a name="getGlobalPackagePath"></a>

## getGlobalPackagePath(options) ⇒ <code>string</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Package name. |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | npm or yarn |

**Example**  
```js
getGlobalPackagePath({ name: 'jest' });

// returns
'/Users/foo/.config/yarn/global/node_modules/jest'
```
<a name="getGlobalPackages"></a>

## getGlobalPackages(options) ⇒ <code>Array.string</code> \| <code>Array.Object</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| scope | <code>string</code> |  | Get packages by @scope. |
| filter | <code>function</code> |  | A custom filter callback. |
| extended | <code>boolean</code> |  | Get extended info, such as name, version and description. |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | Preferred client, npm or yarn. |

**Example**  
```js
getGlobalPackages();

// returns
['jest', 'vue-cli']
```
**Example**  
```js
getGlobalPackages({ extended: true });

// returns
[
  {
    name: 'jest',
    version: '23.6.0',
    description: 'Delightful JavaScript Testing'.
  },
  {
    name: 'vue-cli',
    version: '2.9.6',
    description: 'A simple CLI for scaffolding Vue.js projects.'
  }
]
```
<a name="checkIfPackageIsGloballyInstalled"></a>

## checkIfPackageIsGloballyInstalled(options) ⇒ <code>Boolean</code> \| <code>Object</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| extended | <code>boolean</code> |  | Get extended info, such as name, version and description. |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | Preferred client, npm or yarn. |

**Example**  
```js
checkIfPackageIsGloballyInstalled({ name: 'vue-cli' });

// returns true
```
**Example**  
```js
getGlobalPackages({
  extended: true,
  name: 'vue-cli'
});

// returns
{
  name: 'vue-cli',
  version: '2.9.6',
  description: 'A simple CLI for scaffolding Vue.js projects.'
}
```
<a name="getRemotePackageInfo"></a>

## getRemotePackageInfo(options) ⇒ <code>Object</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Package name. |
| key | <code>string</code> |  | Request specific key, example: version. |
| client | <code>string</code> | <code>&quot;yarn&quot;</code> | Preferred client, npm or yarn. |

**Example**  
```js
getRemotePackageInfo({
  name: 'vue-cli',
  key: 'version'
})

//returns
'2.9.6'
```
**Example**  
```js
getRemotePackageInfo( name: 'vue-cli' })

//returns
{
  name: 'vue-cli',
  version: '2.9.6',
  description: 'A simple CLI for scaffolding Vue.js projects.'
}
```
<a name="getRemotePackages"></a>

## getRemotePackages(options) ⇒ <code>Promise.Array.Object</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Read here for params documentation https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search |

**Example**  
```js
getRemotePackages({ search: 'react' }).then((response) => {
  console.log(response);
})

// returns
[
  {
    name: 'react',
    version: '16.6.0',
    description: 'React is a JavaScript library for building user interfaces.'.
  },
  {
    name: 'react-router',
    version: '4.3.1',
    description: 'Declarative routing for React'.
  },
  ...
]
```