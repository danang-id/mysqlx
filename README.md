> # :warning: DEPRECATED :warning:
>
> The [official](https://github.com/mysql/mysql-connector-nodejs) MySQL Connector for NodeJS has already been written in TypeScript for a while now, so this wrapper is not required anymore.

# Typed MySQL X Dev API (mysqlx)

[![GitHub Release](https://img.shields.io/github/release/danang-id/mysqlx.svg)](https://github.com/danang-id/mysqlx/releases)
[![Dependencies Status](https://img.shields.io/david/danang-id/mysqlx.svg)](https://www.npmjs.com/package/mysqlx?activeTab=dependencies)
[![DevDependencies Status](https://img.shields.io/david/dev/danang-id/mysqlx.svg)](https://www.npmjs.com/package/mysqlx?activeTab=dependencies)

[![NPM Version](https://img.shields.io/npm/v/mysqlx.svg)](https://www.npmjs.com/package/mysqlx?activeTab=versions)
[![License](https://img.shields.io/npm/l/mysqlx.svg)](#license)
[![Monthly Downloads](https://img.shields.io/npm/dm/mysqlx.svg)](https://www.npmjs.com/package/mysqlx)

**_Typed MySQL X Dev API (mysqlx)_** is a staticly typed wrapper for the [official](https://github.com/mysql/mysql-connector-nodejs) MySQL Connector for NodeJS using the X Protocol.

## List of Contents

- [Typed MySQL X Dev API (mysqlx)](#typed-mysql-x-dev-api-mysqlx)
  - [List of Contents](#list-of-contents)
  - [Getting Started](#getting-started)
  - [Documentation](#documentation)
  - [Built With](#built-with)
  - [Contribution](#contribution)
  - [Version Management](#version-management)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Getting Started

This library is available through package manager ([npm](https://www.npmjs.org/) and [yarn](https://www.yarnpkg.com/)). Use package manager to add this library to your project.

```bash
# If you're using NPM
npm install --save mysqlx

# If you're using Yarn
yarn add mysqlx
```

Then, imports **_mysqlx_** in your project.

```javascript
var mysqlx = require("mysqlx");

// Or using ES6 imports
import mysqlx from "mysqlx";
```

## Documentation

Because **_mysqlx_** is static type wrapper over the official MySQL Connector/Node.js library, the documentation follows the [official documentation](https://dev.mysql.com/doc/dev/connector-nodejs/8.0/) of MySQL NodeJS Connector, *with some exception* listed below.

 * DataCursor is removed, replaced by getDocuments() function in the returned response object.
 * RowCursor is removed, replaced by getRows() and getObjects() function in the returned response object.
 * MetadataCursor is removed, replaced by getMetadata() function in the returned response object.
 
These changes implements new way to expose execution results. As for example how the new way works, see this example. 

```javascript
const docs = [];
await collection.find()
  .execute(doc => docs.push(doc));
  
console.log(docs);
```

Code above is using data cursors to collect execution results, as stated in the official documentation. With this library, you should instead using this code below.

```javascript
const result = await collection.find()
  .execute();
const docs = result.getDocuments();

console.log(docs);
```

## Built With

Written in [TypeScript](https://typscriptlang.org/), built into ECMAScript 3 using the TypeScript compiler.

## Contribution

To contribute, fork this project, and issue a pull request. Always follows the documentation for implementation guidelines.

## Version Management

We use [SemVer](http://semver.org/) for version management. For the versions available, see the [tags on this repository](https://github.com/danang-id/mysqlx/tags).

## Authors

* **Danang Galuh Tegar Prasetyo** - _Initial work_ - [danang-id](https://github.com/danang-id)

See also the list of [contributors](https://github.com/danang-id/mysqlx/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

* Static wrapper of [MySQL Connector/Node.js](https://github.com/mysql/mysql-connector-nodejs) library.
