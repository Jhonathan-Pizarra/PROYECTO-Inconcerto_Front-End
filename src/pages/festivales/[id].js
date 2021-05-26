import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {CardActions, CardMedia, Grid, Link, makeStyles, Paper, Typography} from "@material-ui/core";
import React from "react";
import UpdateFestival from "@/components/festivals/UpdateFestival";
import DeleteFestival from "@/components/festivals/DeleteFestival";
import {Breadcrumbs} from "@/components/Breadcrumbs";


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
    const {data: festival, error, mutate} = useSWR(`/festivals/${id}`, fetcher);


    if(error) return <div>"No se obtuvo el festival"</div>;
    if(!festival) return <Loading/>;

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
                                image={`http://localhost:8000/storage/${festival.image}`}
                                title={festival.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <h2>{festival.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p>Descripcion: {festival.description}</p>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Conciertos: ...(Pendiente)                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <CardActions>
                                        <Link>
                                            <UpdateFestival/>
                                        </Link>
                                        <Link>
                                            <DeleteFestival/>
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

