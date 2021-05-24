import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateTransport from "@/components/transports/UpdateTransport";
import DeleteTransport from "@/components/transports/DeleteTransport";
import {Grid, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {CardActions, Link as MuiLink, makeStyles} from "@material-ui/core";
import Link from "next/link";

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

const TransportesID= () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: transport, error} = useSWR(`/transports/${id}`, fetcher);

    if(error) return <div>"Recarga para continuar..."</div>;
    if(!transport) return <Loading/>;

    return (
        <div>
            <h1>Detalle Transporte</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <h2>{transport.type}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Capacidad de pasajeros:</b> {transport.capacity}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Capacidad para instrumentos:</b> {transport.instruments_capacity} Kg</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Disponibilidad:</b> {((transport.disponibility) === 0) ? "No" : "Si" }</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Matrícula:</b> {transport.licence_plate}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Calendario:
                                        <Link href={transport.calendar} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                </Grid>

                                <Grid item>
                                    <CardActions>
                                        <MuiLink>
                                            <UpdateTransport id={transport.id}/>
                                        </MuiLink>
                                        <MuiLink>
                                            <DeleteTransport id={transport.id}/>
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

export default withAuth(TransportesID);
