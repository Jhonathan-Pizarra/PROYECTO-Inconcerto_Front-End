import {fetcher} from "../../../utils";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    FormControlLabel,
    Grid,
    InputLabel,
    makeStyles,
    Select,
    TextField,
    Tooltip
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {useRouter} from "next/router";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LinkIcon from "@material-ui/icons/Link";
import {LodgingUser} from "@/lib/lodging_users";

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const CreateLodgingUser = () => {

    const classes = useStyles();

    const router = useRouter();
    const {id} = router.query;

    const {data: lodgings} = useSWR(`/lodgings`, fetcher);
    const {data: users} = useSWR(`/users`, fetcher);
    const {data: lodgingUsers, mutate, error} = useSWR(`/lodgings/${id}/users`, fetcher);

    const { register, handleSubmit, reset} = useForm();
    const [lodgingSelected, setLodgingSelected] = useState(null);
    const [userSelected, setUserSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log('data', data);

        const newLodgingUser = {
            lodging_id: data.lodging_id,
            user_id: data.user_id,
        };

        const formData = new FormData();
        formData.append("lodging_id", newLodgingUser.lodging_id);
        formData.append("user_id", newLodgingUser.user_id);

        try {
            await LodgingUser.create(id, formData);
            mutate(`/lodgings/${id}/users`);
            handleClose();
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
                console.error(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error", error.message);
            }
            console.error(error.config);
        }
        reset();
    };

    const handleOpen = () => {
        reset();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeLodging = () => {
        setLodgingSelected({lodgingSelected});
    };

    const handleChangeUser = () => {
        setUserSelected({userSelected});
    };

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!lodgingUsers) return <Loading/>;
    if(!lodgings) return <Loading/>;
    if(!users) return <Loading/>;

    return (
        <div>

            <Tooltip title="Vincular" aria-label="add" className={classes.fixed}>
                <Fab  color="primary" onClick={handleOpen} > {/*className={classes.fixed}*/}
                    <LinkIcon />
                </Fab>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <InputLabel htmlFor="outlined-age-native-simple">Hospedaje</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={lodgingSelected}
                            onChange={handleChangeLodging}
                            {...register("lodging_id")}
                        >
                            {lodgings.data.map((lodging) => (
                                <option key={lodging.id}  value={lodging.id}>{lodging.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Usuario</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={userSelected}
                            onChange={handleChangeUser}
                            {...register("user_id")}
                        >
                            {users.map((user) => (
                                <option key={user.id}  value={user.id}>{user.name}</option>
                            ))}
                        </Select>
                    </DialogContent>


                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleValidate} color="primary" type="submit">
                            Vincular
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default CreateLodgingUser;