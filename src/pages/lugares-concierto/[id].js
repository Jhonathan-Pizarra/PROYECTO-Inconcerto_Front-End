import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateConcertPlace from "@/components/concert-places/UpdateConcertPlace";
import DeleteConcertPlace from "@/components/concert-places/DeleteConcertPlace";
import {CardActions, Grid, Link as MuiLink, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import NotFound from "../404";
import ReadConcertPlaceConcerts from "@/components/concert-places/concerts/ReadConcertPlaceConcerts";

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

const PlaceConcertsID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: place, error} = useSWR(`/places/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!place) return <Loading/>;

    return (
        <div>
            <h1>Detalle Lugar Concierto</h1>
            <div>
                {/*<h2>Places ID: {place.id}</h2>*/}
                {/*<p>Nombre: {place.name}</p>*/}
                {/*<p>Dirección: {place.address}</p>*/}
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{place.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Dirección:</b> {place.address}</p>
                                    </Typography>
                                    <Grid container spacing={3}  justify="center" alignItems="center">

                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Permiso:</b> {((place.permit) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Aforo:</b> {place.aforo}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Descripción:</b> {place.description}</p>
                                    </Typography>


                                    <Grid container spacing={3}>
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateConcertPlace id={place.id}/>
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <DeleteConcertPlace id={place.id}/>
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
            <ReadConcertPlaceConcerts id={place.id}/>
            {/*  <ReadResourceConcerts id={resource.id}/>*/}
        </div>
    );

};

export default withAuth(PlaceConcertsID);
