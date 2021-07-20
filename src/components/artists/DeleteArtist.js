import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import {Artist} from "@/lib/artists";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import translateMessage from "@/constants/messages";

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
    },
}));

const DeleteArtist = ({id}) => {

    const classes = useStyles();
    const router = useRouter();
    const {data: artist, error} = useSWR(`/artists/${id}`, fetcher);

    const handleDelete = async () => {
        try {
            await Artist.delete(id);
            router.push(Routes.ARTISTS);
        } catch (error) {
            if (error.response) {
                //alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            alert(translateMessage(error.config));
            console.log(error.config);
        }
    };

    if(error) return <div>"No se pudo borrar el artista..."</div>;
    if(!artist) return <Loading/>;

    return (
        <div>
            <IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >
                <DeleteIcon />
            </IconButton>
        </div>
    );

};

export default DeleteArtist;
