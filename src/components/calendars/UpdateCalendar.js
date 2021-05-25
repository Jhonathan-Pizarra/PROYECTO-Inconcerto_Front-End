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
    makeStyles,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {Calendar} from "@/lib/calendars";

const useStyles = makeStyles((theme) => ({
    edit:{
        color: "#FAC800",
    },
}));

//Este {id} lo recibe desde el componente donde lo llamemos
const UpdateCalendar = ({id}) => {

    const classes = useStyles();
    const {data: calendar, mutate, error} = useSWR(`/calendars/${id}`, fetcher);
    const { register, handleSubmit, reset } = useForm();
    const [open, setOpen] = useState(false);

    if(error) return <div>"No se pudo editar el calendario..."</div>;
    if(!calendar) return <Loading/>;

    var inArtist = new Date(calendar.checkIn_Artist); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var yearIn = inArtist.getFullYear();
    var monthIn = (inArtist.getMonth()+1).toString().padStart(2, "0");
    var dayIn = inArtist.getDate().toString().padStart(2, "0");
    var hoursIn = ('0'+inArtist.getHours()).substr(-2);
    var minIn = inArtist.getMinutes().toString().padStart(2, "0");
    const dateIn = yearIn+'-'+monthIn+'-'+dayIn+'T'+hoursIn+':'+minIn;

    var outArtist = new Date(calendar.checkOut_Artist); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var yearOut = outArtist.getFullYear();
    var monthOut = (outArtist.getMonth()+1).toString().padStart(2, "0");
    var dayOut = outArtist.getDate().toString().padStart(2, "0");
    var hoursOut = ('0'+outArtist.getHours()).substr(-2);
    var minOut = outArtist.getMinutes().toString().padStart(2, "0");
    const dateOut = yearOut+'-'+monthOut+'-'+dayOut+'T'+hoursOut+':'+minOut;

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Calendar.update(id, {
                ...data,
                checkIn_Artist: ((data.checkIn_Artist) === "") ? dateIn : data.checkIn_Artist,
                checkOut_Artist: ((data.checkOut_Artist) === "") ? dateOut : data.checkOut_Artist,
                comingFrom: ((data.comingFrom) === "") ? `Vacío (${calendar.id})` : data.comingFrom,
                flyNumber:  ((data.flyNumber) === "") ? `Vacío (${calendar.id})` : data.flyNumber,
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>

            <Button
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={handleOpen}
            >
                Editar
            </Button>

           {/* <IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleOpen} >
                <EditIcon />
            </IconButton>*/}

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            id="datetime-local"
                            label="Fecha de llegada"
                            type="datetime-local"
                            defaultValue={dateIn}
                            margin="dense"
                            //className={classes.textField}
                            {...register('checkIn_Artist')}
                            //dateConcert
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            id="datetime-local"
                            label="Fecha de salida"
                            type="datetime-local"
                            defaultValue={dateOut}
                            margin="dense"
                            {...register('checkOut_Artist')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="País del que proviene"
                            defaultValue={calendar.comingFrom}
                            type="text"
                            {...register('comingFrom')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="# de vuelo"
                            defaultValue={calendar.flyNumber}
                            type="text"
                            {...register('flyNumber')}
                            fullWidth
                        />
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

export default UpdateCalendar;