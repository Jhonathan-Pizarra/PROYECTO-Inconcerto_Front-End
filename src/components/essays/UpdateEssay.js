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
    InputLabel,
    Select,
    TextField
} from "@material-ui/core";
import {fetcher} from "../../utils";
import {Essay} from "@/lib/essays";
import Loading from "@/components/Loading";
import {useRouter} from "next/router";
import EditIcon from "@material-ui/icons/Edit";


const UpdateEssay = () => {

    const router = useRouter();
    const {id} = router.query;
    const {data: essay, error, mutate} = useSWR(`/essays/${id}`, fetcher);
    const {data: festivals} = useSWR(`/festivals`, fetcher);
    const { register, handleSubmit } = useForm();
    const [state, setState] = useState(null);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Essay.update(id, {
                ...data,
                name: data.name,
                dateEssay: data.dateEssay,
                place: data.place,
                festival_id: data.festival_id,
            });
            mutate();
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeSelection = () => {
        setState({state});
    };

    if(error) return <div>"No se pudo editar el ensayo..."</div>;
    if(!essay) return <Loading/>;
    if(!festivals) return <Loading/>;

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
                            type="text"
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            id="datetime-local"
                            label="Fecha"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            margin="dense"
                            //className={classes.textField}
                            {...register('dateEssay')}
                            //dateConcert
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            //autoFocus
                            // className={classes.title}
                            margin="dense"
                            id="place"
                            label="Lugar"
                            type="text"
                            {...register('place')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Festival</InputLabel>
                        <Select
                            fullWidth
                            native
                            value={state}
                            onChange={handleChangeSelection}
                            {...register("festival_id")}
                        >
                            {festivals.data.map((festival) => (
                                <option key={festival.id}  value={festival.id}>{festival.name}</option>
                            ))}
                        </Select>
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

export default UpdateEssay;