/**
 * Contains functions for performing API calls and
 * and retreiving data for the candy store app.
 */

const api_url = "https://thehonoredone.live:8084/";

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
 * @param {*} candy_info An object containing query params
 * corresponding to the /candies route.
 * @returns An array of candies.
 */
async function search_candies(candy_info = {}) {
    let path = "candies?" + new URLSearchParams(candy_info);
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
 * @param {*} candy_info An object representing a candy.
 */
async function post_candy(candy_info) {
    let path = "candies?";

    try {
        const response = await fetch(api_url + path, { method: "POST", body: JSON.stringify(candy_info)});
        const status = response.status;
        const success = status == 200;
        console.log(candy_info);
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

const main = async ()=>{
    let data = await search_candies({id: 42688339869883});
    console.log(data);

    data = await post_candy({id: 12345, name: "Test", prod_url: "Stuff", img_url: "Stuff", price: 10.0, desc: "Hello here", category: "New", category_id: 123456})
    console.log(data);
}

main();