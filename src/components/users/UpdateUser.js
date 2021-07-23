import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Artist} from "@/lib/artists";
import useSWR, {mutate} from "swr";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fab, FormControlLabel, Grid, InputLabel,
    makeStyles, Select,
    TextField, Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {useRouter} from "next/router";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {Concert} from "@/lib/concerts";
import {User} from "@/lib/users";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';


const schema = yup.object().shape({
    //name: yup.string().required("Este campo es necesario..."),
    email: yup.string().email('Ese e-mail no es válido...').required("Es necesario un email"),
    password: yup.string().required("Este campo es necesario"),
    password_confirmation: yup.string().required("Este campo es necesario"),
});


const useStyles = makeStyles((theme) => ({
    edit:{
        color: "#FAC800",
    },
}));

//Este {id} lo recibe desde el componente donde lo llamemos, en este caso sería: <UpdateArtistForm id={artist.id}/>

const UpdateUser = ({id}) => {

    const classes = useStyles();
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [open, setOpen] = useState(false);
    const {data: user, mutate, error} = useSWR(`/users/${id}`, fetcher);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!user) return <Loading/>;

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await User.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${user.id})` : data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });
            mutate();
            handleClose();
        } catch (error) {
            if (error.response) {
                console.error(error.response);
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error("Error", error.message);
            }
            console.error(error.config);
        }
        reset();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    return (
        <div>

            <IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleClickOpen} >
                <EditIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                            defaultValue={user.name}
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
                            defaultValue={user.email}
                            type="text"
                            {...register('email')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.email?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="password"
                            label="Contraseña"
                            defaultValue={user.password}
                            type="password"
                            {...register('password')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.password?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="password_confirmation"
                            label="Confirmación"
                            type="password"
                            defaultValue={user.password_confirmation}
                            {...register('password_confirmation')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.password_confirmation?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleValidate} color="primary" variant="contained" type="submit">
                            Editar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default UpdateUser;