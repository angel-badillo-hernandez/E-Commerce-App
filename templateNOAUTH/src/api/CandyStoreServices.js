//import React from "react";


var api_url = "https://thehonoredone.live:8084/";

/**
 * Calls route for getting all categories.
 * @returns An array of categories.
 */
export async function get_categories() {
    let path = "categories";
    let categories = [];

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    categories = await json["categories"];
    return categories;
}

/**
 * Calls route for searching candies.
 * @param {*} params An object containing query params
 * corresponding to the /candies route.
 * @returns An array of candies.
 */
export async function search_candies(params = {}) {
    let path = "candies?" + new URLSearchParams(params);
    let candies = [];

    const response = await fetch(api_url + path, { method: "GET" });
    const json = await response.json();
    candies = await json["candies"];

    return candies;
}