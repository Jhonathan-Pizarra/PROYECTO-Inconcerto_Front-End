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
    const { register, handleSubmit, reset } = useForm();
    const [disponibility, setDisponibility] = useState(true);
    const [state, setState] = useState(null);
    const [open, setOpen] = useState(false);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!transport) return <Loading/>;
    if(!calendars) return <Loading/>;

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Transport.update(id, {
                ...data,
                type: ((data.type) === "") ? `Vacío (${transport.id})` : data.type,
                capacity: (((data.capacity) === "") || ((data.capacity) <= 0) ) ? '1' : data.capacity,
                instruments_capacity: (((data.instruments_capacity) === "") || ((data.instruments_capacity) <= 0) || (!!isNaN(data.instruments_capacity)) ) ? '1' : data.instruments_capacity,
                disponibility: data.disponibility,
                licence_plate: ((data.licence_plate) === "") ? `Vacío (${transport.id})` : data.licence_plate,
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
        reset();
    };

    const handleOpen = () => {
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
                            defaultValue={transport.type}
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
                            defaultValue={transport.capacity}
                            {...register('capacity')}
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
                            defaultValue={transport.instruments_capacity}
                            {...register('instruments_capacity')}
                        />
                    </DialogContent>

                    <DialogContent style={{textAlign: "center"}}>
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
                            defaultValue={transport.licence_plate}
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