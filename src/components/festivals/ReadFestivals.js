import Loading from "@/components/Loading";
import useSWR from "swr";
import {fetcher} from "../../utils";
import React from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Link,
    makeStyles,
    Typography
} from "@material-ui/core";
import Routes from "@/constants/routes";
import CreateFestival from "@/components/festivals/CreateFestival";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        flexDirection: 'unset',
        position: 'relative',
        top: -75,
        left: 20
    },
    content: {
        flex: '1 0 ',
    },
    cover: {
        width: 151,
    },
    cardDimension: {
        /*width: 240,
        height: 420*/
        width: 400,
        height: 300
    },
    title: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
    },
    body: {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 4,
        "-webkit-box-orient": "vertical",
    },
}));

const ReadFestivals = () => {

    const classes = useStyles();
    const {data: festivals, error} = useSWR(`/festivals/${''}`, fetcher);

    if(error) return <p>No se pudieron cargar los festivales...</p>;
    if(!festivals) return <Loading/>

    return (
        <div>
            {/*<BackToTop/>*/}
            <CreateFestival/>
            <Grid container className={classes.root} spacing={3} direction='row' justify='flex-start'>
                {festivals.data.map(festival => {
                    return(
                        <Grid container item xs={12} sm={6} md={4} lg={3} xl={3} key={festival.id}>
                            <Card className={classes.root}>
                                <Box m={2} className={classes.cardDimension}>
                                    <div>
                                        <CardContent className={classes.content}>
                                            <Typography component="h5" variant="h5"  className={classes.title}>
                                                {festival.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary"  className={classes.body}>
                                                <p>{festival.description}</p>
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </Box>

                                <CardMedia
                                    className={classes.cover}
                                    image={`http://localhost:8000/storage/${festival.image}`}
                                    title={festival.name}
                                />

                            </Card>

                            <div className={classes.details}>
                                <Grid container>
                                    <CardActions >
                                        <Link href={`${Routes.FESTIVALS}/${festival.id}`}>
                                            <Button size="small" color="primary">
                                                Ver más
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Grid>
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export default ReadFestivals ;
