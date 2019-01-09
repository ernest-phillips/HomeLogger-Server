const STATE = {};
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;
const RENDER = window.RENDER_MODULE;
// const axios = require('axios');

$(document).ready(onPageLoad);


function onPageLoad() {
    updateAuthenticatedUI();
}

function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();

}