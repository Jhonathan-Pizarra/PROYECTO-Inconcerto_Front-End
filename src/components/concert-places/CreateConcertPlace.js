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
    Fab,
    FormControlLabel,
    makeStyles,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {PlaceConcert} from "@/lib/concert_places";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Este campo es necesario..."),
    address: yup.string().required("Este campo es necesario..."),
    //permit: yup.string().required("Este campo es necesario..."),
    aforo: yup.number().typeError('Debes escribir un número').positive('Esa cantidad no es válida').min(1, 'Lo mínimo es 1').required("Este campo es necesario..."),
    description: yup.string().required("Este campo es necesario..."),
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


const CreateConcertPlace = () => {

    const classes = useStyles();
    const {data: place, error, mutate} = useSWR(`/places`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [checkedPermission, setCheckedPermission] = useState(true);
    const [open, setOpen] = React.useState(false);

    const onSubmit = async (data) => {
        console.log('data', data);

        const newConcertPlace = {
            name: data.name,
            address: data.address,
            permit: data.permit,
            aforo: data.aforo,
            description: data.description,
        };

        const formData = new FormData();
        formData.append("name", newConcertPlace.name);
        formData.append("address", newConcertPlace.address);
        formData.append("permit", newConcertPlace.permit);
        formData.append("aforo", newConcertPlace.aforo);
        formData.append("description", newConcertPlace.description);

        try {
            await PlaceConcert.create(formData);
            mutate("/places");
            handleClose();
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
        reset();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckPermission = (event) => {
        setCheckedPermission(event.target.checked);
    };

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    if(error) return <div>"No se pudo crear el lugar del concierto..."</div>;
    if(!place) return <Loading/>;

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
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.name?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="address"
                            label="Dirección"
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('address')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.address?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="aforo"
                            label="Aforo"
                            type="number"
                            defaultValue={0}
                            {...register('aforo')}
                        />
                        <DialogContentText color="secondary">
                            {errors.aforo?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent style={{textAlign: 'center'}}>
                        <FormControlLabel
                            value={checkedPermission ? "1" : "0"}
                            {...register('permit')}
                            control={
                                <Checkbox
                                    autoFocus={true}
                                    checked={checkedPermission}
                                    onChange={handleCheckPermission}
                                />
                            }
                            label="Permiso"
                            labelPlacement="top"
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="description"
                            label="Descripción"
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('description')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.description?.message}
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

export default CreateConcertPlace;