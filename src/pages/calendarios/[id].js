import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {CardActions, Grid, Link as MuiLink, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import UpdateTransport from "@/components/transports/UpdateTransport";
import DeleteTransport from "@/components/transports/DeleteTransport";
import React from "react";
import DeleteCalendar from "@/components/calendars/DeleteCalendar";
import UpdateCalendar from "@/components/calendars/UpdateCalendar";
import ReadCalendarArtists from "@/components/calendars/artists/ReadCalendarArtists";
import CreateCalendarArtist from "@/components/calendars/artists/CreateCalendarArtist";
import ReadCalendarUsers from "@/components/calendars/users/ReadCalendarUsers";
import CreateCalendarUser from "@/components/calendars/users/CreateCalendarUser";

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


const CalendariosID= () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: calendar, error} = useSWR(`/calendars/${id}`, fetcher);


    if(error) return <div>"No se obtuvo el calendario"</div>;
    if(!calendar) return <Loading/>;

    return (
        <div>
            <h1>Detalle Calendario</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>Fecha de entrada:&ensp;{calendar.checkIn_Artist}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha de salida:&ensp;</b> {calendar.checkOut_Artist}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>País del que viene:&ensp;</b> {calendar.comingFrom}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Número de vuelo:&ensp;</b> {calendar.flyNumber}</p>
                                    </Typography>
                                    {/*<Typography variant="body2" gutterBottom>*/}
                                    {/*    <p><b>Artista(s) al que pertenece:&ensp;</b>{calendar.artist.map(artist => artist.name+" | ")}</p>*/}
                                    {/*</Typography>*/}

                                    <Grid container spacing={3} >
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateCalendar id={calendar.id}/>
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <DeleteCalendar id={calendar.id}/>
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
            <ReadCalendarArtists id={calendar.id}/>
            <CreateCalendarArtist id={calendar.id}/>
            <ReadCalendarUsers id={calendar.id}/>
            <CreateCalendarUser id={calendar.id}/>

        </div>
    );

};

export default withAuth(CalendariosID);
