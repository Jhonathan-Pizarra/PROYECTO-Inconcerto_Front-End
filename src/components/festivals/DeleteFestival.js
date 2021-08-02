import useSWR from "swr";
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
    LinearProgress, makeStyles
} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import {Festival} from "@/lib/festivals";
import translateMessage from "@/constants/messages";
import SnackSuccess from "@/components/SnackSuccess";

const useStyles = makeStyles((theme) => ({
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

const DeleteFestival = ({id}) => {

    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const timer = useRef();

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
        handleClose();
        router.push('/festivales');

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

        console.log('handleDelete');
        try {
            //await Promise.allSettled([Festival.delete(id), router.push('/festivales')]);
            await Festival.delete(id);
            //alert('Eliminado!');
            setDeleteSuccess(true);
        } catch (error) {
            console.log('HandelDeleteError', error.response);
            if (error.response) {
                alert(translateMessage(error.response.data.message));
                //alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                alert(translateMessage(error.request.message));
                //alert(error.request.message);
                console.log(error.request);
            } else {
                alert(translateMessage(error.data.message));
                //alert(error.message);
                console.log("Error", error.message);
            }
        }
        setTimeout(handleRedirect,3000); //Serás redirijodo a index en 3...2...1
    };



    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleOpen}
            >
                Eliminar
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Deseas eliminar este festival?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        🎼 Asegúrese de no tener conciertos en este festival primero.🎵 <br/>
                        De lo contrario no podrá eliminarlo ❌
                    </DialogContentText>
                </DialogContent>
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
            {deleteSuccess && <SnackSuccess/>}
        </div>
    );

};

export default DeleteFestival;