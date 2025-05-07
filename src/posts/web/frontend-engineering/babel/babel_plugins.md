---
title: Babel Plugins
icon: nonicons:babel-16
order: 3
category:
  - Babel
---

## Usages

### 1. Using a Plugin

如果插件在 npm 中，你可以通过向 Babel 配置文件中的 plugins 配置项传递参数来实现插件的使用。配置项的值是一个数组，只需要将插件名作为数组的项传入到数组中即可。

````json
{
  "plugins": ["babel-plugin-myPlugin", "@babel/plugin-transform-runtime"]
}

````

你还可以直接将插件的绝对/相对路径作为项放入到数组中：

````json
{
  "plugins": ["./node_modules/asdf/plugin"]
}
````

更多插件和预设的配置路径细节，参考 [name-normalization](https://www.babeljs.cn/docs/options#name-normalization).

### 2. 转换插件（plugin-transform）

用于转换代码的插件。

**note:** *转换插件将启用相应的语法插件，因此你不必同时指定这两种插件。*

### 3. 语法插件（plugin-syntax）

大多数语法都可以通过Babel转换插件转换。在极少数情况下(如果转换插件还没有实现，或者没有默认的方法来实现)，您可以使用诸如`@babel/plugin-syntax-bigint`这样的插件来只允许Babel解析特定类型的语法。或者您希望保留源代码，因为您只希望Babel进行代码分析或代码演示。

**note:**  *转换插件能够自动引用了必须要用到的语法插件，在这种情况下不需要特地去使用语法插件。*

### 4. 插件的顺序

插件的顺序很重要，如果多个插件都被列在插件配置项数组中，则意味着多个插件都将处理 “程序” 的某个代码片段，插件的执行顺序将根据插件的排列顺序依次执行。

- 插件（plugins）在 预设（Presets）前运行。
- 插件（plugins）按照声明排列顺序执行（从前往后）。
- 预设（Presets）按照声明逆序执行（从后往前）。

### 5. 插件（预设）参数

插件（Plugins）和预设（Presets）都可以接受参数，插件名和参数对象组成的一个数组，整体作为插件或预设数组的一项，可以在配置文件中设置。

如果不指定阐述，下面这几种形式都是一样的：

````json
{
    "plugins": [
        "pluginA",
        ["pluginA"],
        ["pluginA",{}]
    ]
}
````

要指定参数，请传递一个以参数名作为键（key）的对象：

````json
{
    "plugins": [
        ["transform-async-to-module-method",{
            "module": "bluebird",
            "method": "coroutine"
        }]
    ]
}
````

预设（presets）的参数设置完全相同：

````json
{
    "presets": [
        "env",{
            "loose": true,
            "modules": false
        }
    ]
}
````

例如：

**Plugins:**

````json
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
````

先执行 `transform-decorators-legacy`，再执行 `transform-class-properties`。

**Presets:**

````json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
````

先执行：`@babel/preset-react`，再执行 `@babel/preset-env`。

### 6. 开发一个插件

参考 [babel-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)。



## Ⅰ. Plugins for ES3

### 1. member-expression-literals

- 作用：`@babel/plugin-transform-member-expression-literals` 帮助将语言保留关键字为名的成员变量转换为 `[ ]`方式引用。

  - **Example**

    **In**

    ````javascript
    obj.foo = "isValid";
    
    obj.const = "isKeyword";
    obj["var"] = "isKeyword";
    ````

    **out**

    ````javascript
    obj.foo = "isValid";
    obj["const"] = "isKeyword";
    obj["var"] = "isKeyword";
    ````

    

- 安装：

  ````shell
  npm install -D @babel/plugin-transform-member-expression-literals
  ````

- 使用方式：

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-member-expression-literals"]
    }
    ````

  - 使用命令行

    ````shell
    npx babel .\src\demo-plugin-transform-member-expression-literals.js -d dist --plugins @babel/plugin-transform-member-expression-literals
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
        obj.foo = "isValid";
    
        obj.const = "isKeyword";
        obj["var"] = "isKeyword";
    `
    
    const result = babelCore.transformSync(code, { plugins: ["@babel/plugin-transform-member-expression-literals"]})
    
    console.log(result.code);
    ````

### 2. property-literals

- 作用：`@babel/plugin-transform-property-literals` 会将作为语言关键字的对象中的 key 转换为被 `""` 包裹的字符串。

  - **Example**

    **In**

    ````javascript
    var foo = {
        // changed
        const: function () { },
        var: function () { },
    
        // not changed
        default: 1,
        [a]: 2,
        foo: 1,
    };
    ````

    **out**

    ````javascript
    var foo = {
      // changed
      "const": function () {},
      "var": function () {},
      // not changed
      "default": 1,
      [a]: 2,
      foo: 1
    };
    ````

- 安装：

  ````shell
  npm install -D @babel/plugin-transform-property-literals
  ````

- 使用方式：

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
      "plugins": ["@babel/plugin-transform-property-literals"]
    }
    ````

  - 使用命令行

    ````shell
    npx babel src/demo-plugin-transform-property-literals/index.js -d dist/demo-plugin-transform-property-literals --plugins @babel/plugin-transform-property-literals
    ````

  - 通过 Node API
  
    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
        var foo = {
      // changed
      const: function() {},
      var: function() {},
    
      // not changed
      default: 1,
      [a]: 2,
      foo: 1,
    };
    `
    
    const result = babelCore.transformSync(code, { plugins: ["@babel/plugin-transform-property-literals"]})
    
    console.log(result.code);
    ````

### 3. reserved-words

- 作用：ES3 预留了一些可能在未来成为关键字的单词，但是这些单词并没有在 ES5 即以后真正变成关键字。所以当转义目标环境为 ES3时， `@babel/plugin-transform-reserved-words` 会将这些关键词重命名。

  - **Example**

    **In**

    ````javascript
    var abstract = 1;
    var x = abstract + 1;
    ````

    **out**

    ````javascript
    var _abstract = 1;
    var x = _abstract + 1;
    ````

- 安装

  ````shell
  npm install -D @babel/plugin-transform-reserved-words
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
      "plugins": ["@babel/plugin-transform-reserved-words"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel src/demo-plugin-transform-reserved-words/index.js -d dist/demo-plugin-transform-reserved-words --plugins @babel/plugin-transform-reserved-words
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
        var abstract = 1;
        var x = abstract + 1;
    `
    
    const result = babelCore.transformSync(code, { plugins: ["@babel/plugin-transform-reserved-words"]})
    
    console.log(result.code);
    ````

    

## Ⅱ. Plugins for ES5

### 1. property-mutators

- 作用：ES5以下版本的 ECMAScript不支持性质钩子，`@babel/plugin-transform-property-mutators` 用于转义钩子函数。

  - **Expample**

    **In**

    ````javascript
    var foo = {
      get bar() {
        return this._bar;
      },
      set bar(value) {
        this._bar = value;
      },
    };
    ````

    **Out**

    ````javascript
    var foo = Object.defineProperties({}, {
      bar: {
        get: function () {
          return this._bar;
        },
        set: function (value) {
          this._bar = value;
        },
        configurable: true,
        enumerable: true
      }
    });
    ````

- 安装

  ````shell
  npm install -D @babel/plugin-transform-property-mutators
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
      "plugins": ["@babel/plugin-transform-property-mutators"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel src/demo-plugin-property-mutators/index.js -d dist/demo-plugin-property-mutators --plugins @babel/plugin-transform-property-mutators
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
        var foo = {
          get bar() {
            return this._bar;
          },
          set bar(value) {
            this._bar = value;
          },
        };
    `
    
    const result = babelCore.transformSync(code, { plugins: ["@babel/plugin-transform-property-mutators"]})
    
    console.log(result.code);
    ````

    

## Ⅲ. Plugins for ES6 (ES2015)

### 1. arrow-function

- 作用：将箭头函数转换为普通函数

  **Example**

  **In**

  ````javascript
  var a = () => {};
  var a = b => b;
  
  const double = [1, 2, 3].map(num => num * 2);
  console.log(double); // [2,4,6]
  
  var bob = {
    _name: "Bob",
    _friends: ["Sally", "Tom"],
    printFriends() {
      this._friends.forEach(f => console.log(this._name + " knows " + f));
    },
  };
  console.log(bob.printFriends());
  ````

  **Out**

  ````javascript
  var a = function () {};
  
  var a = function (b) {
    return b;
  };
  
  const double = [1, 2, 3].map(function (num) {
    return num * 2;
  });
  console.log(double); // [2,4,6]
  
  var bob = {
    _name: "Bob",
    _friends: ["Sally", "Tom"],
  
    printFriends() {
      var _this = this;
  
      this._friends.forEach(function (f) {
        return console.log(_this._name + " knows " + f);
      });
    }
  
  };
  console.log(bob.printFriends());
  ````

- 安装

  ````shell
  npm i -D @babel/plugin-transform-arrow-functions
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
      "plugins": ["@babel/plugin-transform-arrow-functions"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-arrow-functions
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
        var a = () => {};
        var a = b => b;
        
        const double = [1, 2, 3].map(num => num * 2);
        console.log(double); // [2,4,6]
        
        var bob = {
          _name: "Bob",
          _friends: ["Sally", "Tom"],
          printFriends() {
            this._friends.forEach(f => console.log(this._name + " knows " + f));
          },
        };
        console.log(bob.printFriends());
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-arrow-functions"]
    })
    
    console.log(result.code);
    ````

### 2. block-scoped-function

- 作用：使得定义在块级作用域内的函数，其函数作用域仅在块级作用域内

  **Example**

  **In**

  ````javascript
  {
    function name(n) {
      return n;
    }
  }
  
  name("Steve");
  ````

  **Out**

  ````javascript
  {
    let name = function (n) {
      return n;
    };
  }
  console.log(name("Steve"));
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-block-scoped-functions
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
     	"plugins": ["@babel/plugin-transform-block-scoped-functions"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-block-scoped-functions
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
        {
          function name(n) {
            return n;
          }
        }
    
        name("Steve");
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-block-scoped-functions"]
    })
    
    console.log(result.code);
    ````

### 3. block-scoping

- 作用：将块级作用域内与块外部作用域内同名的变量进行变量名修改，使其与外部作用域同名变量进行隔离。

  **Example**

  **In**

  ````javascript
  {
      let a = 3;
      let b = 4;
  }
  
  let a = 3;
  let c = 5;
  ````

  **Out**

  ````javascript
  {
    var _a = 3;
    var b = 4;
  }
  var a = 3;
  var c = 5;
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-block-scoping
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
     	"plugins": ["@babel/plugin-transform-block-scoping"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-block-scoping
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      {
        let a = 3;
        let b = 4;
      }
      
      let a = 3;
      let c = 5;
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-block-scoping"]
    })
    
    console.log(result.code);
    ````

### 4. classes

- 作用：将 class 进行降级处理。

- 说明：

  当继承自一个原生类（如 `class extends Array {}`）,

  **Example**

  **In**

  ````javascript
  class Test {
      constructor(name) {
          this.name = name;
      }
  
      logger() {
          console.log("Hello", this.name);
      }
  }
  
  const obj = new Test('Lucy');
  obj.logger()
  ````

  **Out**

  ````javascript
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) { 
        descriptor.writable = true 
      }; 
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
      _defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
      _defineProperties(Constructor, staticProps);
    }
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  
  let Test = /*#__PURE__*/function () {
    function Test(name) {
      _classCallCheck(this, Test);
  
      this.name = name;
    }
  
    _createClass(Test, [{
      key: "logger",
      value: function logger() {
        console.log("Hello", this.name);
      }
    }]);
  
    return Test;
  }();
  
  const obj = new Test('Lucy');
  obj.logger();
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-classes
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        // without options
     	"plugins": ["@babel/plugin-transform-classes"]
    }
    
    // with options
    {
      "plugins": [
        ["@babel/plugin-transform-classes", {
          "loose": true
        }]
      ]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-classes
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
    	class Test {
      		constructor(name) {
            	this.name = name;
        	}
    
        	logger() {
            	console.log("Hello", this.name);
        	}
    	}
    	const obj = new Test('Lucy');
    	obj.logger()
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-classes"]
    })
    
    console.log(result.code);
    ````

### 5. computed-properties

- 作用：将计算属性转换为普通的属性定义方式。

  **Example**

  **In**

  ````javascript
  let foo = 'foo'
  let bar = 'bar'
  var obj = {
      ["x" + foo]: "heh",
      ["y" + bar]: "noo"
  };
  ````

  **Out**

  ````javascript
  var _obj;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  let foo = 'foo';
  let bar = 'bar';
  var obj = (_obj = {}, _defineProperty(_obj, "x" + foo, "heh"), _defineProperty(_obj, "y" + bar, "noo"), _obj);
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-computed-properties
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-computed-properties"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-computed-properties
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
        let foo = 'foo'
        let bar = 'bar'
        var obj = {
            ["x" + foo]: "heh",
            ["y" + bar]: "noo"
        };
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-computed-properties"]
    })
    
    console.log(result.code);
    ````

###  6. destructuring

- 作用：转义对象和数组的解构赋值为更低级的ECMAScript代码。

  **Example**

  **In**

  ````javascript
  let person = {
      username: 'Lucy',
      age: '23'
  }
  
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  
  let {username, age} = person
  let [a, b, ...rest] = arr
  ````

  **Out**

  ````javascript
  let person = {
    username: 'Lucy',
    age: '23'
  };
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let username = person.username,
      age = person.age;
  let a = arr[0],
      b = arr[1],
      rest = arr.slice(2);
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-destructuring
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-destructuring"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-destructuring
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
        let person = {
            username: 'Lucy',
            age: '23'
        }
    
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    
        let {username, age} = person
        let [a, b, ...rest] = arr
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-destructuring"]
    })
    
    console.log(result.code);
    ````

### 7. duplicate-keys

- 作用：这个插件实际上将对象中的重复键转换为计算属性，然后必须由@babel/plugin-transform-compute -properties插件处理。最终的结果将不包含任何具有重复键的对象字面量。

  **Example**

  **In**

  ````javascript
  var x = { a: 5, a: 6 };
  var y = {
    get a() {},
    set a(x) {},
    a: 3,
  };
  ````

  **Out**

  ````javascript
  "use strict";
  
  var x = {
    a: 5,
    ["a"]: 6
  };
  var y = {
    get a() {},
  
    set a(x) {},
  
    ["a"]: 3
  };
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-duplicate-keys
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-duplicate-keys"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-duplicate-keys
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
        var x = { a: 5, a: 6 };
        var y = {
          get a() {},
          set a(x) {},
          a: 3,
        };
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-duplicate-keys"]
    })
    
    console.log(result.code);
    ````

### 8. for-of

- 作用

  **Example**

  **In**

  ````javascript
  let foo = ['a','p','p','l','e']
  for (var i of foo) {
    console.log(i);
  }
  ````

  **Out**

  ````javascript
  let foo = ['a', 'p', 'p', 'l', 'e'];
  
  for (var _i = 0, _foo = foo; _i < _foo.length; _i++) {
    var i = _foo[_i];
    console.log(i);
  }
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-for-of
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-for-of"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-for-of
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      let foo = ['a','p','p','l','e']
      for (var i of foo) {
        console.log(i);
      }
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-for-of"]
    })
    
    console.log(result.code);
    ````

### 9. instanceof

- 作用：？？？

  **Example**

  **In**

  ````javascript
  foo instanceof Bar;
  ````

  **Out**

  ````javascript
  function _instanceof(left, right) {
      if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
          return !!right[Symbol.hasInstance](left);
      } else {
          return left instanceof right;
      }
  }
  
  _instanceof(foo, Bar);
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-instanceof
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-instanceof"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-instanceof
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      foo instanceof Bar;
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-instanceof"]
    })
    
    console.log(result.code);
    ````

### 10. literals

- 作用：将各种格式的编码转换为字面量

  **Example**

  **In**

  ````javascript
  var b = 0b11; // binary integer literal
  var o = 0o7; // octal integer literal
  const u = "Hello\u{000A}\u{0009}!"; // unicode string literals, newline and tab
  ````

  **Out**

  ````javascript
  var b = 3; // binary integer literal
  
  var o = 7; // octal integer literal
  
  const u = "Hello\n\t!"; // unicode string literals, newline and tab
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-literals
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-literals"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-literals
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      var b = 0b11; // binary integer literal
      var o = 0o7; // octal integer literal
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-instanceof"]
    })
    
    console.log(result.code);
    ````

### 11. new-target

- 作用：降级 new.targer 实现。

  **Example**

  **In**

  ````javascript
  function Foo() {
      console.log(new.target);
  }
  
  Foo(); // => undefined
  new Foo(); // => Foo
  ````

  **Out**

  ````javascript
  function Foo() {
    console.log(this instanceof Foo ? this.constructor : void 0);
  }
  
  Foo(); // => undefined
  
  new Foo(); // => Foo
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-new-target
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-new-target"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-new-target
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      function Foo() {
        console.log(new.target);
      }
      
      Foo(); // => undefine
      new Foo(); // => Foo
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-new-target"]
    })
    
    console.log(result.code);
    ````

### 12. object-super

- 作用：降级 object super 实现。

  **Example**

  **In**

  ````javascript
  let obj = {
    say() {
      return "Hello";
    },
  };
  
  let obj2 = {
    say() {
      return super.say() + "World!";
    },
  };
  
  
  ````

  **Out**

  ````javascript
  var _obj;
  
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    } return _get.apply(this, arguments);
  }
  
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object); if (object === null) break;
    }
    return object;
  }
  
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    }; 
    return _getPrototypeOf(o);
  }
  
  let obj = {
    say() {
      return "Hello";
    }
  
  };
  let obj2 = _obj = {
    say() {
      return _get(_getPrototypeOf(_obj), "say", this).call(this) + "World!";
    }
  
  };
  Object.setPrototypeOf(obj2, obj);
  obj2.say(); //HelloWorld!
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-object-super
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-object-super"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-object-super
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      let obj = {
        say() {
          return "Hello";
        },
      };
      
      let obj2 = {
        say() {
          return super.say() + "World!";
        },
      };
    `
    const result = babelCore.transformSync(code, {
      plugins: ["@babel/plugin-transform-object-super"]
    })
    
    console.log(result.code);
    ````

### 13. parameters

- 作用：这个插件将 ES6 参数转化成 ES5 参数，包括：

  - 结构参数（Destructuring parameters）
  - 默认参数（Default parameters）
  - 剩余参数（Rest parameters）

  **Example**

  **In**

  ````javascript
  let obj = {
      a: { first: 'Miss' },
      b: { second: 'Lucy' }
  }
  function test(x = "hello", { a, b }, ...args) {
      console.log(x, a, b, args);
  }
  
  test(undefined, obj, 'how', 'are', 'you')
  ````

  **Out**

  ````javascript
  let obj = {
    a: {
      first: 'Miss'
    },
    b: {
      second: 'Lucy'
    }
  };
  
  function test() {
    let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "hello";
    let {
      a,
      b
    } = arguments.length > 1 ? arguments[1] : undefined;
  
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
  
    console.log(x, a, b, args);
  }
  
  test(undefined, obj, 'how', 'are', 'you');
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-parameters
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-parameters"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-parameters
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      function Foo() {
        console.log(new.target);
      }
      
      Foo(); // => undefine
      new Foo(); // => Foo
    `
    const result = babelCore.transformSync(code,{
        plugins: ["@babel/plugin-transform-new-target"]
    })
    
    console.log(result.code);
    ````

### 14. shorthand-properties

- 作用：将对象和函数的缩写还原成完整写法。

  **Example**

  **In**

  ````javascript
  var o = { a, b, c };
  
  var cat = {
      getName() {
          return name;
      },
  };
  ````

  **Out**

  ````javascript
  var o = {
    a: a,
    b: b,
    c: c
  };
  var cat = {
    getName: function () {
      return name;
    }
  };
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-shorthand-properties
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-shorthand-properties"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-shorthand-properties
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      var o = { a, b, c };
      
      var cat = {
          getName() {
              return name;
          },
      };
    `
    const result = babelCore.transformSync(code, {
      plugins: ["@babel/plugin-transform-shorthand-properties"]
    })
    
    console.log(result.code);
    ````

### 15. spread

- 作用：降级展开语法

  **Example**

  **In**

  ````javascript
  var a = ["a", "b", "c"];
  var b = [...a, "foo"];
  var c = foo(...a);
  ````

  **Out**

  ````javascript
  var a = ["a", "b", "c"];
  var b = [].concat(a, ["foo"]);
  var c = foo.apply(void 0, a);
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-spread
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-spread"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-spread
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      var a = ["a", "b", "c"];
      var b = [...a, "foo"];
      var c = foo(...a);
    `
    const result = babelCore.transformSync(code, {
      plugins: ["@babel/plugin-transform-spread"]
    })
    
    console.log(result.code);
    ````

### 16. sticky-regex

- 作用：

  **Example**

  **In**

  ````javascript
  const a = /o+/y;
  ````

  **Out**

  ````javascript
  const a = new RegExp("o+", "y");
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-sticky-regex
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-sticky-regex"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-sticky-regex
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      const a = /o+/y;
    `
    const result = babelCore.transformSync(code, {
      plugins: ["@babel/plugin-transform-sticky-regex"]
    })
    
    console.log(result.code);
    ````

### 17. template-literals

- 作用：

  **Example**

  **In**

  ````javascript
  let bar = 'bar'
  let result = `foo${bar}`;
  ````

  **Out**

  ````javascript
  let bar = 'bar';
  let result = "foo".concat(bar);
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-template-literals
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-template-literals"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-template-literals
    ````

### 18. typeof-symbol

- 作用：

  **Example**

  **In**

  ````javascript
  typeof Symbol() === "symbol";
  ````

  **Out**

  ````javascript
  function _typeof(obj) { 
      "@babel/helpers - typeof"; 
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  
  _typeof(Symbol()) === "symbol";
  ````

- 安装

  ````shell
   npm install -D @babel/plugin-transform-typeof-symbol
  ````

- 使用

  - 使用配置文件`babel.config.json`（推荐）

    ````json
    {
        "plugins": ["@babel/plugin-transform-typeof-symbol"]
    }
    ````

  - 通过命令行

    ````shell
    npx babel [source] -d [target] --plugins @babel/plugin-transform-typeof-symbol
    ````

  - 通过 Node API

    ````javascript
    const babelCore = require('@babel/core')
    
    const code = `
      typeof Symbol() === "symbol";
    `
    const result = babelCore.transformSync(code, {
      plugins: ["@babel/plugin-transform-typeof-symbol"]
    })
    
    console.log(result.code);
    ````

## Demo
https://gitee.com/damiaoxi/stars/tree/master/Babel/03.Babel_Plugins/code    


