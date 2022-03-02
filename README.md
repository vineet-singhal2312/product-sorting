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

import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = () => {
const [users, setUsers] = useState([]);
const [selectedUserID, setSelectedUserID] = useState(null);
const [title, setTitle] = useState(null);
const [message, setMessage] = useState(null);
const [isMessage, setIsMessage] = useState(false);
const [isSelectedUserId, setIsSelectedUserId] = useState(false);
const [isTitle, setIsTitle] = useState(false);
const [isPostFailed, setIsPostFailed] = useState(false);
const [isPostFullfil, setIsPostFullfil] = useState(false);
useEffect(() => {
(async function () {
try {
const { data } = await axios.get(
"https://jsonplaceholder.typicode.com/users"
);
setUsers(data);
} catch (error) {
console.log(error);
}
})();
}, []);

const selectedUserName = (e) => {
setSelectedUserID(e.target.value);
};

const titleHandler = (e) => {
setTitle(e.target.value);
};
const messageHandler = (e) => {
setMessage(e.target.value);
};
const submit = async (e) => {
e.preventDefault();
if (selectedUserID && title && message) {
try {
await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
title,
body: message,
userId: selectedUserID,
});
setIsPostFullfil(true);

        setTimeout(() => {
          setIsPostFullfil(false);
        }, 3000);
      } catch (error) {
        setIsPostFailed(true);

        setTimeout(() => {
          setIsPostFailed(false);
        }, 3000);
      }
    } else {
      if (!selectedUserID) {
        setIsSelectedUserId(true);

        setTimeout(() => {
          setIsSelectedUserId(false);
        }, 3000);
      }
      if (!title) {
        setIsTitle(true);

        setTimeout(() => {
          setIsTitle(false);
        }, 3000);
      }

      if (!message) {
        setIsMessage(true);

        setTimeout(() => {
          setIsMessage(false);
        }, 3000);
      }
    }

};
return (

<div className="form">
<form onSubmit={(e) => submit(e)}>
<ul className="form-style-1">
<li>
<label>Name</label>
{isSelectedUserId && <small>Please Select Name</small>}
<select
name="field4"
className={
isSelectedUserId ? "field-select not-selected" : "field-select"
}
onChange={(e) => selectedUserName(e)} >
<option disabled selected>
Choose Name
</option>
{users.map((user) => (
<option key={user.id} value={user.id}>
{user.name}
</option>
))}
</select>
</li>
<li>
<label>
Title <span className="required">_</span>
</label>
{isTitle && <small>Please Filled Title</small>}
<input
className={isTitle ? "field-long not-selected" : "field-long"}
onChange={(e) => titleHandler(e)} ></input>
</li>
<li>
<label>
Your Message <span className="required">_</span>
</label>

            {isMessage && <small>Please Write a message</small>}
            <textarea
              name="field5"
              id="field5"
              className={
                isMessage
                  ? "field-long field-textarea not-selected"
                  : "field-long field-textarea"
              }
              onChange={(e) => messageHandler(e)}
            ></textarea>
          </li>
          <li>
            {isPostFullfil && <h3>Successfully Saved information!!</h3>}
            {isPostFailed && <h4>Something is wrong ,Please Try again</h4>}
            <input type="submit" value="Submit" />
          </li>
        </ul>
      </form>
    </div>

);
};

.form {
text-align: start;
}
.form-style-1 {
margin: 10px auto;
max-width: 400px;
padding: 20px 12px 10px 20px;
font: 13px "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}
.form-style-1 li {
padding: 0;
display: block;
list-style: none;
margin: 10px 0 0 0;
}
.form-style-1 label {
margin: 0 0 3px 0;
padding: 0px;
display: block;
font-weight: bold;
}
textarea,
select,
input {
box-sizing: border-box;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
border: 1px solid #bebebe;
padding: 7px;
margin: 0px;
-webkit-transition: all 0.3s ease-in-out;
-moz-transition: all 0.3s ease-in-out;
-ms-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
outline: none;
}
.not-selected {
box-sizing: border-box;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
border: 1px solid red;
padding: 7px;
margin: 0px;
-webkit-transition: all 0.3s ease-in-out;
-moz-transition: all 0.3s ease-in-out;
-ms-transition: all 0.3s ease-in-out;
-o-transition: all 0.3s ease-in-out;
outline: none;
}
small,
h4 {
color: red;
}
h3 {
color: green;
}

.form-style-1 .field-divided {
width: 49%;
}

.form-style-1 .field-long {
width: 100%;
}
.form-style-1 .field-select {
width: 100%;
}
.form-style-1 .field-textarea {
height: 100px;
}
.form-style-1 input[type="submit"],
.form-style-1 input[type="button"] {
background: #4b99ad;
padding: 8px 15px 8px 15px;
border: none;
color: #fff;
}
.form-style-1 input[type="submit"]:hover,
.form-style-1 input[type="button"]:hover {
background: #4691a4;
box-shadow: none;
-moz-box-shadow: none;
-webkit-box-shadow: none;
}
.form-style-1 .required {
color: red;
}
