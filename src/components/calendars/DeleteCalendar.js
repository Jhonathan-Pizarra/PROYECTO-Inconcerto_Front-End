import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Calendar} from "@/lib/calendars";

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
    },
}));

const DeleteCalendar = ({id}) => {
    const router = useRouter();
    const classes = useStyles();
    const {data: calendar, error} = useSWR(`/calendars/${id}`, fetcher);

    const handleDelete = async () => {
        try {
            await Calendar.delete(id);
            router.push(Routes.CALENDARS);
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

    if(error) return <div>"No se pudo borrar el calendario..."</div>;
    if(!calendar) return <Loading/>;

    return (
        <div>
            <IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >
                <DeleteIcon />
            </IconButton>
        </div>
    );

};

export default DeleteCalendar;
