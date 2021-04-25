import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import Image from "next/image";
import {
    Box,
    Button,
    ButtonBase,
    Card,
    CardActions,
    CardMedia,
    Grid,
    Link,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import React from "react";
import Routes from "@/constants/routes";
import {Festival} from "@/lib/festivals";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '100%',
    },
}));

const FestivalID = () =>{
    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data, error, mutate} = useSWR(`/festivals/${id}`, fetcher);

    /*UPDATE*/
    const handleUpdate = async () => {
        try {
            await Festival.update(id, {
                ...data,
                name: "Name-Edit",
                description: "Desc-Edit",
            });
            mutate();
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    /*DELETE*/
    const handleDelete = async () => {
        try {
            await Festival.delete(id);
            router.push(Routes.FESTIVALS);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // enqueueSnackbar("No se pudo eliminar el festival", {
                //     variant: "error",
                //     anchorOrigin: {
                //         vertical: "top",
                //         horizontal: "center",
                //     },
                // });
                alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    if(error) return <div>"No se obtuvo el festival"</div>;
    if(!data) return <Loading/>;

    return (
        <div>
            <h1>Detalle Festival</h1>
            <div>

                {/*{data.image}
                Dimesnions: item xs={12} sm={6} md={4} lg={4} xl={4}
                */}

                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}  >
                            <CardMedia
                                display="flex"
                                component="img"
                                alt="Contemplative Reptile"
                                height="100%"
                                width= "100%"
                                image={`http://localhost:8000/storage/${data.image}`}
                                title={data.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <h2>{data.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p>Descripcion: {data.description}</p>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Conciertos:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <CardActions>
                                        <Link>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={handleUpdate}
                                            >
                                                EDITAR
                                            </Button>
                                        </Link>
                                        <Link>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={handleDelete}
                                            >
                                                ELIMINAR
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Grid>
                            </Grid>
                            {/*<Grid item>*/}
                            {/*    <Typography variant="subtitle1">$19.00</Typography>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                </Paper>

            </div>
        </div>
    );

};

export default withAuth(FestivalID);

