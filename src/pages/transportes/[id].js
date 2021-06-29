import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateTransport from "@/components/transports/UpdateTransport";
import DeleteTransport from "@/components/transports/DeleteTransport";
import {CardActions, Grid, Link as MuiLink, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
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
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
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
                                        <b>Calendario:</b>&ensp;
                                        <Link href={transport.calendar} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                    <Grid container spacing={3} >
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateTransport id={transport.id}/>
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <DeleteTransport id={transport.id}/>
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

export default withAuth(TransportesID);
