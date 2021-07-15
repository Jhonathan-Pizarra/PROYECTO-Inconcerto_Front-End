import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button, makeStyles} from "@material-ui/core";
import React from "react";
import {Concert} from "@/lib/concerts";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
    },
}));

const DeleteConcert = ({id}) => {

    const classes = useStyles();
    const router = useRouter();
    const {data: concert, error} = useSWR(`/concerts`, fetcher);

    const handleDelete = async () => {
        try {
            await Concert.delete(id);
            router.push(Routes.CONCERTS);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // enqueueSnackbar("No se pudo eliminar el festival", {
                //     variant: "error",
                //     anchorOrigin: {
                //         vertical: "top",
                //         horizontal: "center",
                //     },
                // });
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

    if(error) return <div>"No se pudo borrar el concierto..."</div>;
    if(!concert) return <Loading/>;

    return (
        <div>
            <IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >
                <DeleteIcon />
            </IconButton>
        </div>
    );

};

export default DeleteConcert;
