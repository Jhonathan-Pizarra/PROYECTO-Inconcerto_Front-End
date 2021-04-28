import React from "react";
import {useForm} from "react-hook-form";
import {Festival} from "@/lib/festivals";
import useSWR from "swr";
import {useRouter} from "next/router";
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
import EditIcon from "@material-ui/icons/Edit";
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


const FestivalUpdateForm = () => {
    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const { register, handleSubmit } = useForm();
    const {error, mutate} = useSWR(`/festivals/${id}`, fetcher);
    const [open, setOpen] = React.useState(false);
    // const fileInputRef = useRef();

    const onSubmit = async (data) => {
        console.log('data', data);
        console.log("data", data.image);

        try {
            await Festival.update(id, {
                ...data,
                name: data.name,
                description: data.description,
                image: data.image,
            });
            mutate();
            /*mutate(`/festivals/${data.id}`);*/
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

                    <DialogTitle id="form-dialog-title">Editar Festival</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor llena los siguientes campos:
                        </DialogContentText>
                        <TextField
                            //autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            // value={}
                            {...register('name')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            // autoFocus
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
                            Listo
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>

            {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <div>*/}
            {/*        <label htmlFor='name'>Nombre</label>*/}
            {/*        <input type='text' id='name' {...register('name')} />*/}
            {/*        /!*<p>{errors.name?.message}</p>*!/*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor='description'>Descripcion</label>*/}
            {/*        <textarea  type='text' id='description' {...register('description')}  rows={5} cols={30} />*/}
            {/*        /!*<p>{errors.description?.message}</p>*!/*/}
            {/*    </div>*/}

            {/*    <label>*/}
            {/*        Cargar imagen:*/}
            {/*        <input*/}
            {/*            name="image"*/}
            {/*            type="file"*/}
            {/*            // ref={register}*/}
            {/*            {...register('image')}*/}
            {/*        />*/}
            {/*    </label>*/}
            {/*    <br />*/}
            {/*    <button type="submit">Submit</button>*/}
            {/*</form>*/}

        </div>
    );
};

export default FestivalUpdateForm;