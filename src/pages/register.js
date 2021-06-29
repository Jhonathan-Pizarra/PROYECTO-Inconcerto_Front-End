import React from "react";
import {useForm} from "react-hook-form";
import withAuth from "@/hocs/withAuth";
import {useAuth} from "@/lib/auth";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    TextField
} from "@material-ui/core";


const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const { register: newUser } = useAuth();


    const onSubmit = async (data) =>{
        try {
            const userData = await newUser(data);
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
        reset();
    };

    return (
        <div>
            <Paper style={{width: 800}}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="email"
                            label="Correo"
                            type="text"
                            {...register('email')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="password"
                            label="Contraseña"
                            type="password"
                            {...register('password')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="password_confirmation"
                            label="Confirmación"
                            type="password"
                            {...register('password_confirmation')}
                            fullWidth
                        />
                    </DialogContent>


                    <DialogActions>
                        <Button type="submit" color="primary" variant="contained">
                            Crear
                        </Button>
                    </DialogActions>
                </form>
            </Paper>

          {/*  <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input type='text' id='name' {...register('name')} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' {...register('email')} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' {...register('password')}  />
                </div>
                <div>
                    <label htmlFor='password_confirmation'>Confirmar Password</label>
                    <input type='password' id='password_confirmation' {...register('password_confirmation')}  />
                </div>
                <input type="submit"/>
            </form>*/}
        </div>
    );

};

export default withAuth(Register); //Porque quiero ver esta página solo si tengo sesión