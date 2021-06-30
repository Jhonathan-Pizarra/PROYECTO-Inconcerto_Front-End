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
    const { register, handleSubmit, reset } = useForm();
    const [state, setState] = useState(null);
    const [open, setOpen] = useState(false);

    if(error) return <div>"No se pudo editar el ensayo..."</div>;
    if(!essay) return <Loading/>;
    if(!festivals) return <Loading/>;

    var d = new Date(essay.dateEssay); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    var year = d.getFullYear();
    var month = (d.getMonth()+1).toString().padStart(2, "0");
    var day = d.getDate().toString().padStart(2, "0");
    var hours = ('0'+d.getHours()).substr(-2);
    var min = d.getMinutes().toString().padStart(2, "0");
    const fulldate = year+'-'+month+'-'+day+'T'+hours+':'+min;

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            await Essay.update(id, {
                ...data,
                name: ((data.name) === "") ? `Vacío (${essay.id})` : data.name,
                dateEssay: data.dateEssay,
                place: ((data.place) === "") ? `Vacío (${essay.id})` : data.place,
                festival_id: data.festival_id,
            });
            mutate();
            //alert("Editado!");
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
        reset(); //Limpiar los imput después del submit
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeSelection = () => {
        setState({state});
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
                            defaultValue={essay.name}
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            //autoFocus
                            id="datetime-local"
                            label="Fecha"
                            type="datetime-local"
                            //defaultValue={`2017-05-24T10:30`}
                            defaultValue={fulldate}
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
                            defaultValue={essay.place}
                            {...register('place')}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Festival</InputLabel>
                        <Select
                            //autoFocus
                            fullWidth
                            native
                            value={state}
                            defaultValue={essay.festival}
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