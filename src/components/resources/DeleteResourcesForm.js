import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Resource, Resources} from "@/lib/resources";
import Routes from "@/constants/routes";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button, makeStyles} from "@material-ui/core";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
    },
}));

const DeleteResourceForm = ({id}) => {
    const router = useRouter();
    const classes = useStyles();
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
            {/*<IconButton aria-label="eliminar"  className={classes.delete} size="small" onClick={handleDelete} >*/}
            {/*    <DeleteIcon />*/}
            {/*</IconButton>*/}
        </div>
    );

};

export default DeleteResourceForm;
