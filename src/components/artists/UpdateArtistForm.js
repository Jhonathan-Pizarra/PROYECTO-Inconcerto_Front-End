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
import {useRouter} from "next/router";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {Concert} from "@/lib/concerts";

const useStyles = makeStyles((theme) => ({
    edit:{
        color: "#FAC800",
    },
}));

const UpdateArtistForm = ({id}) => {

    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const { data: artist, mutate, error } = useSWR(`/artists/${id}`, fetcher);
    const [foodGroup, setfoodGroup] = useState(null);
    const [checkedPassage, setCheckedPassage] = useState(true);

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Artist.update(id, {
                ...data,
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
            });
            mutate();
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
    if(!artist) return <Loading/>;

    return (
        <div>

            <IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleClickOpen} >
                <EditIcon />
            </IconButton>

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
                            value={artist.ciOrPassport}
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
                    </DialogContent>

                    <DialogContent style={{textAlign: 'center'}}>
                        <FormControlLabel
                            value={checkedPassage ? "1" : "0"}
                            {...register('passage')}
                            control={
                                <Checkbox
                                    color="primary"
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
                            Editar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default UpdateArtistForm;