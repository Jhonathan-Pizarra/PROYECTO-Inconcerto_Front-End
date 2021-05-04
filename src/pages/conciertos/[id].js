import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import ConcertlUpdateForm from "@/components/concerts/ConcertUpdateForm";
import {Festival} from "@/lib/festivals";
import Routes from "@/constants/routes";
import {Concert} from "@/lib/concerts";
import {Button, Link} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";


const ConciertosID = () => {
    const router = useRouter();
    const {id} = router.query;
    const {data: concerts, error} = useSWR(`/concerts/${id}`, fetcher);


    if(error) return <div>"No se obtuvo el concierto..."</div>;
    if(!concerts) return <Loading/>;

    /*DELETE*/
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

    return (
        <div>
            <ConcertlUpdateForm/>
            <h1>Detalle Concierto</h1>
            <div>
                <h2>Concert ID: {concerts.id}</h2>
                <p>Nombre: {concerts.name}</p>
                <p>Fecha: {concerts.dateConcert}</p>
            </div>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                // className={classes.button}
                startIcon={<DeleteIcon />}
            >
                Eliminar
            </Button>
        </div>
    );

};

export default withAuth(ConciertosID);
