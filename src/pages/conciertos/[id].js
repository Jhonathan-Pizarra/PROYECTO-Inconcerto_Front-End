import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateConcert from "@/components/concerts/UpdateConcert";
import React from "react";
import DeleteConcert from "@/components/concerts/DeleteConcert";
import {CardActions, Grid, Link as MuiLink, makeStyles, Paper, Typography} from "@material-ui/core";
import Link from "next/link";
import ReadCalendarArtists from "@/components/calendars/artists/ReadCalendarArtists";
import CreateCalendarArtist from "@/components/calendars/artists/CreateCalendarArtist";
import ReadConcertArtists from "@/components/concerts/artists/ReadConcertArtists";
import CreateConcertArtist from "@/components/concerts/artists/CreateConcertArtist";
import ReadConcertResources from "@/components/concerts/resources/ReadConcertResources";
import CreateConcertResource from "@/components/concerts/resources/CreateConcertResource";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '30%',
    },
    items: {
        textAlign: "center",
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
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{concert.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha:</b>&ensp;{concert.dateConcert}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Hora:</b>&ensp;{concert.duration}</p>
                                    </Typography>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Gratis:</b> {((concert.free) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>InsiItu:</b> {((concert.insitu) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <br/>

                                    <Typography variant="body2" gutterBottom>
                                        <b>Festival:</b>&ensp;
                                        <Link href={concert.festival} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                    <Typography variant="body2" gutterBottom>
                                        <b>Lugar:</b>&ensp;
                                        <Link href={concert.place} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateConcert id={concert.id}/>
                                                </MuiLink>
                                                {/*<MuiLink>
                                                    <DeleteConcert/>
                                                </MuiLink>*/}
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                {/*  <MuiLink>
                                                    <UpdateConcert/>
                                                </MuiLink>*/}
                                                <MuiLink>
                                                    <DeleteConcert id={concert.id}/>
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
            <br/>
            <br/>
            <ReadConcertArtists id={concert.id}/>
            <CreateConcertArtist id={concert.id}/>
            <ReadConcertResources id={concert.id}/>
            <CreateConcertResource id={concert.id}/>
        </div>
    );

};

export default withAuth(ConciertosID);
