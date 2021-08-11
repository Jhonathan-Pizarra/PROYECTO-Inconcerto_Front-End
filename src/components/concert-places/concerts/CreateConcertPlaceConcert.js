import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Concert} from "@/lib/concerts";
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    InputLabel,
    makeStyles,
    Select,
    TextField
} from "@material-ui/core";
import Loading from "@/components/Loading";
import AddIcon from "@material-ui/icons/Add";
import translateMessage from "@/constants/messages";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import SnackSuccess from "@/components/SnackSuccess";
import SnackError from "@/components/SnackError";
import {fetcher} from "../../../utils";
import {useRouter} from "next/router";
import useSWR, {mutate} from "swr";

const schema = yup.object().shape({
    name: yup.string().required("Este campo es necesario..."),
    dateConcert: yup.string().required("Debes escoger una fecha..."),
    duration: yup.string().required("Debes escoger una hora"),
});

const useStyles = makeStyles((theme) => ({
    addconcertplaceconcert: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        //bottom: theme.spacing(3),
        backgroundColor: "#ffeb33",
        "&:hover, &:focus": {
            backgroundColor: "#ffeb33",
        },
    },
    checkbox: {
        textAlign: "center",
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

const CreateConcertPlaceConcert = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: place} = useSWR(`/places/${id}`, fetcher);
    const {data: concert, error} = useSWR(`/concerts`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [modal, setModal] = useState(false);
    const [checkedInsi, setInsi] = useState(true);
    const [checkedFree, setFree] = useState(true);
    const [selectPlace, setSelectPlace] = useState(null);
    const [selectFestival, setSelectFestival] = useState(null);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] = useState(false);
    const [processing, setProcessing] = useState(false);

    if(error) return <div>"No se obtuvo el concierto..."</div>;
    if(!concert) return <Loading/>;
    if(!festivals) return <Loading/>;
    if(!place) return <Loading/>;

    const handleOpen = () => {
        reset(); //Limpiar los imput después del submit
        setCreateSuccess(false);
        setCreateError(false);
        setModal(true);
    };

    const handleClose = () => {
        setProcessing(false);
        setModal(false);
    };

    const handleChangePlace = () => {
        setSelectPlace({selectPlace});
    };

    const handleChangeFestival = () => {
        setSelectFestival({selectFestival});
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
            mutate(`/places/${id}/concerts`); //En este caso yo no tengo en mi API esta ruta ni, pero arbitrariamente le quemo el ID
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
            console.error(error.config);
        }
        reset(); //Limpiar los imput después del submit
    };

    /*  const handleValidate = () =>{
          setTimeout(handleClose,500000);
      };*/

    return (
        <div>
            <Button
                className={classes.addconcertplaceconcert}
                variant="contained"
                //color="secondary"
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
                            value={selectFestival}
                            onChange={handleChangeFestival}
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
                            value={place.id}
                            onChange={handleChangePlace}
                            {...register("place_id")}
                        >
                            <option key={place.id} value={place.id}>{place.name}</option>
                            {/*{places.data.map((place) => (*/}
                            {/*    <option key={place.id}  value={place.id}>{place.name}</option>*/}
                            {/*))}*/}
                        </Select>

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
            </Dialog>
            {createSuccess && <SnackSuccess/>}
            {createError && <SnackError/>}
        </div>
    );
};

export default CreateConcertPlaceConcert;
