import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Concert} from "@/lib/concerts";
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
    InputLabel,
    makeStyles,
    Select,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import AddIcon from "@material-ui/icons/Add";
import translateMessage from "@/constants/messages";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Este campo es necesario..."),
    dateConcert: yup.string().required("Debes escoger una fecha..."),
    duration: yup.string().required("Debes escoger una hora"),
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

const CreateConcert = () => {
    const classes = useStyles();
    const {data: concert, error, mutate} = useSWR(`/concerts`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const {data: places} = useSWR(`/places`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [checkedInsi, setInsi] = useState(true);
    const [checkedFree, setFree] = useState(true);
    const [state, setState] = useState(null);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log('data del form:', data);

        const newConcert = {
            name: data.name,
            dateConcert: data.dateConcert,
            duration: data.duration,
            free: data.free,
            insitu: data.insitu,
            place_id: data.place_id,
            festival_id: data.festival_id,
        };

        const formData = new FormData();
        formData.append("name", newConcert.name);
        formData.append("dateConcert", newConcert.dateConcert);
        formData.append("duration", newConcert.duration);
        formData.append("free", newConcert.free);
        formData.append("insitu", newConcert.insitu);
        formData.append("place_id", newConcert.place_id);
        formData.append("festival_id", newConcert.festival_id);

        try {
            await Concert.create(formData);
            mutate("/concerts");
            // console.log("file", fileInputRef.current.files[0]);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // alert(error.response.message);
                alert(translateMessage(error.response.data.message));
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
        reset(); //Limpiar los imput después del submit
    };

    const handleChangeSelection = () => {
        setState({state});
    };

    const handleCheckFree = (event) => {
        setFree(event.target.checked);
    };

    const handleCheckInsi = (event) => {
        setInsi(event.target.checked);
    };

    const handleClickOpen = () => {
        reset(); //Limpiar los imput después del submit
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    if(error) return <div>"No se obtuvo el concierto..."</div>;
    if(!concert) return <Loading/>;
    if(!festivals) return <Loading/>;
    if(!places) return <Loading/>;

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
                            //autoFocus que al abrir se seleccione solo
                            // className={classes.title}
                            id="name"
                            label="Nombre"
                            type="text"
                            margin="dense"
                            {...register('name')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.name?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            id="date"
                            label="Fecha"
                            type="date"
                            defaultValue="1996-11-19"
                            margin="dense"
                            //className={classes.textField}
                            {...register('dateConcert')}
                            //dateConcert
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.dateConcert?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            id="time"
                            label="Hora"
                            type="time"
                            defaultValue="00:00"
                            margin="dense"
                            //className={classes.textField}
                            {...register('duration')}
                        />
                        <DialogContentText color="secondary">
                            {errors.duration?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <FormControlLabel
                            value={checkedFree ? "1" : "0"}
                            //onChange={handleChangeFree}
                            {...register('free')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={checkedFree}
                                    onChange={handleCheckFree}
                                    //onChange={function(event){ handleCheckFree(checkedFree); handleChangeFree()}}
                                />}
                            label="Free"
                            labelPlacement="top"
                        />

                        <FormControlLabel
                            value={checkedInsi ? "1" : "0"}
                            {...register('insitu')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={checkedInsi}
                                    onChange={handleCheckInsi}
                                />}
                            label="Insitu"
                            labelPlacement="top"
                        />


                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Festival</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={state}
                            onChange={handleChangeSelection}
                            {...register("festival_id")}
                        >
                            {festivals.data.map((festival) => (
                                <option key={festival.id}  value={festival.id}>{festival.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Lugar</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={state}
                            onChange={handleChangeSelection}
                            {...register("place_id")}
                        >
                            {places.data.map((place) => (
                                <option key={place.id}  value={place.id}>{place.name}</option>
                            ))}
                        </Select>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}  color="primary">
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

export default CreateConcert;
