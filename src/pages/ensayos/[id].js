import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Button, CardActions, Link as MuiLink} from "@material-ui/core";
import Link from "next/link";
import EssaylUpdateForm from "@/components/essays/EssayUpdateForm";
import Routes from "@/constants/routes";
import {Essay} from "@/lib/essays";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

const EnsayosID = () =>{
    const router = useRouter();
    const {id} = router.query;
    const {data: essay, error} = useSWR(`/essays/${id}`, fetcher);


    if(error) return <div>"No se obtuvo el ensayo..."</div>;
    if(!essay) return <Loading/>;

    /*DELETE*/
    const handleDelete = async () => {
        try {
            await Essay.delete(id);
            router.push(Routes.ESSAYS);
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
            <EssaylUpdateForm/>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                // className={classes.button}
                startIcon={<DeleteIcon />}
            >
                Eliminar
            </Button>

            <h1>Detalle Festival</h1>
            <div>
                <h2>Ensayo ID: {essay.id}</h2>
                <p>Nombre: {essay.name}</p>
                <p>Fecha: {essay.dateEssay}</p>
                <p>Lugar: {essay.place}</p>
                <p>Festival:
                <Link href={essay.festival} passHref>
                    <MuiLink>
                        Ver
                    </MuiLink>
                </Link>
                </p>
            </div>

        </div>
    );

};

export default withAuth(EnsayosID);
