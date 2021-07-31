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
import {Concert} from "@/lib/concerts";
import IconButton from "@material-ui/core/IconButton";
import translateMessage from "@/constants/messages";

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

const DeleteConcert = ({id}) => {

    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
        router.push('/conciertos');
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
            await Concert.delete(id);
            //router.push(Routes.CONCERTS);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                //alert(error.response.message);
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
        }
        setTimeout(handleRedirect,3000); //Serás redirijodo a index en 3...2...1
    };


    return (
        /*<div>
            <IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >
                <DeleteIcon />
            </IconButton>
        </div>*/
        <div>

            <IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleOpen} >
                <DeleteIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Deseas eliminar este concierto?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        🎼 Asegúrese de no tener <em><strong>artistas</strong></em> y/o <em><strong>recursos</strong></em> en este concierto primero.🎹 <br/>
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

        </div>
    );

};

export default DeleteConcert;
