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
import {User} from "@/lib/users";
import translateMessage from "@/constants/messages";

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
    },
}));

const DeleteUser = ({id}) => {

    const router = useRouter();
    const classes = useStyles();
    const {data: user, error} = useSWR(`/users/${id}`, fetcher);

    const handleDelete = async () => {
        try {
            await User.delete(id);
            router.push(Routes.USERS);
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

    if(error) return <div>"No se pudo borrar el usuario..."</div>;
    if(!user) return <Loading/>;

    return (
        <div>
            <IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >
                <DeleteIcon />
            </IconButton>
        </div>
    );

};

export default DeleteUser;
