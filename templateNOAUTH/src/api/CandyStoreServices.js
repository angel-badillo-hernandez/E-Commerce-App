/**
 * Contains functions for performing API calls and
 * and retreiving data for the candy store app.
 */


export const api_url = "https://thehonoredone.live:8084/";

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
            throw new Error("${status} Operation Failed.")
        }
        categories = await json["categories"];
        return categories;
    }
    catch (error) {
        throw new Error("Failed to get categories: ${error.message}");
    }
}

/**
 * Calls route for searching candies.
 * @param {*} candy_info An object containing query params
 * corresponding to the /candies route.
 * @returns An array of candies.
 */
export async function search_candies(candy_info = {}) {
    let path = "candies?" + new URLSearchParams(candy_info);
    let candies = [];

    try {
        const response = await fetch(api_url + path, { method: "GET" });
        const json = await response.json();
        candies = await json["candies"];
        const status = response.status;
        const success = status == 200;
        if (!success) {
            throw new Error("${status} Operation Failed.");
        }
        return candies;
    }
    catch (error) {
        throw new Error("Failed to get candies: ${error.message}");
    }
}

/**
 * Calls route for posting candy.
 * @param {*} candy_info An object representing a candy.
 */
export async function post_candy(candy_info = {}) {
    let path = "candies";
    try {
        const response = await fetch(api_url + path, { method: "POST", body: JSON.stringify(candy_info) });
        const status = response.status;
        const success = status == 200;
        if (!success) {
            throw new Error("${status} Operation Failed.");
        }
    }
    catch (error) {
        throw new Error("Failed to post candy: ${error.message}");
    }
}