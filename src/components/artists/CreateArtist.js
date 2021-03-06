import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Artist} from "@/lib/artists";
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
    Grid,
    InputLabel,
    makeStyles,
    Select,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
    ciOrPassport: yup.string().max(15, 'Has excedido el número dígitos permitidos').required("Este campo es necesario..."),
    artisticOrGroupName: yup.string().required("Este campo es necesario..."),
    name: yup.string().required("Este campo es necesario..."),
    lastName: yup.string().required("Este campo es necesario..."),
    nationality: yup.string().required("Este campo es necesario..."),
    mail: yup.string().email('Ese e-mail no es válido...').required("Este campo es necesario..."),
    phone: yup.string().length(10, 'Se requieren 10 números').matches(phoneRegExp, 'Ése número no es válido').required('Este campo es necesario...'),
    //passage: yup.boolean().required(),
    instruments: yup.string().required('Este campo es necesario'),
    //emergencyPhone: yup.number('Debes escribir un número').positive('Números no válidos...').required('Este campo es necesario'),
    emergencyPhone: yup.string().matches(phoneRegExp, 'Ése número no es válido').required('Este campo es necesario...'),
    emergencyMail: yup.string().email('Ese e-mail no es válido...').required("Este campo es necesario..."),
    //foodGroup: yup.string().required('Este campo es necesario...'),
    observation: yup.string().required('Este campo es necesario...'),
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

const CreateArtist = () => {

    const classes = useStyles();
    const {data: artists, mutate, error} = useSWR(`/artists`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [checkedPassage, setCheckedPassage] = useState(true);
    const [foodGroup, setfoodGroup] = useState(null);
    const [open, setOpen] = useState(false);


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
            handleClose();
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
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
        reset();
    };

    const handleOpen = () => {
        reset();
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

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!artists) return <Loading/>;

    return (
        <div>

            <Tooltip title="Nuevo" aria-label="add" className={classes.fixed}>
                <Fab  color="secondary" onClick={handleOpen} > {/*className={classes.fixed}*/}
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
                        <DialogContentText color="secondary">
                            {errors.ciOrPassport?.message}
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="standard-helperTex"
                            label="Nombre artístico"
                            type="text"
                            {...register('artisticOrGroupName')}
                            helperText="O la banda a la que pertenece"
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.artisticOrGroupName?.message}
                        </DialogContentText>
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
                                <DialogContentText color="secondary">
                                    {errors.name?.message}
                                </DialogContentText>
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
                                <DialogContentText color="secondary">
                                    {errors.lastName?.message}
                                </DialogContentText>
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
                                <DialogContentText color="secondary">
                                    {errors.nationality?.message}
                                </DialogContentText>
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
                                <DialogContentText color="secondary">
                                    {errors.phone?.message}
                                </DialogContentText>
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
                            <DialogContentText color="secondary">
                                {errors.mail?.message}
                            </DialogContentText>
                        </Grid>
                    </DialogContent>

                    <DialogContent style={{textAlign: 'center'}}>
                        <FormControlLabel
                            value={checkedPassage ? "1" : "0"}
                            //value={checkedPassage}
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
                        <DialogContentText color="secondary">
                            {errors.instruments?.message}
                        </DialogContentText>
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
                                <DialogContentText color="secondary">
                                    {errors.emergencyPhone?.message}
                                </DialogContentText>
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
                                <DialogContentText color="secondary">
                                    {errors.emergencyMail?.message}
                                </DialogContentText>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Grupo Alimenticio</InputLabel>
                        <Select
                            //autoFocus
                            fullWidth
                            native
                            //defaultValue={"default"}
                            value={foodGroup}
                            onChange={handleChangeSelection}
                            {...register("foodGroup")}
                        >
                            {/*<option aria-label="None" value="" />*/}
                            <option value={"Vegano"}>Vegano</option>
                            <option value={"Vegetariano"}>Vegetariano</option>
                            <option value={"Omnivoro"}>Onminivoro</option>
                            <option value={"Crudista"}>Crudista</option>
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
                        <DialogContentText color="secondary">
                            {errors.observation?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
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

export default CreateArtist;