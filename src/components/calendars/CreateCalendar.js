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
import {Calendar} from "@/lib/calendars";

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));


// Establecer los values={} acorde al campo que correspindan **
// Si tiene checkbox, selectos y así, copiar sus funciones handle del create **
// Si tiene checkbox, selectos y así, copiar sus variables consts del create **


const CreateActivity = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = React.useState(false);
    const {data: calendar, error, mutate} = useSWR(`/calendars`, fetcher);

    const onSubmit = async (data) => {
        console.log('data', data);

        const newCalendar = {
            checkIn_Artist: data.checkIn_Artist,
            checkOut_Artist: data.checkOut_Artist,
            comingFrom: data.comingFrom,
            flyNumber: data.flyNumber,
        };

        const formData = new FormData();
        formData.append("checkIn_Artist", newCalendar.checkIn_Artist);
        formData.append("checkOut_Artist", newCalendar.checkOut_Artist);
        formData.append("comingFrom", newCalendar.comingFrom);
        formData.append("flyNumber", newCalendar.flyNumber);

        try {
            await Calendar.create(formData);
            mutate("/calendars");
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

    if(error) return <div>"No se obtuvo el calendari..."</div>;
    if(!calendar) return <Loading/>;

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
                            id="datetime-local"
                            label="Fecha de llegada"
                            type="datetime-local"
                            defaultValue="2019-11-19T10:30"
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
                            defaultValue="2020-05-24T10:30"
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
                            Crear
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default CreateActivity;