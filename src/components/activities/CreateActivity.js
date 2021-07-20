import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR, {mutate} from "swr";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    InputLabel,
    makeStyles,
    Select,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {Activity} from "@/lib/activities";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import SnackSuccess from "@/components/SnackSuccess";

const schema = yup.object().shape({
    name: yup.string().required("Este campo es necesario..."),
    date: yup.string().required("Debes escoger una fecha"),
    description: yup.string().required("Este campo es necesario..."),
    observation: yup.string().required("Este campo es necesario..."),
});

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
    const {data: activities, error} = useSWR(`/activityfestivals`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const {data: users} = useSWR(`/users`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [state, setState] = useState(null);
    const [stateUser, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    if(error) return <div>"No se obtuvo la actividad..."</div>;
    if(!activities) return <Loading/>;
    if(!festivals) return <Loading/>;
    if(!users) return <Loading/>;

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

    const handleOpen = () => {
        reset();
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

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    return (
        <div>

            <Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>
                <Fab  color="secondary" onClick={handleOpen} > {/*className={classes.fixed}*/}
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
                        <DialogContentText color="secondary">
                            {errors.name?.message}
                        </DialogContentText>
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
                        <DialogContentText color="secondary">
                            {errors.date?.message}
                        </DialogContentText>
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
                        <DialogContentText color="secondary">
                            {errors.description?.message}
                        </DialogContentText>
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
                        <DialogContentText color="secondary">
                            {errors.observation?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Festival</InputLabel>
                        <Select
                            autoFocus
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
                            autoFocus
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
                        <Button onClick={handleValidate} color="primary" type="submit">
                            Crear
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default CreateActivity;