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
    // FESTIVALS: "/festivales",
    // FESTIVAL_ID: "/festival/:id",
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes,
};
export default Routes;