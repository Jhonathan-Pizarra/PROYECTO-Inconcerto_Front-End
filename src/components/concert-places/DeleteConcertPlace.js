import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import Routes from "@/constants/routes";
import {Button} from "@material-ui/core";
import React from "react";
import {PlaceConcert} from "@/lib/concert_places";

const DeleteConcertPlace = ({id}) => {

    const router = useRouter();
    const {data: place, error} = useSWR(`/places/${id}`, fetcher);

    const handleDelete = async () => {
        try {
            await PlaceConcert.delete(id);
            router.push(Routes.PLACES);
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

    if(error) return <div>"No se pudo borrar el lugar..."</div>;
    if(!place) return <Loading/>;

    return (
        <div>
            <Button
                size="small"
                color="primary"
                onClick={handleDelete}
            >
                Eliminar
            </Button>
        </div>
    );

};

export default DeleteConcertPlace;
