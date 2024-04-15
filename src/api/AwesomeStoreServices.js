/**
 * Contains functions for performing API calls and
 * and retreiving data for the Awesome Store app.
 */

const api_url = "https://thehonoredone.live:8085/";

/**
 * Represents an the information of an Item to be posted.
 */
class ItemInfo {
    /**
     * Creates a new instance of PostItem.
     * @param {string} name 
     * @param {string} prod_url
     * @param {string} img_url
     * @param {string} desc 
     * @param {number} price 
     * @param {string} category 
     * @param {Array<string} tags 
     */
    constructor(name, prod_url, img_url, desc, price, category, tags) {
        this.name = name;
        this.img_url = img_url;
        this.prod_url = prod_url;
        this.desc = desc;
        this.price = price;
        this.category = category;
        this.tags = tags;
    }
}

/**
 * Represents an Item from the API call response. Includes ItemInfo as well 
 * as the ID of the item.
 */
class Item extends ItemInfo {
    /**
     * Creates a new instance of Item.
     * @param {string} id Item ID
     * @param {string} name Item Name
     * @param {string} prod_url Item product url
     * @param {string} img_url Item image url
     * @param {string} desc Item description
     * @param {number} price Item price
     * @param {string} category Item category
     * @param {Array<string>} tags Item tags
     */
    constructor(id, name, prod_url, img_url, desc, price, category, tags) {
        super(name, prod_url, img_url, desc, price, category, tags);
        this.id = id;
    }
}

/**
 * Represents the login or registration response for the Awesome Store API Login / Registration route.
 */
class AuthResponse {
    /**
     * Creates a new instance of AuthResponse.
     * @param {boolean} success True if login / registration was successful. False otherwise.
     * @param {string} detail Message describing the result.
     */
    constructor(success, detail) {
        this.success = success;
        this.detail = detail;
    }
}

/**
 * Represents the data associated with a user (excluding their password).
 */
class User {
    /**
     * Creates a new instance of User.
     * @param {string} first_name First name of the user.
     * @param {string} last_name Last name of the user.
     * @param {string} username Username of the user.
     * @param {string} email Email of the user.
     */
    constructor(first_name, last_name, username, email) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
    }
}

/**
 * Represents the location data associated with a user.
 */
class UserLocation {
    /**
     * Creates a new instance of UserLocation.
     * @param {string} username Username of the associated user.
     * @param {number} latitude Longitude of the user.
     * @param {number} longitude Longitude of the user.
     * @param {number} timestamp Unix Timestamp in milliseconds when the location was recorded.
     */
    constructor(username, latitude, longitude, timestamp) {
        this.username = username;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
    }
}

/**
 * Calls route for getting all categories.
 * @returns {Promise<Array<string>>} An array of categories.
 */
async function get_categories() {
    const path = "categories";
    let categories = [];

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    const status = response.status;
    const success = status == 200;
    if (!success) {
        throw new Error(`${status} Error getting categories.`)
    }
    categories = await json["categories"];

    // Return array of categories
    return categories;
}

/**
 * Calls Awesome Store API route for performing a search.
 * @param {object} param0 Any combination of "named" parameters, including no
 * parameters.
 * @returns {Promise<Array<Item>>}} An array of items matching the query.
 */
async function search_items({ id = null, name = null, prod_url = null, img_url = null, price = null, desc = null, category = null, tags = null, skip = null, limit = null } = {}) {
    const query_params = {}

    // Include arguments if they are not null and are defined
    if (id !== null)
        query_params["id"] = id

    if (name !== null)
        query_params["name"] = name

    if (prod_url !== null)
        query_params["prod_url"] = prod_url

    if (img_url !== null)
        query_params["img_url"] = img_url

    if (price !== null)
        query_params["price"] = price

    if (desc !== null)
        query_params["desc"] = desc

    if (category !== null)
        query_params["category"] = category

    if (skip !== null)
        query_params["skip"] = skip

    if (limit !== null)
        query_params["limit"] = limit

    if (tags !== null)
        query_params["tags"] = tags


    const path = "items?" + new URLSearchParams(query_params);

    let items = [];

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    items = await json["items"];
    const status = response.status;
    const success = status == 200;

    if (!success) {
        throw new Error(`${status} Error getting items.`);
    }
    let formatted_items = []

    // Convert response to array of Item Objects
    items.forEach(item => {
        formatted_items.push(new Item(item._id, item.name, item.prod_url,
            item.img_url, item.desc, item.price, item.category, item.tags))
    });

    return formatted_items;
}

/**
 * Calls route for inserting item.
 * @param {ItemInfo} item An instance of an Item.
 * @returns {Promise<object>} JSON information with operation results.
 */
async function post_item(item) {
    const path = "items";
    const response = await fetch(api_url + path, {
        method: "POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(item)
    });
    const status = response.status;
    const success = status == 200;
    if (!success) {
        console.log(await response.json())
        throw new Error(`${status} Error posting item.`);
    }

    // Return JSON response
    return await response.json();
}

/**
 * Calls Awesome Store API to store a new item.
 * @param {string} id ID of the item to be updated.
 * @param {ItemInfo} item Information of an item to be updated.
 * @returns {Promise<object} JSON response indicating result of the operation.
 */
async function put_item(id, item) {
    const path = "items/id/" + id;
    const response = await fetch(api_url + path, {
        method: "PUT", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(item)
    });

    const status = response.status;
    const success = status == 200;

    // If not code 200 success, operation failed
    if (!success) {
        throw new Error(`${status} Error updating item.`);
    }

    // Return response as json
    return await response.json();
}

/**
 * Delete an item from the database.
 * @param {string} id Item ID
 * @returns {Promise<object>} JSON info with results.
 */
async function delete_item(id) {
    const path = "items/id/" + id;

    const response = await fetch(api_url + path, {
        method: "DELETE", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const status = response.status;
    const success = status == 200;
    if (!success) {
        throw new Error(`${status} Failed to delete item.`);
    }

    // Return JSON response
    return await response.json();
}

/**
 * Calls route for logging in.
 * @param {string} username Username of user
 * @param {string} password Password of user
 * @returns JSON info with the results of the operation.
 */
async function login(username, password) {
    const path = "login"

    const body = {
        username: username,
        password: password
    }

    const response = await fetch(api_url + path, {
        method: "POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(body)
    });

    const status = response.status;
    const success = status == 200;

    // If not code 200 success, operation failed
    if (!success) {
        throw new Error(`${status} Error logging in.`);
    }

    const jsonResponse = await response.json();

    // Return login response
    return new AuthResponse(jsonResponse.success, jsonResponse.detail);
}

/**
 * Registers a new user.
 * @param {string} first_name User first name
 * @param {string} last_name User last name
 * @param {string} username User username
 * @param {string} email User email
 * @param {string} password User password
 * @returns JSON info with results of the operation.
 */
async function register(first_name, last_name, username, email, password) {
    const path = "register"

    const user = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password
    }

    const response = await fetch(api_url + path, {
        method: "POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(user)
    });

    const status = response.status;
    const success = status == 200;

    // If not code 200 success, operation failed
    if (!success) {
        throw new Error(`${status} Error registering.`);
    }

    const jsonResponse = await response.json();

    // Return response as json
    return new AuthResponse(jsonResponse.success, jsonResponse.detail);
}

/**
 * Retreives items in a category
 * @param {string} category Category name 
 * @returns {Promise<Array<Item>>} An array of items
 */
async function items_by_category(category, skip = 0, limit = 0) {
    const path = `items/category/${category}?` + new URLSearchParams({ skip: skip, limit: limit })

    let items = [];

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    items = await json["items"];
    const status = response.status;
    const success = status == 200;

    if (!success) {
        throw new Error(`${status} Error getting items.`);
    }

    let formatted_items = [];

    items.forEach(item => {
        formatted_items.push(new Item(item._id, item.name, item.prod_url, item.img_url, item.desc, item.price, item.category, item.tags))
    });

    // Return items
    return formatted_items;
}

/**
 * Retreives an item by its ID.
 * @param {string} id Item ID
 * @returns {Promise<Item>} An item.
 */
async function item_by_id(id) {
    const path = "items/id/" + id;
    let item = {}

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    item = await json["item"];
    const status = response.status;
    const success = status == 200;

    if (!success) {
        throw new Error(`${status} Error getting item.`);
    }

    // Return item
    return new Item(item._id, item.name, item.prod_url, item.img_url,
        item.desc, item.price, item.category, item.tags);
}

/**
 * Retreives an item's image by ID.
 * @param {string} id Item ID
 * @returns {Promise<string>} An image as an object URL created from a BLOB.
 */
async function image_by_id(id) {
    const path = "image/id/" + id;

    const response = await fetch(api_url + path, { method: "GET" });
    const blob = await response.blob();
    const status = response.status;
    const success = status == 200;

    if (!success) {
        throw new Error(`${status} Error getting image.`);
    }

    // Return image as objectURL
    return URL.createObjectURL(blob);
}

/**
 * Retreives all user data.
 * @returns {Promise<Array<User>>} An array of user data.
 */
async function get_all_users() {
    const path = "users";

    let users = [];

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    users = await json["users"];
    const status = response.status;
    const success = status == 200;

    if (!success) {
        throw new Error(`${status} Error getting user data.`);
    }
    let formatted_users = []

    // Convert response to array of Item Objects
    users.forEach(user => {
        formatted_users.push(new User(user.first_name, user.last_name, user.username, user.email))
    });

    return formatted_users;
}

/**
 * Retreives the associated username's user data.
 * @param {string} username Username of the user.
 * @returns {Promise<User>} User data.
 */
async function get_user_by_username(username){
    const path = "users/username/" + username;
    let user = {}

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    user = await json["user"];
    const status = response.status;
    const success = status == 200;

    if (!success) {
        throw new Error(`${status} Error getting user data.`);
    }

    // Return user data
    return new User(user.first_name, user.last_name, user.username, user.email);
}

/**
 * Retreives all users' location data.
 * @returns {Promise<Array<UserLocation>>} An array of user locations.
 */
async function get_all_locations(){
    const path = "locations";

    let locations = [];

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    locations = await json["locations"];
    const status = response.status;
    const success = status == 200;

    if (!success) {
        throw new Error(`${status} Error getting location data.`);
    }
    let formatted_locations = []

    // Convert response to array of Item Objects
    locations.forEach(location => {
        formatted_locations.push(new UserLocation(location.username, location.latitude, location.longitude, location.timestamp))
    });

    return formatted_locations;
}

/* async function main() {
    let data;
    data = await get_categories();
    console.log("GET /categories");
    console.log(data);

    data = await search_items({ limit: 2 });
    console.log("GET /items");
    console.log(data);

    data = await item_by_id("66048202614bad457356af70");
    console.log("GET /items/id");
    console.log(data);

    data = await items_by_category("Grocery & Gourmet Food", 0, 1);
    console.log("GET /items/category");
    console.log(data);

    data = await post_item(new ItemInfo("Name", "prod_url", "img_url", "description", 1, "Miscellaneous", ["Fortnite"]));
    console.log("POST /items");
    console.log(data);

    data = await put_item("65ff48a4aa724129f8404a1b", new ItemInfo("Name", "prod_url", "img_url", "description", 1, "Miscellaneous", ["Fortnite"]));
    console.log("PUT /items/id");
    console.log(data);

    data = await delete_item("65ff48a4aa724129f8404a1b");
    console.log("DELETE /items");
    console.log(data);

    data = await login("It-Is-Legend27", "thehonoredone");
    console.log("POST /login");
    console.log(data);

    data = await register("Angel", "Badillo", "FortniteMaster", "fortnite@mail.com", "fortnite");
    console.log("POST /register");
    console.log(data);

    data = await item_by_id("66048202614bad457356af70");
    console.log("GET /item/id");
    console.log(data);

    data = await image_by_id("66048202614bad457356af70");
    console.log("GET /image/id");
    file = new File([data], "img.jpg");
    console.log(data);
}

main(); */

async function test_routes() {
    let data;
    data = await get_all_users();
    console.log(data)

    data = await get_user_by_username("It-Is-Legend27");
    console.log(data);

    data = await get_all_locations();
    console.log(data);
}

test_routes();