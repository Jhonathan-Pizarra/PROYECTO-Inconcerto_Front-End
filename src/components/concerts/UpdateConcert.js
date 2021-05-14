import {useRouter} from "next/router";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    InputLabel,
    Select,
    TextField
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {fetcher} from "../../utils";
import {Concert} from "@/lib/concerts";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";
import Loading from "@/components/Loading";


const UpdateConcert = () => {

    const router = useRouter();
    const {id} = router.query;
    const {data: concert, error, mutate} = useSWR(`/concerts/${id}`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const {data: places} = useSWR(`/places`, fetcher);
    const { register, handleSubmit } = useForm();
    const [checkedFree, setFree] = useState(true);
    const [checkedInsi, setInsi] = useState(true);
    const [state, setState] = useState(null);
    const [open, setOpen] = useState(false);
    // const fileInputRef = useRef();

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Concert.update(id, {
                ...data,
                name: data.name,
                dateConcert: data.dateConcert,
                duration: data.duration,
                free: data.free,
                insitu: data.insitu,
                place_id: data.place_id,
                festival_id: data.festival_id,
            });
            mutate();
            /*mutate(`/festivals/${data.id}`);*/
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!concert) return <Loading/>
    if(!festivals) return <Loading/>
    if(!places) return <Loading/>

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

                    <DialogTitle id="form-dialog-title">Editar Concierto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus que al abrir se seleccione solo
                            // className={classes.title}
                            //margin="dense" o sea más chiquito el input
                            id="name"
                            label="Nombre"
                            type="text"
                            margin="dense"
                            {...register('name')}
                            fullWidth
                        />
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

export default UpdateConcert;