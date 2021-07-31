import {mutate as mutateIndex} from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles
} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import {Essay} from "@/lib/essays";

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: '#0d47a1',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const DeleteEssay = ({id}) => {

    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const timer = useRef();
    //const {id} = router.query;
    //const {data: essay, error} = useSWR(`/essays/${id}`, fetcher);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //router.push('/festivales');
    };

    const handleRedirect = () => {
        mutateIndex('/essays');
        handleClose();
        router.push('/ensayos');
    };

    const handleConfirm = () => {
        if (!loading) {
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setLoading(false);
            }, 4000);
        }
        handleDelete();
    };

    const handleDelete = async () => {
        try {
            await Essay.delete(id);
            //router.push(Routes.ESSAYS);
        } catch (error) {
            if (error.response) {
                //alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
        setTimeout(handleRedirect,3000); //Serás redirijodo a index en 3...2...1
    };


    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                // className={classes.button}
                startIcon={<DeleteIcon />}
            >
                Eliminar
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Deseas eliminar este ensayo?"}</DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>

                    <div className={classes.wrapper}>
                        <Button
                            color="primary"
                            disabled={loading}
                            onClick={handleConfirm}
                        >
                            Confirmar
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default DeleteEssay;
