import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {CardActions, Grid, Link as MuiLink, makeStyles, Paper, Typography} from "@material-ui/core";
import Link from "next/link";
import UpdateActivity from "@/components/activities/UpdateActivity";
import DeleteActivity from "@/components/activities/DeleteActivity";

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


    if(error) return <div>"No se obtuvo el festival"</div>;
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
                                    <Typography gutterBottom variant="subtitle1">
                                        <h2>{activity.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p>Fecha: {activity.date}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p>Observación: {activity.observation}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p>Descripción: {activity.description}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Festival:
                                        <Link href={activity.festival} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                    <Typography variant="body2" gutterBottom>
                                        Responsable:
                                        <Link href={activity.user} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                </Grid>

                                <Grid item>
                                    <CardActions>
                                        <MuiLink>
                                            <UpdateActivity id={activity.id}/>
                                        </MuiLink>
                                        <MuiLink>
                                            <DeleteActivity id={activity.id}/>
                                        </MuiLink>
                                    </CardActions>
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
