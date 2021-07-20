import {fetcher} from "../../../utils";
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
    Fab,
    InputLabel,
    makeStyles,
    Select,
    Tooltip
} from "@material-ui/core";
import Loading from "@/components/Loading";
import {useRouter} from "next/router";
import LinkIcon from "@material-ui/icons/Link";
import {ConcertResource} from "@/lib/concert_resources";

const useStyles = makeStyles((theme) => ({
    fixed: {
        /*display: 'inline-flex',*/
        //position: '-moz-initial',//a la derecha
        position: 'fixed', //a la izquierda...
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const CreateConcertResource = () => {

    const classes = useStyles();

    const router = useRouter();
    const {id} = router.query;

    const {data: concerts} = useSWR(`/concerts`, fetcher);
    const {data: resources} = useSWR(`/resources`, fetcher);
    const {data: concertResources, mutate, error} = useSWR(`/concerts/${id}/resources`, fetcher);

    const { register, handleSubmit, reset} = useForm();
    const [concertSelected, setConcertSelected] = useState(null);
    const [resourceSelected, setResourceSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        console.log('data', data);

        const newConcertResource = {
            concert_id: data.concert_id,
            resource_id: data.resource_id,
        };

        const formData = new FormData();
        formData.append("concert_id", newConcertResource.concert_id);
        formData.append("resource_id", newConcertResource.resource_id);

        try {
            await ConcertResource.create(id,formData);
            mutate(`/concerts/${id}/resources`);
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

    const handleChangeConcert = () => {
        setConcertSelected({concertSelected});
    };

    const handleChangeResource = () => {
        setResourceSelected({resourceSelected});
    };

    const handleValidate = () =>{
        setTimeout(handleClose,500000);
    };

    if(error) return <div>"Recarga la página para continuar..."</div>;
    if(!concertResources) return <Loading/>;
    if(!concerts) return <Loading/>;
    if(!resources) return <Loading/>;

    return (
        <div>

            <Tooltip title="Vincular" aria-label="add" className={classes.fixed}>
                <Fab  color="primary" onClick={handleOpen} > {/*className={classes.fixed}*/}
                    <LinkIcon />
                </Fab>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="form-dialog-title">InConcerto</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <InputLabel htmlFor="outlined-age-native-simple">Conciertos</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={concertSelected}
                            onChange={handleChangeConcert}
                            {...register("concert_id")}
                        >
                            {concerts.data.map((concert) => (
                                <option key={concert.id}  value={concert.id}>{concert.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogContent>
                        <InputLabel htmlFor="outlined-age-native-simple">Recurso</InputLabel>
                        <Select
                            fullWidth
                            autoFocus
                            native
                            value={resourceSelected}
                            onChange={handleChangeResource}
                            {...register("resource_id")}
                        >
                            {resources.data.map((resource) => (
                                <option key={resource.id}  value={resource.id}>{resource.name}</option>
                            ))}
                        </Select>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleValidate} color="primary" type="submit">
                            Vincular
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default CreateConcertResource;