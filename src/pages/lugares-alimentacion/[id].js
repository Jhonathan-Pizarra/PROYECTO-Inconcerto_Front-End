import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
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
    items: {
        textAlign: "center",
    },
}));

const FeedingPlaceID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: fplace, error} = useSWR(`/feeding_places/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el festival"</div>;
    if(!fplace) return <Loading/>;

    return (
        <div>
            <h1>Detalle Lugar Alimentación</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{fplace.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Dirección:</b>&ensp;{fplace.address}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Aforo:</b>&ensp;{fplace.aforo}</p>
                                    </Typography>
                                    <Grid container spacing={3} justify="center" alignItems="center">
                                        <Grid item>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Permiso:</b> {((fplace.permit) === 0) ? "No" : "Si"}
                                            </Typography>
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

export default withAuth(FeedingPlaceID);
