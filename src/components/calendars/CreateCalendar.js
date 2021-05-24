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
    Fab,
    makeStyles,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {Calendar} from "@/lib/calendars";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    checkIn_Artist: yup.string().required("Debes escoger una fecha..."),
    checkOut_Artist: yup.string().required("Debes escoger una fecha..."),
    comingFrom: yup.string().required("Este campo es necesario..."),
    flyNumber: yup.string().required("Este campo es necesario..."),
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
    const {data: calendar, error, mutate} = useSWR(`/calendars`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [open, setOpen] = useState(false);

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

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    if(error) return <div>"No se obtuvo el calendario..."</div>;
    if(!calendar) return <Loading/>;

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
                        <DialogContentText color="secondary">
                            {errors.checkIn_Artist?.message}
                        </DialogContentText>
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
                        <DialogContentText color="secondary">
                            {errors.checkOut_Artist?.message}
                        </DialogContentText>
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
                        <DialogContentText color="secondary">
                            {errors.comingFrom?.message}
                        </DialogContentText>
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
                        <DialogContentText color="secondary">
                            {errors.flyNumber?.message}
                        </DialogContentText>
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