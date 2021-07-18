import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from "@material-ui/core";
import React from "react";
import {FeedingPlace} from "@/lib/feeding_places";


const DeleteFeedingPlace = ({id}) => {
    const router = useRouter();
    const {data: fplace, error} = useSWR(`/feeding_places`, fetcher);

    const handleDelete = async () => {
        try {
            await FeedingPlace.delete(id);
            router.push(Routes.FEEDINGPLACES);
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

    if(error) return <div>"No se pudo borrar el lugar de alimentación..."</div>;
    if(!fplace) return <Loading/>;

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

export default DeleteFeedingPlace;
