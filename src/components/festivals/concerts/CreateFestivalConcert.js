import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Concert} from "@/lib/concerts";
import useSWR, {mutate} from "swr";
import {
    Button, CardActions,
    Checkbox, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    FormControlLabel, FormHelperText, Grid,
    InputLabel, Link as MuiLink,
    makeStyles,
    Select,
    TextField,
    Tooltip
} from "@material-ui/core";
import Link from "next/link";
import Loading from "@/components/Loading";
import AddIcon from "@material-ui/icons/Add";
import translateMessage from "@/constants/messages";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import MySnacks from "@/components/SnackSuccess";
import SnackSuccess from "@/components/SnackSuccess";
import EditIcon from "@material-ui/icons/Edit";
import {fetcher} from "../../../utils";
import {useRouter} from "next/router";
import Routes from "@/constants/routes";
import CreateConcertPlace from "@/components/concert-places/CreateConcertPlace";
import CreatePlaceConcert from "@/components/festivals/concerts/places/CreatePlaceConcert";
import SnackError from "@/components/SnackError";

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
    checkbox: {
        textAlign: "center",
    },
    concerts:{
        backgroundColor: "#ffeb33",
        "&:hover, &:focus": {
            backgroundColor: "#ffeb33",
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: '#0d47a1',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const CreateFestivalConcert = () => {

    const classes = useStyles();

    const router = useRouter();
    const {id} = router.query;
    const {data: festivalConcerts, error} = useSWR(`/festivals/${id}/concerts`, fetcher);
    const {data: festival} = useSWR(`/festivals/${id}`, fetcher);
    const {data: places} = useSWR(`/places`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [checkedInsi, setInsi] = useState(true);
    const [checkedFree, setFree] = useState(true);
    const [state, setState] = useState(null);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"No se obtuvo el concierto..."</div>;
    if(!festivalConcerts) return <Loading/>;
    if(!festival) return <Loading/>;
    if(!places) return <Loading/>;

    const handleOpen = () => {
        reset();
        setCreateSuccess(false);
        setCreateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
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
            //festival_id: id.toString(),
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
            setProcessing(true);
            await Concert.create(formData);
            mutate(`/festivals/${id}/concerts`);
            handleClose();
            setCreateSuccess(true);
            // console.log("file", fileInputRef.current.files[0]);
        } catch (error) {
            setCreateError(true);
            setProcessing(false);
            handleClose();
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
        }
        reset(); //Limpiar los imput después del submit
    };

    return (
        <div>
            <Button
                variant="contained"
                className={classes.concerts}
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Concierto
            </Button>

            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus que al abrir se seleccione solo
                            // className={classes.title}
                            disabled={processing}
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
                            disabled={processing}
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
                            disabled={processing}
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

                    <DialogContent className={classes.checkbox}>
                        <FormControlLabel
                            value={checkedFree ? "1" : "0"}
                            //onChange={handleChangeFree}
                            {...register('free')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    disabled={processing}
                                    checked={checkedFree}
                                    onChange={handleCheckFree}
                                    //onChange={function(event){ handleCheckFree(checkedFree); handleChangeFree()}}
                                />}
                            label="Gratuito"
                            labelPlacement="top"
                        />

                        <FormControlLabel
                            value={checkedInsi ? "1" : "0"}
                            {...register('insitu')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    disabled={processing}
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
                            //disabled
                            //value={state}
                            //onChange={handleChangeSelection}
                            autoFocus
                            disabled={processing}
                            native
                            value={festival.id}
                            {...register("festival_id")}

                        >
                            <option key={festival.id} value={festival.id}>{festival.name}</option>
                            {/*{festivals.data.map((festival) => (
                                <option key={festival.id}  value={festival.id}>{festival.name}</option>
                            ))}*/}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <Grid container
                              spacing={1}
                              justifyContent="space-between"
                              alignItems="flex-end"
                        >
                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                <InputLabel htmlFor="outlined-age-native-simple">Lugar</InputLabel>
                                <Select
                                    fullWidth
                                    autoFocus
                                    disabled={processing}
                                    native
                                    value={state}
                                    onChange={handleChangeSelection}
                                    {...register("place_id")}
                                >
                                    {places.data.map((place) => (
                                        <option key={place.id}  value={place.id}>{place.name}</option>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item >
                                <CreatePlaceConcert/>
                            </Grid>
                        </Grid>


                    </DialogContent>


                    <DialogActions>
                        <Button onClick={handleClose}  color="primary">
                            Cancelar
                        </Button>
                        <div className={classes.wrapper}>
                            <Button
                                disabled={processing}
                                //onClick={handleValidate}
                                color="primary"
                                type="submit"
                            >
                                Crear
                            </Button>
                            {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </DialogActions>
                </form>
                {createSuccess && <SnackSuccess/>}
                {createError && <SnackError/>}
            </Dialog>
        </div>
    );
};

export default CreateFestivalConcert;
