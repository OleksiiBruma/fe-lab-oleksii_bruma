## DESCRIPTION:

This task is about creating webpack configuration file and resolving dependencies in different types of modules.

## REQUIREMENTS:

You are provided with the source files described in **SOURCES** section of this document.

You need to write `webpack.config.js` to build this application in developement and production modes.

In `index.html`, you have already all the markup you need to complete the task.

>**[ -warning- ]** You should NOT further modify JS/Less files

There are requirements to how Webpack should be configured:

>**[ -note- ]** You should use version of Webpack provided in `package.json`

>**[ -warning- ]** Don't forget to run `webpack` command's from your local `node_modules` folder! You can use [`npx`](https://stackoverflow.com/questions/9679932/how-to-use-package-installed-locally-in-node-modules?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa) for that purposes.


1. Install packages using `npm install` in task folder

1. Modify `webpack.config.js` file
    - entry: `./src/index.js`
    - output: `./build/bundle.js`

1. Load JS files using `babel-loader`

1. Load styles using `less-loader`, `css-loader`, `MiniCssExractPlugin.loader`

1. Load images using `file-loader`

1. Use `HtmlWebpackPlugin` to create `index.html` file in `build` folder based on the template `./src/index.html`

1. Use `mini-css-extract-plugin` to export all styles as `./build/style.css`

1. Use `ProvidePlugin` for jQuery library

1. User `clean-webpack-plugin` to remove `build` folder at the beginning of build process

1. Create `build:dev` script in `package.json` to build you app in **developement** mode:
    - Source maps should be enabled

1. Create `watch` script in `package.json` to watch and serve your app:
    - Use `webpack-dev-server` pakckage

1. Create `build:prod` script in `package.json` to build you app in **production** mode:
    - Use `process.env.NODE_ENV` or `argv.mode` to receive build mode
    - JS files should be uglified
    - Use `postcss-loader` with existing `postcss.config.js` for adding vendor prefixes. Use PostCSS configuration in `package.json` to add prefixes only for 2 latest browser versions
    - Disable source maps

*[ -note- ]** Don't add `build` folder and `node_modules` when pushing task into repository

**Extra requirements** (not necessary but useful)

>**[ -note- ]** Additional tasks won't affect your score, but useful for your education.

1. Minify Images in **production** mode using `image-webpack-loader`.
      - Add `image-webpack-loader` to your `devDependencies`
      - Update loaders configuration for images to use `image-webpack-loader` only in production mode


Links: 
       
       https://webpack.github.io/
       https://learn.javascript.ru/screencast/webpack
       https://webpack.js.org/configuration/
       https://webpack.js.org/guides/


## WORKFLOW:

Commit implemented task to git into

branch `03-javascript`

folder `03-javascript/04-modules-approaches-and-webpack/task-01`


Structure of the task should be:
```
task-1
└─── README.md (-- current file)
└─── index.html
└─── package.json   
└─── webpack.config.js
└─── .gitignore
└─── src/
     ...
```

## SOURCES:

```
<task folder>
└─── README.md (-- current file)
└─── package.json
└─── webpack.config.js
└─── src/
     └─── images
           └─── backgroud_parallax_1.jpg
           └─── backgroud_parallax_2.jpg
           └─── backgroud_parallax_3.jpg
     └─── js
           └─── constants
                 └─── constants.js
           └─── methods
                 └─── amazing-method.js
                 └─── amazing-scroll-method.js
           └─── app.js
     └─── less
           └─── components
                 └─── parallax.less
           └─── general
                 └─── general.less
           └─── variables.less
           └─── index.less
     └─── index.js
     └─── index.html
```

## DEADLINE:

Due Date - 17-01-2019 23:59.

Penalty will be applied for each overdue day.