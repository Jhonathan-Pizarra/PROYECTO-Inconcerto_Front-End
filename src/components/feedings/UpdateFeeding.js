import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    makeStyles,
    Select,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {Feeding} from "@/lib/feedings";

const useStyles = makeStyles((theme) => ({
    edit:{
        color: "#FAC800",
    },
}));

//Este {id} lo recibe desde el componente donde lo llamemos
const UpdateFeeding = ({id}) => {

    const classes = useStyles();
    const {data: feeding, error, mutate} = useSWR(`/feedings/${id}`, fetcher);
    const {data: fplaces} = useSWR(`/feeding_places`, fetcher);
    const {data: artists} = useSWR(`/artists`, fetcher);
    const {data: users} = useSWR(`/users`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [statePlace, setPlace] = useState(null);
    const [stateArtist, setArtist] = useState(null);
    const [stateUser, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!feeding) return <Loading/>;
    if(!fplaces) return <Loading/>;
    if(!artists) return <Loading/>;
    if(!users) return <Loading/>;

    var inFeed = new Date(feeding.date); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var yearIn = inFeed.getFullYear();
    var monthIn = (inFeed.getMonth()+1).toString().padStart(2, "0");
    var dayIn = inFeed.getDate().toString().padStart(2, "0");
    var hoursIn = ('0'+inFeed.getHours()).substr(-2);
    var minIn = inFeed.getMinutes().toString().padStart(2, "0");
    const dateIn = yearIn+'-'+monthIn+'-'+dayIn+'T'+hoursIn+':'+minIn;

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Feeding.update(id, {
                ...data,
                date:  ((data.date) === "") ? dateIn : data.date,
                food: ((data.food) === "") ? `Vacío (${feeding.id})` : data.food,
                observation: ((data.observation) === "") ? `Vacío (${feeding.id})` : data.observation,
                quantityLunchs: (((data.quantityLunchs) === "") || ((data.quantityLunchs) <= 0) ) ? '1' : data.quantityLunchs,
                user_id: data.user_id,
                artist_id: data.artist_id,
                place_id: data.place_id,
            });
            mutate();
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

    return (
        <div>

            <IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleOpen} >
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
                            id="datetime-local"
                            label="Fecha"
                            type="datetime-local"
                            defaultValue={dateIn}
                            margin="dense"
                            //className={classes.textField}
                            {...register('date')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Nombre"
                            defaultValue={feeding.food}
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
                            defaultValue={feeding.quantityLunchs}
                            type="number"
                            {...register('quantityLunchs')}
                            fullWidth
                            //helperText="(Déjelo en 0 si no aplica)"
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Observación"
                            defaultValue={feeding.observation}
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
                            Editar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default UpdateFeeding;