
import Link from 'next/link';
import {useAuth} from "@/lib/auth";

const Navigation = () => {
    const {user, login,logout} = useAuth();

    const handleLogout = async () =>{
        try {
            await logout();
        }catch (error){
            console.log("error", error);

        }
    };

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

    return (
        <div>
            <Link href='/'>Home</Link>
            <Link href='/festivales'>Festivales</Link>
            <Link href='/about'>About</Link>
            <div>
                {
                user === null ? 'Espere...':
                user === false ? <button onClick={handleLogin}>Login</button>:
                (<div>
                    Hola {user.name}!
                    <br/>
                    <button onClick={handleLogout}>Logout</button>
                </div>)
                }
            </div>
            <button onClick={handleLogout}>Logout</button>


            {/*<Link href='/festivals/1/concerts'>Pestaña X</Link>
            <Link href='/festivals/2/Concerts'>Pestaña Y</Link>
            <Link href='/festivals/2/concerts/2'>Pestaña Z</Link>
            <Link href='/logout'>Logout</Link>*/}
        </div>
    );
};

export default Navigation;