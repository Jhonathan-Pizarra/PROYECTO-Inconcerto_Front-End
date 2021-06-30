import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {CardActions, Grid, Link as MuiLink, makeStyles, Paper, Typography} from "@material-ui/core";
import Link from "next/link";
import UpdateEssay from "@/components/essays/UpdateEssay";
import React from "react";
import DeleteEssay from "@/components/essays/DeleteEssay";

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

const EnsayosID = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: essay, error} = useSWR(`/essays/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el ensayo..."</div>;
    if(!essay) return <Loading/>;

    return (
        <div>
            <h1>Detalle Ensayo</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{essay.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha:</b> {essay.dateEssay}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Lugar:</b> {essay.place}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Festival:</b>&nbsp;
                                        <Link href={essay.festival} passHref>
                                            <MuiLink>
                                                Ver
                                            </MuiLink>
                                        </Link>
                                    </Typography>

                                    <Grid container spacing={3}>

                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateEssay/>
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <DeleteEssay/>
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

export default withAuth(EnsayosID);