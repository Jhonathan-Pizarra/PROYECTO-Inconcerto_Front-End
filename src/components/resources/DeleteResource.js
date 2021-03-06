import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import {Resource} from "@/lib/resources";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from "@material-ui/core";
import React from "react";


const DeleteResource = ({id}) => {

    const router = useRouter();
    const {data: resource, error} = useSWR(`/resources/${id}`, fetcher);

    const handleDelete = async () => {
        try {
            await Resource.delete(id);
            router.push(Routes.RESOURCES);
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

    if(error) return <div>"No se pudo borrar el recurso..."</div>;
    if(!resource) return <Loading/>;

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

export default DeleteResource;
