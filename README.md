## A08 - Final Presentation

### Angel Badillo, Miklos Moreno

### Description:

This assignment was to present over our final version of the app and API with all the required functionality.

### App
[Awesome Store App](https://github.com/It-Is-Legend27/4443-5373-A05/tree/main/src)

### Files

|   #   | File                                                       | Description                                              |
| :---: | ---------------------------------------------------------- | -------------------------------------------------------- |
|   1   | [api.py](./api.py)                                         | Awesome Store API made with FastAPI.                     |
|   2   | [loadMongo.py](./loadMongo.py)                             | Script for loading JSON data into database.              |
|   3   | [store_database.py](store_database.py)                     | Wrapper class for CRUD operations on the database.       |
|   4   | [categoryJson](./categoryJson)                             | Contains JSON files with candy information.              |
|   5   | [requirements.txt](./requirements.txt)                     | Lists all the required packages needed for the project.  |
|   6   | [static/assets](./static/assets)                           | Contains static files used in the API.                   |
|   7   | [addData.py](./addData.py)                                 | Script for loading JSON data into database.              |
|   8   | [collection_validators.json](./collection_validators.json) | JSON file for validators / schema for collections.       |
|   9   | [locations.json](./locations.json)                         | JSON file with user locations.                           |
|  10   | [models.py](./models.py)                                   | Contains derived classes of BaseModel for response data. |
|  11   | [movies.json](./movies.json)                               | JSON file with generated movie information.              |
|  12   | [user.json](./users.json)                                  | JSON file with generated user information.               |

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