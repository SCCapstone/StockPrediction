# Directions from miles

### Folders

* build - contains built React app, build/static will need to be imported over to /static, more directions below
* public - contains index.html, must add div with 'id' or 'class' that connects to DOM element created in src/index.js
    * index.html is the html file that will render when running React, is only for testing
* src/lookup - used for making requests to our API, should not need to be messed with
* src/navigation - contains the navbar components; search bar, home link and profile link
* src/stocks - contains components for stock components; stock list, stock details

### Directions and info

#### index.js is what will handle connecting the javascript to DOM elements, each main component is created there, and attached to 
#### an html 'id' or 'class', which are referenced on the html pages you wish to render the React components on

#### In each folder within src (besides lookup), there is a lookup.js file which handles the urls of api endpoints
#### Each folder within src also contains an 'index.js' file, which imports all the functions from the folder, and exports them all so the rest of the app can use

#### running 'npm start' in react app directorywill start the development server. This will render public/index.html, 
#### which should contain a <div> with 'id' or 'class' of 
#### whichever component you are working on. Again these 'id' or 'class' will be in src/index.js

#### When you would like to port the React app over to the main django app, here is what you must do

* exit development server
* run 'npm run build'
* go to /static/ and delete the css and js directories EXCEPT THE BOOTSTRAP FILES
* go to stockpre-react/build/static and copy the css and js directories into /static/
* now run ./manage.py collectstatic
* last step, go to /templates/react
* css.html should have href=main.xxxxxx.chunk.css, make sure it is the same as the one in /static/css
* js.html should have src=main.xxxxxxx.chunk.js and src=x.xxxxxx.chunk.js, same as the ones in /static/js
* make sure relevant components are referenced correctly in html templates with the right 'id' or 'class'
* run django server

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
