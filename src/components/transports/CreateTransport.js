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
    InputAdornment,
    InputLabel,
    makeStyles,
    Select,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {Transport} from "@/lib/transports";

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));


const CreateTransport = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = React.useState(false);
    const {data: transport, error, mutate} = useSWR(`/transports`, fetcher);
    const [disponibility, setDisponibility] = useState(true);
    const [state, setState] = useState(null);
    const {data: calendars} = useSWR(`/calendars`, fetcher);

    const onSubmit = async (data) => {
        console.log('data', data);

        const newTansport = {
            type: data.type,
            capacity: data.capacity,
            instruments_capacity: data.instruments_capacity,
            disponibility: data.disponibility,
            licence_plate: data.licence_plate,
            calendar_id: data.calendar_id,
        };

        const formData = new FormData();
        formData.append("type", newTansport.type);
        formData.append("capacity", newTansport.capacity);
        formData.append("instruments_capacity", newTansport.instruments_capacity);
        formData.append("disponibility", newTansport.disponibility);
        formData.append("licence_plate", newTansport.licence_plate);
        formData.append("calendar_id", newTansport.calendar_id);

        try {
            await Transport.create(formData);
            mutate("/transports");
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

    const handleCheckDisponibility = (event) =>{
        setDisponibility(event.target.checked);
    };

    const handleChangeSelection = () => {
        setState({state});
    };


    if(error) return <div>"No se obtuvo el transporte..."</div>;
    if(!transport) return <Loading/>;
    if(!calendars) return <Loading/>;

    return (
        <div>

            <Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>
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
                            margin="dense"
                            id="name"
                            label="Transporte"
                            type="text"
                            {...register('type')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="standard-number"
                            label="Capacidad"
                            type="number"
                            defaultValue={0}
                            {...register('capacity')}
                            helperText="(Déjelo en 0 si no aplica)"
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            label="Capacidad (Peso)"
                            id="outlined-start-adornment"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            variant="outlined"
                            {...register('instruments_capacity')}
                        />
                    </DialogContent>

                    <DialogContent>
                        <FormControlLabel
                            value={disponibility ? "1" : "0"}
                            //onChange={handleChangeFree}
                            {...register('disponibility')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={disponibility}
                                    onChange={handleCheckDisponibility}
                                />}
                            label="Disponible"
                            labelPlacement="top"
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Matrícula"
                            type="text"
                            {...register('licence_plate')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Calendario</InputLabel>
                        <Select
                            fullWidth
                            native
                            value={state}
                            onChange={handleChangeSelection}
                            {...register("calendar_id")}
                        >
                            {calendars.data.map((calendar) => (
                                <option key={calendar.id}  value={calendar.id}>{calendar.checkIn_Artist}</option>
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

export default CreateTransport;