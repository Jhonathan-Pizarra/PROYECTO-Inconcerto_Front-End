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
    FormControlLabel,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import Loading from "@/components/Loading";
import EditIcon from "@material-ui/icons/Edit";
import {PlaceConcert} from "@/lib/concert_places";

//Este {id} lo recibe desde el componente donde lo llamemos, en este caso sería: <UpdateConcertPlace id={place.id}/>

const UpdateConcertPlace = ({id}) => {

    const {data: place, mutate, error} = useSWR(`/places/${id}`, fetcher);
    const { register, handleSubmit } = useForm();
    const [checkedPermission, setCheckedPermission] = useState(true);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await PlaceConcert.update(id, {
                ...data,
                name: data.name,
                address: data.address,
                permit: data.permit,
                aforo: data.aforo,
                description: data.description,
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
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckPermission = (event) => {
        setCheckedPermission(event.target.checked);
    };


    if(error) return <div>"No se puede editar el lugar..."</div>;
    if(!place) return <Loading/>;

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
                                defaultValue={place.name}
                                type="text"
                                {...register('name')}
                                fullWidth
                            />
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                //autoFocus
                                // className={classes.title}
                                margin="dense"
                                id="address"
                                label="Dirección"
                                type="text"
                                defaultValue={place.address}
                                multiline
                                rows={3}
                                rowsMax={6}
                                {...register('address')}
                                fullWidth
                            />
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="aforo"
                                label="Aforo"
                                type="number"
                                defaultValue={place.aforo}
                                {...register('aforo')}
                                helperText="(Déjelo en 0 si no aplica)"
                            />
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
                                defaultValue={place.description}
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

export default UpdateConcertPlace;