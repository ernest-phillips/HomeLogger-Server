## API Model

Pseudocode design of api

base url: https://api.homelogger.com

/users - list all users
{baseURL}/users
/user - requires authentication

/items -
users/{username}/items
/images
users/{username}/items/images
/rooms
users/{username}/rooms/items

    "user": "5f4f2a16e01b2df50a23db47",
    "itemLoc" : "living room",
    "iteDesc" : "Blender",
    "itemModel": "Nin 333"

}
