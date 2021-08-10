import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Grid, Link as MuiLink, makeStyles, Paper, Typography} from "@material-ui/core";
import Link from "next/link";
import NotFound from "../404";
import React from "react";
import ReadUserCalendars from "@/components/users/calendars/ReadUserCalendars";
import ReadUserFeedings from "@/components/users/feedings/ReadUserFeedings";
import ReadUserActivities from "@/components/users/activities/ReadUserActivities";
import ReadUserLodging from "@/components/users/lodgings/ReadUserLodging";

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

const UsuariosID = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: user, error} = useSWR(`/users/${id}`, fetcher);

    if(error) return <div><NotFound/></div>;
    if(!user) return <Loading/>;

    const d = new Date(user.created_at); ////Sun May 30 2021 00:18:00 GMT-0500 (hora de Ecuador)
    const year = d.getFullYear();
    const month = (d.getMonth()+1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    //var hours = ('0'+d.getHours()).substr(-2);
    //var min = d.getMinutes().toString().padStart(2, "0");
    const fulldate = year+'-'+month+'-'+day;

    return (
        <div>
            <h1>Detalle Usuario</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{user.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha Registro:</b>&ensp;{fulldate}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Email:</b>&ensp;{user.email}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Rol:</b>&ensp;{user.role === 'ROLE_ADMIN' ? 'Administrador':'Usuario'}</p>
                                    </Typography>

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
            <ReadUserCalendars id={user.id}/>
            <ReadUserFeedings id={user.id}/>
            <ReadUserActivities id={user.id}/>
            <ReadUserLodging id={user.id}/>
        </div>
    );

};

export default withAuth(UsuariosID);
