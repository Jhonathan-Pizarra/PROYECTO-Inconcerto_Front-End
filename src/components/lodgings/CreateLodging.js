import React from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    makeStyles,
    TextField,
    Tooltip
} from "@material-ui/core";
import {fetcher} from "../../utils";
import AddIcon from "@material-ui/icons/Add";
import Loading from "@/components/Loading";
import {Lodging} from "@/lib/lodgings";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Este campo es necesario..."),
    type: yup.string().required("Este campo es necesario..."),
    description: yup.string().required("Este campo es necesario..."),
    observation: yup.string().required("Este campo es necesario..."),
    checkIn: yup.string().required("Debes escoger una fecha..."),
    checkOut: yup.string().required("Debes escoger una fecha..."),
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


const CreateLodging = () => {

    const classes = useStyles();
    const {data: lodging, error, mutate} = useSWR(`/lodgings`, fetcher);
    const { register, handleSubmit, reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [open, setOpen] = React.useState(false);

    if(error) return <div>"No se obtuvo el hospedaje..."</div>;
    if(!lodging) return <Loading/>;

    const onSubmit = async (data) => {
        console.log('data', data);

        const newLodging = {
            name: data.name,
            type: data.type,
            description: data.description,
            observation: data.observation,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
        };

        const formData = new FormData();
        formData.append("name", newLodging.name);
        formData.append("type", newLodging.type);
        formData.append("description", newLodging.description);
        formData.append("observation", newLodging.observation);
        formData.append("checkIn", newLodging.checkIn);
        formData.append("checkOut", newLodging.checkOut);

        try {
            await Lodging.create(formData);
            mutate("/lodgings");
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

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

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
                            margin="dense"
                            id="name"
                            label="Tipo de hospedaje"
                            type="text"
                            {...register('type')}
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.type?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Característica"
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

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
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

                    <DialogContent>
                        <TextField
                            id="datetime-local"
                            label="Check In"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            margin="dense"
                            //className={classes.textField}
                            {...register('checkIn')}
                            //dateConcert
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.checkIn?.message}
                        </DialogContentText>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            id="datetime-local"
                            label="Check Out"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            margin="dense"
                            //className={classes.textField}
                            {...register('checkOut')}
                            //dateConcert
                            fullWidth
                        />
                        <DialogContentText color="secondary">
                            {errors.checkOut?.message}
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

export default CreateLodging;