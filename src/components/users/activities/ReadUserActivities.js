import useSWR from "swr";
import Loading from "@/components/Loading";
import {
    Avatar,
    Button, CardActions,
    Divider,
    Grid, IconButton,
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
import FindInPageIcon from "@material-ui/icons/FindInPage";
import DeleteActivity from "@/components/activities/DeleteActivity";
import {fetcher} from "../../../utils";
import CreateUserActivity from "@/components/users/activities/CreateUserActivity";
import UpdateUserActivity from "@/components/users/activities/UpdateUserActivity";
import UpdateActivity from "@/components/activities/UpdateActivity";
import DeleteUserActivity from "@/components/users/activities/DeleteUserActivity";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: 'flex',
        maxWidth: 400,
        width: '100%',
    },
    detail:{
        color: "#3f51b5",
    },
}));

const ReadUserActivity = ({id}) => {

    //arr = arr.filter(function(entry) { return entry.trim() != ''; });
    const classes = useStyles();
    const {data: activitiesUser, error} = useSWR(`/users/${id}/activityfestivals`, fetcher);

    if (error) return <p>Recarga la página para continuar...</p>;
    if (!activitiesUser) return <Loading/>;

    return (
        <div>
            <h1>Tareas Usuario</h1>

            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <CreateUserActivity/>
            </Grid>
            
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {/*justify='flex-start'*/}
                <Grid container className={classes.root} spacing={3} direction="column"  justifyContent="flex-start"  alignItems="stretch" component={Paper}>
                    {/*{activities.data ? <SnackSuccess/> : <Loading/>}*/}
                    {activitiesUser && activitiesUser.map(activity => {
                        return(
                            <div key={activity.id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FormatListNumberedRtlIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={activity.name} secondary={activity.date} />
                                    <Link href={`${Routes.ACTIVITIES}/${activity.id}`} passHref>
                                        <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                            <FindInPageIcon />
                                        </IconButton>
                                    </Link>
                                    <UpdateUserActivity idActivity={activity.id}/>
                                    {/*<UpdateActivity id={activity.id}/>*/}
                                    <DeleteUserActivity id={activity.id} idUser={id}/>
                                    {/*<Link href={`${Routes.ACTIVITIES}/${activity.id}`} passHref >
                                    <MuiLink>
                                        <Button size="small" color="primary">
                                            Ver Detalle
                                        </Button>
                                    </MuiLink>
                                </Link>*/}
                                </ListItem>
                                <Divider variant="inset" />
                            </div>
                        )
                    })}
                </Grid>
            </Grid>
{/*
            <CreateActivity/>
*/}
        </div>
    )
}

export default ReadUserActivity;