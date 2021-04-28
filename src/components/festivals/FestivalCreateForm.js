import React from "react";
import {useForm} from "react-hook-form";
import {Festival} from "@/lib/festivals";
import useSWR, {mutate} from "swr";
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

const useStyles = makeStyles((theme) => ({
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    body: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 4,
        "-webkit-box-orient": "vertical",
    },
}));


const FestivalCreateForm = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = React.useState(false);
    const {error, mutate} = useSWR(`/festivals`, fetcher);

    // const fileInputRef = useRef();

    const onSubmit = async (data) => {
        console.log('data', data);
        console.log("data", data.image[0]);
        const newFestival = {
            name: data.name,
            description: data.description,
            // category_id: 1,
            image: data.image[0],
        };

        const formData = new FormData();
        formData.append("name", newFestival.name);
        formData.append("description", newFestival.description);
        // formData.append("category_id", newFestival.category_id);
        formData.append("image", newFestival.image);

        try {
            await Festival.create(formData);
            mutate("/festivals");
            // console.log("file", fileInputRef.current.files[0]);
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

    return (
        <div>
            <Button variant="contained" color="secondary"  onClick={handleClickOpen}>
                Nuevo Festival
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
                            //autoFocus
                            // className={classes.body}
                            margin="dense"
                            id="description"
                            label="Descripción"
                            multiline
                            rows={3}
                            rowsMax={6}
                            type="text"
                            {...register('description')}
                            fullWidth
                        />
                        {/*<TextareaAutosize*/}
                        {/*    autoFocus*/}
                        {/*    margin="dense"*/}
                        {/*    id="description"*/}
                        {/*    label="Descripción"*/}
                        {/*    aria-label="minimum height"*/}
                        {/*    rowsMin={5}*/}
                        {/*    {...register('description')}*/}
                        {/*    fullWidth*/}
                        {/*    placeholder="Des cripcion"*/}
                        {/*/>*/}
                    </DialogContent>
                    <DialogContentText>
                        <DialogContent>
                            Cargar imagen:
                            <input
                                name="image"
                                type="file"
                                // ref={register}
                                {...register('image')}
                            />
                        </DialogContent>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleClose} color="primary" type="submit">
                            Crear
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>
        </div>
    );
};

export default FestivalCreateForm;