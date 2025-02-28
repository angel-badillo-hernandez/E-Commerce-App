# **E-Commerce App: Awesome Store - Final Presentation**  

## **Authors**  
- Angel Badillo  
- Miklos Moreno  

## **Overview**  
This project showcases the final version of our **Awesome Store App** and its accompanying **API**, implementing all required functionality.  

The **Awesome Store API** provides various routes for querying a **MongoDB** database that stores item records. These routes facilitate multiple operations, including:  
- Retrieving all item records  
- Filtering items by category or price range  
- Searching for items by keyword (name or description)  
- Getting item details by ID  
- Fetching item images by ID  
- Updating item prices and attributes  
- Deleting items from the database  
- Handling user location data (retrieving and posting)  
- User authentication (login & registration)  
- Image uploads and storage  

The **Awesome Store App**, built with **React Native**, interacts with the API and provides additional functionalities, including:  
- Searching for items by name and category  
- Viewing other users' locations on **Google Maps**  
- Uploading images to the web server through the API  
- Chatting with other users within the app  

## **Technologies Used**  

### **Frontend (Mobile App)**  
- **Framework:** React Native  
- **Language:** JavaScript  
- **Libraries & Tools:** Expo SDK, Google Maps API  

### **Backend (API & Server)**  
- **Language:** Python  
- **Framework:** FastAPI  
- **Database:** MongoDB  
- **Architecture:** RESTful API  
- **Deployment:** Digital Ocean web server  

## **Repository**  
🔗 **API & Backend Code:** [GitHub Repository](https://github.com/angel-badillo-hernandez/5373-MobileApps/tree/main/Assignments/A08)  

## **Files**  

| #  | File                                                          | Description                                          |
|----|---------------------------------------------------------------|------------------------------------------------------|
| 1  | [App.js](./App.js)                                            | Main application file.                              |
| 2  | [Assets](./assets)                                            | Directory for media, such as images.                |
| 3  | [AwesomeStoreServices.js](./src/api/AwesomeStoreServices.js)  | Functions for interacting with the Awesome Store API. |
| 4  | [AppNavigator.js](./src/navigation/AppNavigator.js)           | Manages app navigation.                             |
| 5  | [Home.js](./src/screens/Home.js)                              | Home screen of the app.                            |
| 6  | [Chat.js](./src/screens/Chat.js)                              | Chat screen of the app.                            |
| 7  | [Map.js](./src/screens/Map.js)                                | Map screen of the app.                             |
| 8  | [Search.js](./src/screens/Search.js)                          | Search screen of the app.                          |
| 9  | [Upload.js](./src/screens/Upload.js)                          | Upload screen of the app.                          |
| 10 | [Login.js](./src/screens/auth/Login.js)                       | Login screen of the app.                           |
| 11 | [Register.js](./src/screens/auth/Register.js)                 | Register screen of the app.                        |

## **Setup Instructions**  

### **Awesome Store API**  
1. SSH into the server.  
2. Navigate to the project directory:  
   ```sh
   cd /root/5373-MobileApps/Assignments/A05
   ```  
3. Activate the virtual environment:  
   ```sh
   source .venv/bin/activate
   ```  
4. Start the API:  
   ```sh
   python api.py
   ```  
5. Access the API at: `localhost:8085`  

### **Awesome Store React Native App**  
1. Install dependencies using a package manager (e.g., Yarn):  
   ```sh
   yarn install
   ```  
2. Start the app:  
   ```sh
   yarn expo start
   ```  

## **Video Demonstration**  
[![Video Demonstration](https://img.youtube.com/vi/-NuAt9xVmEA/0.jpg)](https://www.youtube.com/watch?v=-NuAt9xVmEA)  
_Click the image above to watch the demo._  

## **API Shutdown Notice**  
As of **January 2025**, the **Awesome Store API** has been **shut down** from the DigitalOcean web server. This decision was made due to the ongoing cost of hosting the server and maintaining the website domain name. While the API is no longer live, the source code remains available in the repository for reference and local deployment.
