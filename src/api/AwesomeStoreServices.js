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
    let path = "categories";
    let categories = [];
    try {
        const response = await fetch(api_url + path, { method: "GET" });
        const json = await response.json();
        const status = response.status;
        const success = status == 200;
        if (!success) {
            throw new Error(`${status} Operation Failed.`)
        }
        categories = await json["categories"];
        return categories;
    }
    catch (error) {
        throw new Error(`Failed to get categories: ${error.message}`);
    }
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


    let path = "items?" + new URLSearchParams(query_params);

    let items = [];

    try {
        const response = await fetch(api_url + path, { method: "GET" });
        const json = await response.json();
        items = await json["items"];
        const status = response.status;
        const success = status == 200;
        if (!success) {
            throw new Error(`${status} Operation Failed.`);
        }
        return items;
    }
    catch (error) {
        throw new Error(`Failed to get candies: ${error.message}`);
    }
}

/**
 * Calls route for posting item.
 * @param {object} item An object representing a item.
 * @returns JSON information with operation results.
 */
export async function post_item(item = {}) {
    let path = "items";

    try {
        const response = await fetch(api_url + path, {
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(item)
        });
        const status = response.status;
        const success = status == 200;
        if (!success) {
            throw new Error(`${status} Operation Failed.`);
        }
        return await response.json();
    }
    catch (error) {
        throw new Error(`Failed to post item: ${error.message}`);
    }
}

/**
 * Calls route for putting / updating item.
 * @param {string} id Item ID
 * @param {object} item An object representing a item.
 * @returns JSON information with operation results.
 */
export async function put_item(id, item = {}) {
    let path = "items/id/" + id;

    try {
        const response = await fetch(api_url + path, {
            method: "PUT", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(item)
        });
        const status = response.status;
        const success = status == 200;
        if (!success) {
            throw new Error(`${status} Operation Failed.`);
        }
        return await response.json();
    }
    catch (error) {
        throw new Error(`Failed to put item: ${error.message}`);
    }
}

/**
 * Delete an item from the database.
 * @param {string} id Item ID
 * @returns JSON info with results.
 */
export async function delete_item(id) {
    let path = "items/id/" + id;

    try {
        const response = await fetch(api_url + path, {
            method: "DELETE", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const status = response.status;
        const success = status == 200;
        if (!success) {
            throw new Error(`${status} Operation Failed.`);
        }
        return await response.json();
    }
    catch (error) {
        throw new Error(`Failed to put item: ${error.message}`);
    }
}

// const main = async () => {

//     let data = await get_categories();
//     console.log("GET /categories")
//     console.log(data);

//     data = await search_items({ category: "Soft Candy", limit: 1 });
//     console.log("GET /items")
//     console.log(data);

//     data = await post_item({ name: "Test", prod_url: "Stuff", img_url: "Stuff", price: 10.0, desc: "Hello here", category: "Fortnite" })
//     console.log("POST /items")
//     console.log(data);

//     data = await put_item("65ff48a4aa724129f8404a1b", { name: "Test", prod_url: "Stuff", img_url: "Stuff", price: 10.0, desc: "Hello here", category: "New", category_id: "Fortnite" })
//     console.log("PUT /items/id")
//     console.log(data);

//     data = await delete_item("65ff48a4aa724129f8404a1b")
//     console.log("DELETE /items")
//     console.log(data);
// }

// main();