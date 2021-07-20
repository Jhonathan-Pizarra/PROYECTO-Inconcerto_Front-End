import React, {useState} from "react";
import {useForm} from "react-hook-form";
import useSWR from "swr";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {Lodging} from "@/lib/lodgings";

const useStyles = makeStyles((theme) => ({
    edit:{
        color: "#FAC800",
    },
}));

//Este {id} lo recibe desde el componente donde lo llamemos
const UpdateLodging = ({id}) => {

    const classes = useStyles();
    const { register, handleSubmit, reset } = useForm();
    const [open, setOpen] = useState(false);
    const {data: lodging, error, mutate} = useSWR(`/lodgings/${id}`, fetcher);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!lodging) return <Loading/>;

    var inLodgign = new Date(lodging.checkIn); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var yearIn = inLodgign.getFullYear();
    var monthIn = (inLodgign.getMonth()+1).toString().padStart(2, "0");
    var dayIn = inLodgign.getDate().toString().padStart(2, "0");
    var hoursIn = ('0'+inLodgign.getHours()).substr(-2);
    var minIn = inLodgign.getMinutes().toString().padStart(2, "0");
    const dateIn = yearIn+'-'+monthIn+'-'+dayIn+'T'+hoursIn+':'+minIn;

    var outLodging = new Date(lodging.checkOut); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var yearOut = outLodging.getFullYear();
    var monthOut = (outLodging.getMonth()+1).toString().padStart(2, "0");
    var dayOut = outLodging.getDate().toString().padStart(2, "0");
    var hoursOut = ('0'+outLodging.getHours()).substr(-2);
    var minOut = outLodging.getMinutes().toString().padStart(2, "0");
    const dateOut = yearOut+'-'+monthOut+'-'+dayOut+'T'+hoursOut+':'+minOut;


    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Lodging.update(id, {
                ...data,
                name:  ((data.name) === "") ? `Vacío (${lodging.id})` : data.name,
                type: ((data.type) === "") ? `Vacío (${lodging.id})` : data.type,
                description: ((data.description) === "") ? `Vacío (${lodging.id})` : data.description,
                observation: ((data.observation) === "") ? `Vacío (${lodging.id})` : data.observation,
                checkIn: ((data.checkIn) === "") ? dateIn : data.checkIn,
                checkOut: ((data.checkOut) === "") ? dateOut : data.checkOut,
            });
            mutate();
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>

            <IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleOpen} >
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
                            id="name"
                            label="Nombre"
                            defaultValue={lodging.name}
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Tipo de hospedaje"
                            defaultValue={lodging.type}
                            type="text"
                            {...register('type')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Característica"
                            defaultValue={lodging.description}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('description')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Observación"
                            defaultValue={lodging.observation}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('observation')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            id="datetime-local"
                            label="Check In"
                            type="datetime-local"
                            //defaultValue="2017-05-24T10:30"
                            defaultValue={dateIn}
                            margin="dense"
                            //className={classes.textField}
                            {...register('checkIn')}
                            //dateConcert
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            id="datetime-local"
                            label="Check Out"
                            type="datetime-local"
                            //defaultValue="2017-05-24T10:30"
                            defaultValue={dateOut}
                            margin="dense"
                            //className={classes.textField}
                            {...register('checkOut')}
                            //dateConcert
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

export default UpdateLodging;