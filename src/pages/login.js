import {useAuth} from "@/lib/auth";
import withoutAuth from "@/hocs/withoutAuth";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email("Esé email no es válido").required("Ingresa el email"),
    password: yup.string().required(),
});


const Login = () => {

    const {login} = useAuth();
    const { register, handleSubmit,  formState:{ errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) =>{
        try {
            const userData = await login(data);
            console.log('userData', data);

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

    /* Ver festival...
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

    };*/

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' {...register('email')} />
                    <p>{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' {...register('password')}  />
                    <p>{errors.password?.message}</p>
                </div>
                <input type="submit"/>
            </form>
        </div>
    );

};

export default withoutAuth(Login);