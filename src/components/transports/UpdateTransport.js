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
    FormControlLabel,
    InputAdornment,
    InputLabel,
    Select,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import {Transport} from "@/lib/transports";


//Este {id} lo recibe desde el componente donde lo llamemos
const UpdateTransport = ({id}) => {

    const {data: transport, mutate, error} = useSWR(`/transports/${id}`, fetcher);
    const {data: calendars} = useSWR(`/calendars`, fetcher);
    const { register, handleSubmit } = useForm();
    const [disponibility, setDisponibility] = useState(true);
    const [state, setState] = useState(null);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Transport.update(id, {
                ...data,
                type: data.type,
                capacity: data.capacity,
                instruments_capacity: data.instruments_capacity,
                disponibility: data.disponibility,
                licence_plate: data.licence_plate,
                calendar_id: data.calendar_id,
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

    const handleCheckDisponibility = (event) =>{
        setDisponibility(event.target.checked);
    };

    const handleChangeSelection = () => {
        setState({state});
    };


    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!transport) return <Loading/>;
    if(!calendars) return <Loading/>;

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Editar
            </Button>

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
                            Editar
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    );
};

export default UpdateTransport;