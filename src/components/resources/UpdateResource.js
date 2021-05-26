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
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import {Resource} from "@/lib/resources";


//Este {id} lo recibe desde el componente donde lo llamemos, en este caso sería: <UpdateResorce id={resource.id}/>
const UpdateResource = ({id}) => {

    const { register, handleSubmit, reset } = useForm();
    const [open, setOpen] = useState(false);
    const {data: resource, mutate, error} = useSWR(`/resources/${id}`, fetcher);

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!resource) return <Loading/>;

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Resource.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${resource.id})` : data.name,
                quantity: (((data.quantity) === "") || ((data.quantity) < 0) ) ? '0' : data.quantity,
                description: ((data.description) === "") ? `Sin descripción` : data.description,
            });
            mutate();
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
                onClick={handleOpen}
            >
                Editar
            </Button>

            {/*<IconButton aria-label="editar"  className={classes.edit} size="small" onClick={handleOpen} >*/}
            {/*    <EditIcon />*/}
            {/*</IconButton>*/}

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre"
                            defaultValue={resource.name}
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="standard-number"
                            label="Cantidad"
                            type="number"
                            defaultValue={resource.quantity}
                            //autoFocus
                            {...register('quantity')}
                            helperText="(0 si no aplica)"
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="outlined-basic"
                            label="Observación"
                            defaultValue={resource.description}
                            type="text"
                            multiline
                            rows={3}
                            rowsMax={6}
                            {...register('description')}
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

export default UpdateResource;