# webpack-babel-react
Guide to setting up webpack for a lightweight web app, using Webpack4, Babel7, and React.

Additional guide to Airbnb style guide at bottom.

Simple file structure:
```
public
  | bundle.js
  | index.html
src
  | App.jsx
  | some component
  | some other component
  | 40 billion more components
  | index.js
server.js
```


1. [How To Start](#start)
2. [Webpack4](#webpack)
3. [Babel7](#head1234)
4. [Node/Express](#node)
5. [React](#react)
6. [Airbnb Styleguide + Lint](#airbnb)


##<a name="start">How To Start</a>
A note: for package installs, I use npm.

1. Create new repo in GitHub

2. Clone down repo to your machine

3. Create `package.json`, so we can start adding dependencies:
```
npm init -y
```
  * The `-y` populates some fields with default values. Omit if you want custom values.
  * Here's some fun info about `package.json`: tps://docs.npmjs.com/files/package.json.

```json
{
  "name": "webpack-babel-react",
  "version": "1.0.0",
  "description": "Guide to setting up webpack for a lightweight web app, using Webpack4, Babel7, and React.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/etcaples/webpack-babel-react.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/etcaples/webpack-babel-react/issues"
  },
  "homepage": "https://github.com/etcaples/webpack-babel-react#readme"
}
```

4. Create .gitignore file and add `/node_modules/`. (When you run `npm install` for the first time, `package-lock.json` and `node_modules` will be generated in the file system.)


###<a name="webpack">Webpack4</a>
5. Install some dev dependencies, for our development environment
(Source: https://webpack.js.org/guides/getting-started/)
  * webpack
  * webpack-cli

6. At this point, let's add a webpack script in `package.json`
```json
"dev": "webpack --mode development -w"`
```
(Source: https://webpack.js.org/concepts/mode/).
  * `-w` is the watch flag
  * when it's time for production env, you can add a separate script for that

7. While we're on the subject of Webpack, let's make a webpack.config.js file:
What is the entry point?
  * https://webpack.js.org/concepts/#entry
  * defaults to `src/index.js`
What is the output?
  * https://webpack.js.org/concepts/#output
  * describes what's going to happen with our bundled code. If this file doesn't already exist, Webpack will create the file with whatever name you've decided to give it, and it will reside in a folder that you decide as well.

8. Add a `src` folder, and a file in that folder called `index.jsx` (because we're doing a React app).

9. Here, I'm placing it in a folder at my topmost level of my repo's filesystem, and I want that file to be called `public`. Again: if that folder doesn't exist already, Webpack will generate one.
  * you can call the output file `main.js`, `compiled.js`, or whatever you want - I'm going with `bundle.js`
  * you can call the output folder `dist`, `client`, or whatever you want - I'm going with `public`

10. Add folder/file (for me, `public/bundle.js`) to .gitignore

(See: https://webpack.js.org/guides/getting-started/#using-a-configuration)
```js
const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
};
```

11. In the `bundle.js`, we'll have our entry `.js` file as well as our `.jsx` files, so we want to handle that in the webpack config:
(https://github.com/babel/babel-loader)
(https://www.robinwieruch.de/minimal-react-webpack-babel-setup/ to combine the js/jsx tests into 1 rule)

```js
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
```

When you import *files*, you need to include the full file name (eg: `hello.js`, `world.jsx`). If you want to be able to leave off the extensions,
https://webpack.js.org/configuration/resolve/#resolve-extensions
```js
resolve: {
  extensions: ['.js', '.jsx']
}
```

###<a name="babel">Babel7</a>
12. Create a `.babelrc` file. 

13. Since we're using React, we'll need to transpile `jsx` -> `js`, so let's do some babel stuff in our **dev dependencies**:

We go to https://babeljs.io/setup#installation, and we'll be using a couple of different buld tools:

Nodemon:
  * @babel/cli
  * @babel/preset-env

Webpack + Babel:
  * @babel/core
  * babel-loader (https://webpack.js.org/loaders/babel-loader/)

14. Add presets to .babelrc:
(Source: https://babeljs.io/docs/en/babel-preset-env)
(Source: https://babeljs.io/docs/en/babel-preset-react)
  * @babel/preset-env
  * @babel/preset-react

Source: https://babeljs.io/docs/en/presets
```json
{
  "presets": ["@babel/env", "@babel/react"]
}
```

###<a name="node">Node/Express</a>
15. Install dependency:
  * express

16. Install dev dependency:
  * nodemon

17. Add Node/Express server, create a "start" script in `package.json`.

18. You can run `npm run dev` and `npm start` in separate terminal workspaces, or you can combine the scripts and only have to run it once (check out package.json for an example)


###<a name="react">React</a>
19. Install dependencies:
  * react
  * react-dom

20. We're serving the `public` folder to the browser from the server, so that's where we'll add a static `index.html` file.

21. The browser doesn't have access to the transpiled code, so make sure that's making it to the html as well.

22. Write some React code.


###<a name="airbnb">Airbnb Styleguide</a>
23. Add an `.eslintrc` file
How to install: https://www.npmjs.com/package/eslint-config-airbnb
Rules: https://github.com/airbnb/javascript

24. We've just added 3 plugins, so add that to the `.eslintrc` (similar to adding plugins in `.babelrc`)

25. To ensure Webpack has the proper loader to handle linting the code, install `eslint-loader` and add to webpack config:
https://github.com/webpack-contrib/eslint-loader


26. To lint all valid Babel code, including experimental code, install `babel-eslint` as dev dependency: https://github.com/babel/babel-eslint


**To disable the rule "Component should be written as a pure function":**
https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md#rule-options

**This linter will call you out for using `++`, refer to this StackOverflow post to alter or disable that rule:**
https://stackoverflow.com/questions/47728952/how-do-you-disable-no-plusplus-when-using-eslint
