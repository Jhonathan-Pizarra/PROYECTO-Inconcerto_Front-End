import {useAuth} from "@/lib/auth";
import {Festival} from "@/lib/festivals";
import withoutAuth from "@/hocs/withoutAuth";

const Login = () => {

    const {login, user, logout} = useAuth();

    const handleLogin = async (data) =>{
        try {
            const userData = await login({
                email: "jhonathan@mail.com",
                password: "123456"
            });
            console.log('userData', userData);

        }catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    const handleViewFestival = async () =>{
        try {
            const festivalData = await Festival.getById('1');
            console.log('festivalData', festivalData);

        }catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }

    };

    const handleLogout = async () =>{
        try {
            await logout();
        }catch (error){
            console.log("error", error);

        }
    };

    return (
        <div>
            {
                user === null ? 'Verificando sesión...':
                user === false ? <button onClick={handleLogin}>Login</button>:
                (<div>
                    Hola {user.name}!
                    <br/>
                    <button onClick={handleViewFestival}>Ver Festival</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>)
            }
        </div>
    );

};

export default withoutAuth(Login);