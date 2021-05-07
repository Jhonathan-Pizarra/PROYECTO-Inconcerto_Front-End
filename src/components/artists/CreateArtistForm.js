import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Artist} from "@/lib/artists";
import useSWR, {mutate} from "swr";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Fab, FormControlLabel, Grid, InputLabel,
    makeStyles, Select,
    TextField, Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const CreateArtistForm = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const {data: artists, mutate, error} = useSWR(`/artists`, fetcher);
    const [foodGroup, setfoodGroup] = useState(null);
    const [checkedPassage, setCheckedPassage] = useState(true);


    const onSubmit = async (data) => {
        console.log('data', data);

        const newArtist = {
            ciOrPassport: data.ciOrPassport,
            artisticOrGroupName: data.artisticOrGroupName,
            name: data.name,
            lastName: data.lastName,
            nationality: data.nationality,
            mail: data.mail,
            phone: data.phone,
            passage: data.passage,
            instruments: data.instruments,
            emergencyPhone: data.emergencyPhone,
            emergencyMail: data.emergencyMail,
            foodGroup: data.foodGroup,
            observation: data.observation,
        };

        const formData = new FormData();
        formData.append("ciOrPassport", newArtist.ciOrPassport);
        formData.append("artisticOrGroupName", newArtist.artisticOrGroupName);
        formData.append("name", newArtist.name);
        formData.append("lastName", newArtist.lastName);
        formData.append("nationality", newArtist.nationality);
        formData.append("mail", newArtist.mail);
        formData.append("phone", newArtist.phone);
        formData.append("passage", newArtist.passage);
        formData.append("instruments", newArtist.instruments);
        formData.append("emergencyPhone", newArtist.emergencyPhone);
        formData.append("emergencyMail", newArtist.emergencyMail);
        formData.append("foodGroup", newArtist.foodGroup);
        formData.append("observation", newArtist.observation);

        try {
            await Artist.create(formData);
            mutate("/artists");
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // alert(error.response.message);
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
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckPassage = (event) => {
        setCheckedPassage(event.target.checked);
    };

    const handleChangeSelection = () => {
        setfoodGroup({foodGroup});
    };


    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!artists) return <Loading/>;

    return (
        <div>

            <Tooltip title="Add" aria-label="add" className={classes.fixed}>
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
                            id="standard-number"
                            label="Cédula o Pasaporte"
                            type="number"
                            {...register('ciOrPassport')}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="standard-helperTex"
                            label="Nombre artístico"
                            type="text"
                            {...register('artisticOrGroupName')}
                            helperText="O la banda a la que pertenece"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText>
                            Datos personales:
                        </DialogContentText>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10}}
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Nombre"
                                    type="text"
                                    {...register('name')}
                                    fullWidth
                                />
                                {/*<TextField*/}
                                {/*    style={{paddingRight: 10}}*/}
                                {/*    margin="dense"*/}
                                {/*    id="outlined-basic"*/}
                                {/*    label="Lol"*/}
                                {/*    type="text"*/}
                                {/*    {...register('lastName')}*/}
                                {/*    fullWidth*/}
                                {/*/>*/}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10, marginLeft:10}}
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Apellido"
                                    type="text"
                                    {...register('lastName')}
                                />
                                {/*<TextField*/}
                                {/*    style={{paddingRight: 10, marginLeft:10}}*/}
                                {/*    margin="dense"*/}
                                {/*    id="outlined-basic"*/}
                                {/*    label="XD"*/}
                                {/*    type="text"*/}
                                {/*    {...register('lastName')}*/}
                                {/*/>*/}
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item xs sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10}}
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Nacionalidad"
                                    type="text"
                                    {...register('nationality')}
                                />
                            </Grid>
                            <Grid item xs sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10, marginLeft:10}}
                                    //style={{marginLeft: 10}}
                                    margin="dense"
                                    id="standard-number"
                                    label="Teléfono"
                                    type="number"
                                    {...register('phone')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <TextField
                                margin="dense"
                                id="outlined-basic"
                                label="E-mail"
                                type="text"
                                {...register('mail')}
                                fullWidth
                            />
                        </Grid>

                        {/*<TextField*/}
                        {/*    margin="dense"*/}
                        {/*    id="outlined-basic"*/}
                        {/*    label="Nombre"*/}
                        {/*    type="text"*/}
                        {/*    {...register('name')}*/}
                        {/*/>*/}
                        {/*<TextField*/}
                        {/*    margin="dense"*/}
                        {/*    id="outlined-basic"*/}
                        {/*    label="Apellido"*/}
                        {/*    type="text"*/}
                        {/*    {...register('lastName')}*/}
                        {/*/>*/}
                    </DialogContent>

                    <DialogContent style={{textAlign: 'center'}}>
                        <FormControlLabel
                            value={checkedPassage ? "1" : "0"}
                            {...register('passage')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={checkedPassage}
                                    onChange={handleCheckPassage}
                                />
                            }
                            label="Pasaje"
                            labelPlacement="top"
                        />

                        <TextField
                            margin="dense"
                            id="outlined-basic"
                            label="Violín, Guitarra, Piano..."
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('instruments')}
                            helperText="¿Qué instrumento toca...?"
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <Grid container spacing={0}>
                            <Grid item xs sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10}}
                                    margin="dense"
                                    id="standard-number"
                                    label="Teléfono Emergencia"
                                    type="number"
                                    {...register('emergencyPhone')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs sm={6} md={6} lg={6}>
                                <TextField
                                    style={{paddingRight: 10, marginLeft:10}}
                                    margin="dense"
                                    id="outlined-basic"
                                    label="E-mail Emergencia"
                                    type="text"
                                    {...register('emergencyMail')}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Grupo Alimenticio</InputLabel>
                        <Select
                            fullWidth
                            native
                            value={foodGroup}
                            onChange={handleChangeSelection}
                            {...register("foodGroup")}
                        >
                            <option aria-label="None" value="" />
                            <option value={"Vegetariano"}>Vegetariano</option>
                            <option value={"Vegano"}>Vegano</option>
                            <option value={"Omnivoro"}>Onminivoro</option>
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="outlined-basic"
                            label="Observación"
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('observation')}
                            fullWidth
                        />
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

export default CreateArtistForm;