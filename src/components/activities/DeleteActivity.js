import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from "@material-ui/core";
import React from "react";
import {Activity} from "@/lib/activities";
import translateMessage from "@/constants/messages";

const DeleteActivity = ({id}) => {

    const router = useRouter();
    const {data: activity, error} = useSWR(`/activityfestivals/${id}`, fetcher);

    const handleDelete = async () => {
        try {
            await Activity.delete(id);
            router.push(Routes.ACTIVITIES);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    if(error) return <div>"No se pudo borrar la actividad..."</div>;
    if(!activity) return <Loading/>;

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

export default DeleteActivity;
