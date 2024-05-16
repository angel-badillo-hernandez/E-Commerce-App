## A08 - Final Presentation

### Angel Badillo, Miklos Moreno

### Description:

This assignment was to present over our final version of the app and API with all the required functionality.

## Files

## Files

|   #   | File                                                         | Description                                                |
| :---: | ------------------------------------------------------------ | ---------------------------------------------------------- |
|   1   | [App.js](./App.js)                                           | Main application file.                                     |
|   2   | [Assets](./assets)                                           | Directory for media such as images, etc.                   |
|   3   | [AwesomeStoreServices.js](./src/api/AwesomeStoreServices.js) | Contains functions for interacting with Awesome Store API. |
|   4   | [AppNavigator.js](./src/navigation/AppNavigator.js)          | Handles the navigation in the app.                         |
|   5   | [Home.js](./src/screens/Home.js)                             | Contains the Home screen of the app.                       |
|   6   | [Chat.js](./src/screens/Chat.js)                             | Contains the Chat screen of the app.                       |
|   7   | [Map.js](./src/screens/Map.js)                               | Contains the Map screen of the app.                        |
|   8   | [Search.js](./src/screens/Search.js)                         | Contains the Search screen of the app.                     |
|   9   | [Upload.js](./src/screens/Upload.js)                         | Contains the Upload screen of the app.                     |
|  10   | [Login.js](.src\screens\auth\Login.js)                       | Contains the Login screen of the app.                      |
|  11   | [Register.js](.src\screens\auth\Register.js)                 | Contains the Register screen of the app.                   |

### Instructions

#### Awesome Store API
- First, login to the server via SSH.
- Next, change the directory like so:

```
  cd /root/5373-MobileApps/Assignments/A05
```

- Start the virtual environment:

```
source .venv/bin/activate
```

- Run the script:

```
python api.py
```

- Go to https://thehonoredone.live:8085

#### Awesome Store React Native App
- First, ensure all required packages are installed with some package manager, for example:

```
yarn install
```

- Next, run the app with:
```
yarn expo start
```
