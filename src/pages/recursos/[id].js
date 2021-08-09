import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateTransport from "@/components/transports/UpdateTransport";
import DeleteTransport from "@/components/transports/DeleteTransport";
import {CardActions, Grid, IconButton, Link as MuiLink, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import NotFound from "../404";
import UpdateResource from "@/components/resources/UpdateResource";
import DeleteResource from "@/components/resources/DeleteResource";
import ReadResourceConcerts from "@/components/resources/concerts/ReadResourceConcerts";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '30%',
    },
    detail:{
        color: "#3f51b5",
    },
}));

const ResourcesID = () =>{

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: resource, error} = useSWR(`/resources/${id}`, fetcher);

    // if(error) return <div>"Recarga para continuar..."</div>;
    if(error) return <div><NotFound/></div>;
    if(!resource) return <Loading/>;

    return (
        <div>
            <h1>Detalle Recurso</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{resource.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Cantidad:</b> {resource.quantity}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Descripción:</b> {resource.description}</p>
                                    </Typography>


                                    <Grid container spacing={3} >
                                        <Grid item container justify="center" alignItems="center">
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <UpdateResource id={resource.id}/>
                                                    {/*<UpdateTransport id={transport.id}/>*/}
                                                </MuiLink>
                                            </CardActions>
                                            <CardActions xs={12} sm={4} md={4} lg={3} xl={3} >
                                                <MuiLink>
                                                    <DeleteResource id={resource.id}/>
                                                    {/*<DeleteTransport id={transport.id}/>*/}
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
            <ReadResourceConcerts id={resource.id}/>
        </div>
    );

};

export default withAuth(ResourcesID);
