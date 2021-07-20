import {fetcher} from "../../../utils";
import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button, IconButton, makeStyles} from "@material-ui/core";
import React from "react";
import {Calendar} from "@/lib/calendars";
import {CalendarArtist} from "@/lib/calendar_artists";
import {ConcertArtist} from "@/lib/concert_artists";
import LinkOffIcon from '@material-ui/icons/LinkOff';
import translateMessage from "@/constants/messages";

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
    },
}));

const DeleteConcertArtist = ({idArtist}) => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: concertArtist, error} = useSWR(`/concerts/${id}/artists/${idArtist}`, fetcher);

    const handleDelete = async () => {
        try {
            await ConcertArtist.delete(id, idArtist);
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

    if(error) return <div>"No se pudo borrar el artista..."</div>;
    if(!concertArtist) return <Loading/>;

    return (
        <div>
            <IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >
                <LinkOffIcon />
            </IconButton>
        </div>
    );

};

export default DeleteConcertArtist;
