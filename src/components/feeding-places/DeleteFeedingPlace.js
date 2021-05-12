import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Artist} from "@/lib/artists";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button, makeStyles} from "@material-ui/core";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {FeedingPlace} from "@/lib/feeding_places";

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
    },
}));

const DeleteFeedingPlace = ({id}) => {
    const router = useRouter();
    const classes = useStyles();
    const {data: fplace, error} = useSWR(`/feeding_places/${''}`, fetcher);

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

    if(error) return <div>"No se pudo borrar el artista..."</div>;
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
            {/*<IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >*/}
            {/*    <DeleteIcon />*/}
            {/*</IconButton>*/}
        </div>
    );

};

export default DeleteFeedingPlace;
