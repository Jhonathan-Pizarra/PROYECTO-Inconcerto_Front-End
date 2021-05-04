import {useRouter} from "next/router";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControlLabel, InputLabel,
    makeStyles, Select,
    TextField
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {fetcher} from "../../utils";
import {Concert} from "@/lib/concerts";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    body: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 4,
        "-webkit-box-orient": "vertical",
    },
}));


const ConcertlUpdateForm = () => {
    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const { register, handleSubmit } = useForm();
    const {error, mutate} = useSWR(`/concerts/${id}`, fetcher);
    const [open, setOpen] = useState(false);
    // const fileInputRef = useRef();
    const [checkedF, setCheckedF] = useState(true);
    const [checkedI, setCheckedI] = useState(true);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const {data: places} = useSWR(`/places`, fetcher);
    const [state, setState] = useState(null);

    const handleChangeSelection = () => {
        setState({state});
    };

    const blindFree = (event) => {
        setCheckedF(event.target.checked);
    };

    const blindInsi = (event) => {
        setCheckedI(event.target.checked);
    };

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

    const handleClickOpen = () => {
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
                            value={checkedF ? "1" : "0"}
                            //onChange={handleChangeFree}
                            {...register('free')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={checkedF}
                                    onChange={blindFree}
                                    //onChange={function(event){ blindFree(checkedF); handleChangeFree()}}
                                />}
                            label="Free"
                            labelPlacement="top"
                        />

                        <FormControlLabel
                            value={checkedI ? "1" : "0"}
                            {...register('insitu')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={checkedI}
                                    onChange={blindInsi}
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
                            Listo
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>

        </div>
    );
};

export default ConcertlUpdateForm;