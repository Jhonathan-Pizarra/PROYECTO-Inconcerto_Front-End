import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Button, Divider, Grid, Link, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Routes from "@/constants/routes";
import CreateEssay from "@/components/essays/CreateEssay";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

const ReadEssays = () => {

    const classes = useStyles();
    const {data: essays, error} = useSWR(`/essays/${''}`, fetcher);

    if(error) return <p>No se pudieron cargar los ensayos...</p>;
    if (!essays) return <Loading/>;

    return (
        <div>
            <Grid container className={classes.root} spacing={3} direction='column' justify='flex-start' component={Paper}>
                {essays.data.map(essay => {
                    return(
                        <div key={essay.id}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EmojiObjectsIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={essay.name} secondary={essay.dateEssay} />
                                <Link href={`${Routes.ESSAYS}/${essay.id}`}>
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
            <CreateEssay/>
        </div>
    );
}

export default ReadEssays;