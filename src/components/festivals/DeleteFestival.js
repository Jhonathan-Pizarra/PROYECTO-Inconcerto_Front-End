import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from "@material-ui/core";
import React from "react";
import {Festival} from "@/lib/festivals";
import translateMessage from "@/constants/messages";
import SnackError from "@/components/SnackError";


const DeleteFestival = () => {

    const router = useRouter();
    const {id} = router.query;
    const {data: festival, error} = useSWR(`/festivals/${id}`, fetcher);

    if(error) return <div>"No se pudo borrar el festival..."</div>;
    if(!festival) return <Loading/>;

    const handleDelete = async () => {
        try {
            await Festival.delete(id);
            router.push(Routes.FESTIVALS);
        } catch (error) {
            if (error.response) {
                //alert(translateMessage(error.response.data.message));
                //alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                //alert(translateMessage(error.request.message));
                //alert(error.request.message);
                console.log(error.request);
            } else {
                //alert(translateMessage(error.data.message));
                //alert(error.message);
                console.log("Error", error.message);
            }
            alert(translateMessage(error.config));
            //alert(error.config);
            console.log(error.config);
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
            >
                Eliminar
            </Button>
        </div>
    );

};

export default DeleteFestival;
