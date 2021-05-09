import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import FestivalCreateForm from "@/components/festivals/FestivalCreateForm";
import BackToTop from "@/components/BackToTop";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Link, Typography} from "@material-ui/core";
import Routes from "@/constants/routes";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import UpdateConcertPlace from "@/components/concert-places/UpdateConcertPlace";
import DeleteConcertPlace from "@/components/concert-places/DeleteConcertPlace";


const useStyles = makeStyles({
    root: {
        //display: 'flex',
        minWidth: 275,
    },
    title: {
        //fontSize: 14,
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    direction: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2 ,
        "-webkit-box-orient": "vertical",
    },
    body: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
    },
    details: {
        flexDirection: 'unset',
        position: 'relative',
        top: -75,
        left: 20
    },
    cardDimension: {
        width: 240,
        height: 420
    },
    grow: {
        flexGrow: 1,
    },
    content: {
        flex: '1 0 ',
    },
});

const EnsayosReadForm = () => {

    const {data: places, error} = useSWR(`/places/${''}`, fetcher);
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    if(error) return <p>No se pudieron cargar los lugares...</p>;
    if (!places) return <Loading/>;

    return (
        <div>
            {/*<BackToTop/>*/}
            <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                {places.data.map(place => {
                    return(
                        <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} key={place.id}>
                            <Card className={classes.root}>
                                <Box m={2} className={classes.cardDimension}>
                                    <div>
                                        <CardContent className={classes.content}>
                                            <Typography component="h5" variant="h5"  className={classes.title}>
                                                {place.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.direction}>
                                                <p><b>Dirección:</b> {place.address}</p>
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.body}>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="flex-end"
                                                    alignItems="center"
                                                >
                                                    <b>Permiso:</b>{place.permit ? "Si" : "No" }
                                                </Grid>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="flex-end"
                                                    alignItems="center"
                                                >
                                                    <b>Aforo:</b>{place.aforo}
                                                </Grid>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="flex-end"
                                                    alignItems="center"
                                                >
                                                    <Link href={`${Routes.PLACES}/${place.id}`} style={{textAlign: "center"}}>
                                                        <Button size="small" color="primary">
                                                            Ver más
                                                        </Button>
                                                    </Link>
                                                </Grid>
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.body}>
                                                <p><b>Descripción: </b>{place.description}</p>
                                            </Typography>
                                            {/*<Grid*/}
                                            {/*    container*/}
                                            {/*    direction="row"*/}
                                            {/*    justify="flex-end"*/}
                                            {/*    alignItems="center"*/}
                                            {/*>*/}
                                            {/*    <Link href={`${Routes.PLACES}/${place.id}`} style={{textAlign: "center"}}>*/}
                                            {/*        <Button size="small" color="primary">*/}
                                            {/*            Ver más*/}
                                            {/*        </Button>*/}
                                            {/*    </Link>*/}
                                            {/*</Grid>*/}
                                            <br/>
                                        </CardContent>
                                    </div>
                                </Box>
                            </Card>
                            <div className={classes.details}>
                                <Grid container>
                                    <CardActions >

                                        <UpdateConcertPlace id={place.id}/>

                                        <DeleteConcertPlace id={place.id}/>

                                        {/*<Link href={`${Routes.PLACES}/${place.id}`}>*/}
                                        {/*    <Button size="small" color="primary">*/}
                                        {/*        Eliminar*/}
                                        {/*    </Button>*/}
                                        {/*</Link>*/}
                                    </CardActions>
                                </Grid>
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default EnsayosReadForm; //Colocar WithAuth Al terminar