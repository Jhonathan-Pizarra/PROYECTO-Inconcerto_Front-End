/**
 * Created by Chalo
 */

const publicRoutes = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/registro",
    FESTIVALS: "/festivales",
    // USERS: "/usuarios",
    // USERS_ID: `/usuario/:id`,
    ABOUT: "/about",
};

const privateRoutes = {
    CONCERTS: "/conciertos",
    CONCERT_ID: "/concert/:id",
    ESSAYS: "/ensayos",
    ESSAYS_ID: "/ensayos/:id",
    ARTISTS: "/artistas",
    ARTISTS_ID: "/artistas/:id",
    RESOURCES: "/recursos",
    //RESOURCES_ID: "recursos/:id",

    // FESTIVALS: "/festivales",
    // FESTIVAL_ID: "/festival/:id",
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes,
};
export default Routes;