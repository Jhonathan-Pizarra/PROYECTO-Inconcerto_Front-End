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
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Calendar.update(id, {
                ...data,
                checkIn_Artist: data.checkIn_Artist,
                checkOut_Artist: data.checkOut_Artist,
                comingFrom: data.comingFrom,
                flyNumber: data.flyNumber,
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
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!calendar) return <Loading/>;

    return (
        <div>

            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    color="secondary"*/}
            {/*    startIcon={<EditIcon />}*/}
            {/*    onClick={handleClickOpen}*/}
            {/*>*/}
            {/*    Editar*/}
            {/*</Button>*/}

            <IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleClickOpen} >
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
                            Editar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default UpdateCalendar;