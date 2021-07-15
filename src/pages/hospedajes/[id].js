import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ReadConcertArtists from "@/components/concerts/artists/ReadConcertArtists";
import CreateConcertArtist from "@/components/concerts/artists/CreateConcertArtist";
import React from "react";
import ReadLodgingArtists from "@/components/lodgings/artists/ReadLodgingArtists";
import CreateLodgingArtist from "@/components/lodgings/artists/CreateLodgingArtist";

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


const HospedajesID= () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: lodging, error, mutate} = useSWR(`/lodgings/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el hospedaje"</div>;
    if(!lodging) return <Loading/>;

    return (
        <div>
            <h1>Detalle Hospedaje</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{lodging.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Dirección:</b> {lodging.type}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Descripción:</b> {lodging.description}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Observación:</b> {lodging.observation}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha Registro:</b> {lodging.checkIn}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha de salida:</b> {lodging.checkOut}</p>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Paper>
            </div>
            <br/>
            <br/>
            <ReadLodgingArtists id={lodging.id}/>
            <CreateLodgingArtist id={lodging.id}/>
        </div>
    );

};

export default withAuth(HospedajesID);
