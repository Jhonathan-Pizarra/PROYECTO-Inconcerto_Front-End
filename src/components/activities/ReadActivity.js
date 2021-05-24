import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {
    Avatar,
    Button,
    Divider,
    Grid,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles, Paper,
    Tabs
} from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UpdateActivity from "@/components/activities/UpdateActivity";
import DeleteActivity from "@/components/activities/DeleteActivity";
import CreateActivity from "@/components/activities/CreateActivity";
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import Routes from "@/constants/routes";

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
    const {data: activities, error} = useSWR(`/activityfestivals/${''}`, fetcher);

    if (error) return <p>Recarga la página para continuar...</p>;
    if (!activities) return <Loading/>;

    return (
        <div>
            <h1>Tareas InConcerto</h1>

            <div >
                <Grid container className={classes.root} spacing={3} direction='column' justify='flex-start' component={Paper}>
                    {activities.data.map(activity => {
                        return(
                            <div key={activity.id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FormatListNumberedRtlIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={activity.name} secondary={activity.date} />
                                    <Link href={`${Routes.ACTIVITIES}/${activity.id}`}>
                                        <Button size="small" color="primary">
                                            Ver Detalle
                                        </Button>
                                    </Link>
                                </ListItem>
                                <Divider variant="inset" />
                            </div>
                        )
                    })}
                </Grid>
                <CreateActivity/>
            </div>
        </div>
    )
}

export default ReadActivity;