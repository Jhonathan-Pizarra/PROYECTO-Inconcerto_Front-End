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
    DialogTitle, Fab, InputLabel,
    makeStyles, Select,
    TextField, Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import {Essay} from "@/lib/essays";
import Loading from "@/components/Loading";
import {Feeding} from "@/lib/feedings";

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));


const CreateFeeding = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = React.useState(false);
    const {data: feedings, error, mutate} = useSWR(`/feedings/${''}`, fetcher);
    const [statePlace, setPlace] = useState(null);
    const [stateArtist, setArtist] = useState(null);
    const [stateUser, setUser] = useState(null);
    const {data: fplaces} = useSWR(`/feeding_places/${''}`, fetcher);
    const {data: artists} = useSWR(`/artists/${''}`, fetcher);
    const {data: users} = useSWR(`/users/${''}`, fetcher);


    const onSubmit = async (data) => {
        console.log('data', data);

        const newFeeding = {
            date: data.date,
            food: data.food,
            observation: data.observation,
            quantityLunchs: data.quantityLunchs,
            user_id: data.user_id,
            artist_id: data.artist_id,
            place_id: data.place_id,
        };

        const formData = new FormData();
        formData.append("date", newFeeding.date);
        formData.append("food", newFeeding.food);
        formData.append("observation", newFeeding.observation);
        formData.append("quantityLunchs", newFeeding.quantityLunchs);
        formData.append("user_id", newFeeding.user_id);
        formData.append("artist_id", newFeeding.artist_id);
        formData.append("place_id", newFeeding.place_id);

        try {
            await Feeding.create(formData);
            mutate("/feedings");
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

    const handleChangePlace = () => {
        setPlace({statePlace});
    };

    const handleChangeArtist = () => {
        setArtist({stateArtist});
    };

    const handleChangeUser = () => {
        setUser({stateUser});
    };


    if(error) return <div>"No se obtuvo el cuadro de alimentación..."</div>;
    if(!feedings) return <Loading/>;
    if(!fplaces) return <Loading/>;
    if(!artists) return <Loading/>;
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
                        <DialogContent>
                            <TextField
                                id="datetime-local"
                                label="Fecha"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                margin="dense"
                                //className={classes.textField}
                                {...register('date')}
                                fullWidth
                            />
                        </DialogContent>

                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            {...register('food')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="standard-number"
                            label="Cantidad"
                            type="number"
                            defaultValue={0}
                            {...register('quantityLunchs')}
                            helperText="(Déjelo en 0 si no aplica)"
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Observación"
                            type="text"
                            {...register('observation')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Lugar</InputLabel>
                        <Select
                            fullWidth
                            native
                            value={statePlace}
                            onChange={handleChangePlace}
                            {...register("place_id")}
                        >
                            {fplaces.data.map((fplace) => (
                                <option key={fplace.id}  value={fplace.id}>{fplace.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Artista</InputLabel>
                        <Select
                            fullWidth
                            native
                            value={stateArtist}
                            onChange={handleChangeArtist}
                            {...register("artist_id")}
                        >
                            {artists.data.map((artist) => (
                                <option key={artist.id}  value={artist.id}>{artist.name}</option>
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

export default CreateFeeding;