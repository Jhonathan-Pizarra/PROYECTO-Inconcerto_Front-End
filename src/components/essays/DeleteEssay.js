import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from "@material-ui/core";
import React from "react";
import {Essay} from "@/lib/essays";


const DeleteEssay = () => {

    const router = useRouter();
    const {id} = router.query;
    const {data: essay, error} = useSWR(`/essays/${id}`, fetcher);

    const handleDelete = async () => {
        try {
            await Essay.delete(id);
            router.push(Routes.ESSAYS);
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
    };

    if(error) return <div>"No se pudo borrar el ensayo..."</div>;
    if(!essay) return <Loading/>;

    return (
        <div>
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

export default DeleteEssay;
