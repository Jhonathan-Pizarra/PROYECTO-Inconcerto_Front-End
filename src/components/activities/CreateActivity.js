import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Festival} from "@/lib/festivals";
import useSWR, {mutate} from "swr";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fab, Grid, InputLabel,
    makeStyles, Select,
    TextField, Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import {Essay} from "@/lib/essays";
import Loading from "@/components/Loading";
import {Resource} from "@/lib/resources";
import {Activity} from "@/lib/activities";

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const CreateActivity = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const {data: activities, error} = useSWR(`/activityfestivals/${''}`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const [state, setState] = useState(null);
    const [stateUser, setUser] = useState(null);
    const {data: users} = useSWR(`/users/${''}`, fetcher);

    const onSubmit = async (data) => {
        console.log('data', data);

        const newActivity = {
            name: data.name,
            date: data.date,
            description: data.description,
            observation: data.observation,
            festival_id: data.festival_id,
            user_id: data.user_id,
        };

        const formData = new FormData();
        formData.append("name", newActivity.name);
        formData.append("date", newActivity.date);
        formData.append("description", newActivity.description);
        formData.append("observation", newActivity.observation);
        formData.append("festival_id", newActivity.festival_id);
        formData.append("user_id", newActivity.user_id);

        try {
            await Activity.create(formData);
            mutate("/activityfestivals");
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
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeSelection = () => {
        setState({state});
    };

    const handleChangeUser = () => {
        setUser({stateUser});
    };

    if(error) return <div>"No se obtuvo la actividad..."</div>;
    if(!activities) return <Loading/>;
    if(!festivals) return <Loading/>;
    if(!users) return <Loading/>;

    return (
        <div>

            <Tooltip title="Add" aria-label="add" className={classes.fixed}>
                <Fab  color="secondary" onClick={handleClickOpen} > {/*className={classes.fixed}*/}
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus
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
                            id="datetime-local"
                            label="Fecha"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            margin="dense"
                            //className={classes.textField}
                            {...register('date')}
                            //dateConcert
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="outlined-basic"
                            label="Descripcion"
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('description')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="outlined-basic"
                            label="Observación"
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('observation')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Festival</InputLabel>
                        <Select
                            fullWidth
                            native
                            value={state}
                            onChange={handleChangeSelection}
                            {...register("festival_id")}
                        >
                            {festivals.data.map((festival) => (
                                <option key={festival.id}  value={festival.id}>{festival.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Responasble</InputLabel>
                        <Select
                            fullWidth
                            native
                            value={stateUser}
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
                        <Button onClick={handleClose} color="primary" type="submit">
                            Crear
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default CreateActivity;