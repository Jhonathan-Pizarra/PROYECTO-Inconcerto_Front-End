import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {
    Avatar,
    Button, CardActions,
    Divider,
    Grid,
    Link as MuiLink,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Paper
} from "@material-ui/core";
import Link from "next/link";
import React from 'react';
import CreateActivity from "@/components/activities/CreateActivity";
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import Routes from "@/constants/routes";
import SnackSuccess from "@/components/SnackSuccess";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: 'flex',
        width: '100%',
    },
}));


const ReadActivity = () => {

    //arr = arr.filter(function(entry) { return entry.trim() != ''; });
    const classes = useStyles();
    const {data: activities, error} = useSWR(`/activityfestivals`, fetcher);

    if (error) return <p>Recarga la página para continuar...</p>;
    if (!activities) return <Loading/>;

    return (
        <div>
            <h1>Tareas InConcerto</h1>
            <div>
                <Grid container className={classes.root} spacing={3} direction='column' justify='flex-start' component={Paper}>
                    {activities.data ? <SnackSuccess/> : <Loading/>}
                    {activities.data && activities.data.map(activity => {
                        return(
                            <div key={activity.id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FormatListNumberedRtlIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={activity.name} secondary={activity.date} />
                                    <Link href={`${Routes.ACTIVITIES}/${activity.id}`} passHref >
                                        <MuiLink>
                                            <Button size="small" color="primary">
                                                Ver Detalle
                                            </Button>
                                        </MuiLink>
                                    </Link>
                                </ListItem>
                                <Divider variant="inset" />
                            </div>
                        )
                    })}
                </Grid>
            </div>
            <CreateActivity/>
        </div>
    )
}

export default ReadActivity;