import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {CardActions, Grid, Link as MuiLink, makeStyles, Paper, Typography} from "@material-ui/core";
import Link from "next/link";
import UpdateActivity from "@/components/activities/UpdateActivity";
import DeleteActivity from "@/components/activities/DeleteActivity";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '30%',
    },
}));

const ActividadesID= () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: activity, error} = useSWR(`/activityfestivals/${id}`, fetcher);

    if(error) return <div>"No se obtuvo la actividad"</div>;
    if(!activity) return <Loading/>;

    return (
        <div>
            <h1>Detalle Actividad</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{activity.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha:</b> {activity.date}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Observación:</b> {activity.observation}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Descripción:</b> {activity.description}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Festival:</b>&ensp;
                                        <Link href={activity.festival} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                    <Typography variant="body2" gutterBottom>
                                        <b>Responsable:</b>&ensp;
                                        <Link href={activity.user} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <MuiLink>
                                                    <UpdateActivity id={activity.id}/>
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3}>
                                                <MuiLink>
                                                    <DeleteActivity id={activity.id}/>
                                                </MuiLink>
                                            </CardActions>
                                        </Grid>
                                    </Grid>

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );

};

export default withAuth(ActividadesID);
