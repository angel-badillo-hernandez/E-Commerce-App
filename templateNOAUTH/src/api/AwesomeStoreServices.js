/**
 * Contains functions for performing API calls and
 * and retreiving data for the Awesome Store app.
 */

const api_url = "https://thehonoredone.live:8085/";

/**
 * Calls route for getting all categories.
 * @returns An array of categories.
 */
async function get_categories() {
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
 * Calls route for searching candies.
 * @param {*} item_info An object containing query params
 * corresponding to the /candies route.
 * @returns An array of candies.
 */
async function search_items(item_info = {}) {
    let path = "items?" + new URLSearchParams(item_info);
    let candies = [];

    try {
        const response = await fetch(api_url + path, { method: "GET" });
        const json = await response.json();
        candies = await json["candies"];
        const status = response.status;
        const success = status == 200;
        if (!success) {
            throw new Error(`${status} Operation Failed.`);
        }
        return candies;
    }
    catch (error) {
        throw new Error(`Failed to get candies: ${error.message}`);
    }
}

/**
 * Calls route for posting candy.
 * @param {*} item_info An object representing a candy.
 */
async function post_item(item_info = {}) {
    let path = "items";

    try {
        const response = await fetch(api_url + path, { method: "POST", body: JSON.stringify(item_info) });
        const status = response.status;
        const success = status == 200;
        console.log(item_info);
        console.log(await response.json());
        if (!success) {
            throw new Error(`${status} Operation Failed.`);
        }
        return response.json();
    }
    catch (error) {
        throw new Error(`Failed to post candy: ${error.message}`);
    }
}

const main = async () => {
    let data = await search_items({ id: 42688339869883 });
    console.log(data);

    data = await post_item({ id: 12345, name: "Test", prod_url: "Stuff", img_url: "Stuff", price: 10.0, desc: "Hello here", category: "New", category_id: 123456 })
    console.log(data);
}

main();