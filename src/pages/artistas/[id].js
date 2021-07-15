import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import ReadArtistFeedings from "@/components/artists/feedings/ReadArtistFeedings";

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

const ArtistasID= () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: artist, error} = useSWR(`/artists/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el Artista"</div>;
    if(!artist) return <Loading/>;

    return (
        <div>
            <h1>Detalle Artista</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{artist.name} {artist.lastName}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Cédula o Pasaporte:</b> {artist.ciOrPassport}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Nacionalidad:</b> {artist.nationality}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Email:</b> {artist.mail}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Teléfono:</b> {artist.phone}</p>
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Pasaporte:</b> {((artist.passage) === 0) ? "No" : "Si"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Nombre artístico:</b> {artist.artisticOrGroupName}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Instrumentos:</b> {artist.instruments}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Teléfono de emergencia:</b> {artist.emergencyPhone}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Mail de emergencia:</b> {artist.emergencyMail}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Grupo alimenticio:</b> {artist.foodGroup}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Observación:</b> {artist.observation}</p>
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Paper>

                <br/>
                <br/>
                <ReadArtistFeedings id={artist.id}/>
            </div>
        </div>
    );

};

export default withAuth(ArtistasID);
