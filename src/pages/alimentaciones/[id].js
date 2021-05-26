import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateFeeding from "@/components/feedings/UpdateFeeding";
import {CardActions, Grid, Link as MuiLink, makeStyles, Paper, Typography} from "@material-ui/core";
import Link from "next/link";
import DeleteFeeding from "@/components/feedings/DeleteFeeding";

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

const AlimentacionID= () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: feeding, error} = useSWR(`/feedings/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el cuadro alimenticio"</div>;
    if(!feeding) return <Loading/>;

    return (
        <div>
            <h1>Detalle Cuadro Alimentación</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{feeding.food}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha:</b>&ensp;{feeding.date}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Observación:</b>&ensp;{feeding.observation}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Cantidad:</b>&ensp;{feeding.quantityLunchs}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Responsable:</b>&ensp;
                                        <Link href={feeding.user} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Comensal:</b>&ensp;
                                        <Link href={feeding.artist} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Lugar:</b>&ensp;
                                        <Link href={feeding.place} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>
                                </Grid>

                                {/*<Grid item>
                                    <CardActions>
                                        <MuiLink>
                                            <UpdateFeeding id={feeding.id}/>
                                        </MuiLink>
                                        <MuiLink>
                                            <DeleteFeeding id={feeding.id}/>
                                        </MuiLink>
                                    </CardActions>
                                </Grid>*/}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );

};

export default withAuth(AlimentacionID);
