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
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import SnackSuccess from "@/components/SnackSuccess";
import {CalendarArtist} from "@/lib/calendar_artists";
import {useRouter} from "next/router";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {ConcertArtist} from "@/lib/concert_artists";

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const CreateConcertArtist = () => {

    const classes = useStyles();

    const router = useRouter();
    const {id} = router.query;

    const {data: concerts} = useSWR(`/concerts`, fetcher);
    const {data: artists} = useSWR(`/artists`, fetcher);
    const {data: concertArtists, mutate, error} = useSWR(`/concerts/${id}/artists`, fetcher);

    const { register, handleSubmit, reset} = useForm();
    const [concertSelected, setConcertSelected] = useState(null);
    const [artistSelected, setArtistSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log('data', data);

        const newConcertArtist = {
            artist_id: data.artist_id,
            concert_id: data.concert_id,
        };

        const formData = new FormData();
        formData.append("artist_id", newConcertArtist.artist_id);
        formData.append("concert_id", newConcertArtist.concert_id);

        try {
            await ConcertArtist.create(id,formData);
            mutate(`/concerts/${id}/artists`);
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

    const handleChangeConcert = () => {
        setConcertSelected({concertSelected});
    };

    const handleChangeArtist = () => {
        setArtistSelected({artistSelected});
    };

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!concertArtists) return <Loading/>;
    if(!concerts) return <Loading/>;
    if(!artists) return <Loading/>;

    return (
        <div>

            <Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>
                <Fab  color="primary" onClick={handleOpen} > {/*className={classes.fixed}*/}
                    <PersonAddIcon />
                </Fab>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <InputLabel htmlFor="outlined-age-native-simple">Conciertos</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={concertSelected}
                            onChange={handleChangeConcert}
                            {...register("concert_id")}
                        >
                            {concerts.data.map((concert) => (
                                <option key={concert.id}  value={concert.id}>{concert.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Artista</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={artistSelected}
                            onChange={handleChangeArtist}
                            {...register("artist_id")}
                        >
                            {artists.data.map((artist) => (
                                <option key={artist.id}  value={artist.id}>{artist.name}</option>
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

export default CreateConcertArtist;