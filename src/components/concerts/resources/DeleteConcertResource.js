import {fetcher} from "../../../utils";
import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button, IconButton, makeStyles} from "@material-ui/core";
import React from "react";
import {ConcertResource} from "@/lib/concert_resources";


const DeleteConcertResource = ({idResource}) => {

    const router = useRouter();
    const {id} = router.query;
    const {data: concertResource, error} = useSWR(`/concerts/${id}/resources/${idResource}`, fetcher);

    const handleDelete = async () => {
        try {
            await ConcertResource.delete(id, idResource);
            router.push(Routes.CONCERTS);
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

    if(error) return <div>"No se puede remover el recurso..."</div>;
    if(!concertResource) return <Loading/>;

    return (
        <div>
            {/*<IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >*/}
            {/*    <LinkOffIcon />*/}
            {/*</IconButton>*/}
            <Button
                variant="outlined"
                color="primary"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
            >
                Remover
            </Button>
        </div>
    );

};

export default DeleteConcertResource;
