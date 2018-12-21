const STATE = {};

// const CACHE = window.CACHE_MODULE;
$(document).ready(onPageLoad);


function onPageLoad() {
    updateAuthenticatedUI();
}

function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();

}