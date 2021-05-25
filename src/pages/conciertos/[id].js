import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateConcert from "@/components/concerts/UpdateConcert";
import React from "react";
import DeleteConcert from "@/components/concerts/DeleteConcert";
import {CardActions, CardMedia, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import Link from "next/link";
import { Link as MuiLink } from "@material-ui/core";

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

const ConciertosID = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: concert, error} = useSWR(`/concerts/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el concierto..."</div>;
    if(!concert) return <Loading/>;

    return (
        <div>
            <h1>Detalle Concierto</h1>
            <div>

                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <h2>{concert.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p>Fecha: {concert.dateConcert}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p>Hora: {concert.duration}</p>
                                    </Typography>

                                    <Grid container spacing={3}>

                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                Gratis: {((concert.free) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                InsiItu: {((concert.insitu) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <br/>

                                    <Typography variant="body2" gutterBottom>
                                        Festival:
                                        <Link href={concert.festival} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                    <Typography variant="body2" gutterBottom>
                                        Lugar:
                                        <Link href={concert.place} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                </Grid>

                                <Grid item>
                                    <CardActions>
                                        <MuiLink>
                                            <UpdateConcert/>
                                        </MuiLink>
                                        <MuiLink>
                                            <DeleteConcert/>
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

export default withAuth(ConciertosID);
