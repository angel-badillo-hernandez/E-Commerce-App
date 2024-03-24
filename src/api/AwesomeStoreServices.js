/**
 * Contains functions for performing API calls and
 * and retreiving data for the Awesome Store app.
 */

const api_url = "https://thehonoredone.live:8085/";

/**
 * Calls route for getting all categories.
 * @returns An array of categories.
 */
export async function get_categories() {
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
 * Performs a search using the given parameters, and returns the matching items.
 * @param {string} id Item ID
 * @param {string} name Item Name
 * @param {string} prod_url URL for the item
 * @param {string} img_url URL for the item's image
 * @param {number} price Item price
 * @param {string} desc Item description
 * @param {number} skip Number of items to skip
 * @param {number} limit Number of matching items to return
 * @returns An array of items.
 */
export async function search_items({ id, name, prod_url, img_url, price, desc, category, skip, limit } = {}) {
    const query_params = {}

    // Include arguments if they are not null and are defined
    if (id !== null && id !== undefined)
        query_params["id"] = id

    if (name !== null && name !== undefined)
        query_params["name"] = name

    if (prod_url !== null && prod_url !== undefined)
        query_params["prod_url"] = prod_url

    if (img_url !== null && img_url !== undefined)
        query_params["img_url"] = img_url

    if (price !== null && price !== undefined)
        query_params["price"] = price

    if (desc !== null && desc !== undefined)
        query_params["desc"] = desc

    if (category !== null && category !== undefined)
        query_params["category"] = category

    if (skip !== null && skip !== undefined)
        query_params["skip"] = skip

    if (limit !== null && limit !== undefined)
        query_params["limit"] = limit


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

    // Return items
    return items;
}

/**
 * Calls route for inserting item.
 * @param {string} name Item name
 * @param {string} prod_url Item url
 * @param {string} img_url Item image url
 * @param {number} price Item price
 * @param {string} category Item category
 * @returns JSON information with operation results.
 */
export async function post_item(name, prod_url, img_url, price, desc, category) {
    const path = "items";

    const item = {
        name: name,
        prod_url: prod_url,
        img_url: img_url,
        price: price,
        desc: desc,
        category: category
    }

    const response = await fetch(api_url + path, {
        method: "POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(item)
    });
    const status = response.status;
    const success = status == 200;
    if (!success) {
        throw new Error(`${status} Error posting item.`);
    }

    // Return JSON response
    return await response.json();
}

/**
 * Calls route for putting / updating item.
 * @param {string} id Item ID
 * @param {string} name Item name
 * @param {string} prod_url Item url
 * @param {string} img_url Item image url
 * @param {number} price Item price
 * @param {string} category Item category
 * @returns JSON information with operation results.
 */
export async function put_item(id, name, prod_url, img_url, price, desc, category) {
    const path = "items/id/" + id;

    const item = {
        name: name,
        prod_url: prod_url,
        img_url: img_url,
        price: price,
        desc: desc,
        category: category
    }

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
 * @returns JSON info with results.
 */
export async function delete_item(id) {
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
export async function login(username, password) {
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

    // Return response as json
    return await response.json();
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
export async function register(first_name, last_name, username, email, password) {
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

    // Return response as json
    return await response.json();
}

/**
 * Retreives items in a category
 * @param {string} category Category name 
 * @returns An array of items
 */
export async function items_by_category(category, skip = 0, limit = 0) {
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

    // Return items
    return items;
}

/**
 * Retreives an item by its ID.
 * @param {string} id Item ID
 * @returns An item.
 */
export async function item_by_id(id) {
    const path = "items/id/" + id;
    let item = {}

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    item = await json["item"];
    const status = response.status;
    const success = status == 200;

    if (!success) {
        throw new Error(`${status} Error getting items.`);
    }

    // Return item
    return item;
}

/**
 * Retreives an item's image by ID.
 * @param {string} id Item ID
 * @returns An image as a Blob.
 */
export async function image_by_id(id) {
    const path = "image/id/" + id;
    let image = null

    const response = await fetch(api_url + path, { method: "GET" });
    const blob = await response.blob();
    const status = response.status;
    const success = status == 200;

    if (!success) {
        throw new Error(`${status} Error getting items.`);
    }

    // Return image as blob
    return blob;
}

// async function main() {

//     let data = await get_categories();
//     console.log("GET /categories");
//     console.log(data);

//     data = await search_items({ category: "Soft Candy", limit: 1 });
//     console.log("GET /items");
//     console.log(data);

//     data = await item_by_id("65ff48a4aa724129f8404a1a");
//     console.log("GET /items/id");
//     console.log(data);

//     data = await items_by_category("Soft Candy", 0, 1);
//     console.log("GET /items/category");
//     console.log(data);

//     data = await post_item("Test", "Stuff", "Stuff", 10.0, "Hello here", "Fortnite");
//     console.log("POST /items");
//     console.log(data);

//     data = await put_item("65ff48a4aa724129f8404a1b", "Test", "Stuff", "Stuff", 10.0, "Hello here", "Fortnite");
//     console.log("PUT /items/id");
//     console.log(data);

//     data = await delete_item("65ff48a4aa724129f8404a1b");
//     console.log("DELETE /items");
//     console.log(data);

//     data = await login("It-Is-Legend27", "thehonoredone");
//     console.log("POST /login");
//     console.log(data);

//     data = await register("Angel", "Badillo", "FortniteMaster", "fortnite@mail.com", "fortnite");
//     console.log("POST /register");
//     console.log(data);

//     data = await image_by_id("65ff48a4aa724129f8404a1a");
//     console.log("GET /items/id");
//     console.log(data);
// }

// main();