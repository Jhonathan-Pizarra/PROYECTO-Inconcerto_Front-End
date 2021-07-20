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
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(12),
        right: theme.spacing(2),
    },
}));

const CreateCalendarArtist = () => {

    const classes = useStyles();

    const router = useRouter();
    const {id} = router.query;

    const {data: calendars} = useSWR(`/calendars`, fetcher);
    const {data: artists} = useSWR(`/artists`, fetcher);
    const {data: calendarArtists, mutate, error} = useSWR(`/calendars/${id}/artists`, fetcher);

    const { register, handleSubmit, reset} = useForm();
    const [calendarSelected, setCalendarSelected] = useState(null);
    const [artistSelected, setArtistSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log('data', data);

        const newCalendarArtist = {
            artist_id: data.artist_id,
            calendar_id: data.calendar_id,
        };

        const formData = new FormData();
        formData.append("artist_id", newCalendarArtist.artist_id);
        formData.append("calendar_id", newCalendarArtist.calendar_id);

        try {
            await CalendarArtist.create(id,formData);
            mutate(`/calendars/${id}/artists`);
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

    const handleChangeCalendar = () => {
        setCalendarSelected({calendarSelected});
    };

    const handleChangeArtist = () => {
        setArtistSelected({artistSelected});
    };

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!calendarArtists) return <Loading/>;
    if(!calendars) return <Loading/>;
    if(!artists) return <Loading/>;

    return (
        <div>

            <Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>
                <Fab  color="secondary" onClick={handleOpen} > {/*className={classes.fixed}*/}
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
                        <InputLabel htmlFor="outlined-age-native-simple">Calendario</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={calendarSelected}
                            onChange={handleChangeCalendar}
                            {...register("calendar_id")}
                        >
                            {calendars.data.map((calendar) => (
                                <option key={calendar.id}  value={calendar.id}>{calendar.checkIn_Artist}</option>
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

export default CreateCalendarArtist;