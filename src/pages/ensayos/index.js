import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {
    Avatar,
    Button,
    Divider,
    Fab, Grid,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip
} from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import CreateEssayForm from "@/components/essays/EssayCreateForm";
import BackToTop from "@/components/BackToTop";
import Routes from "@/constants/routes";
import React from "react";
import EssayCreateForm from "@/components/essays/EssayCreateForm";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    fixed: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

const Ensayos = () => {
    const classes = useStyles();
    const {data: essays, error} = useSWR(`/essays/${''}`, fetcher);

    if(error) return <p>No se pudieron cargar los ensayos...</p>;
    if (!essays) return <Loading/>;

    return (
        <div>
            <Grid container className={classes.root} spacing={3} direction='column' justify='flex-start'>
                {essays.data.map(essay => {
                    return(
                        <div key={essay.id}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BusinessCenterRoundedIcon />
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
            <span className={classes.fixed}> <EssayCreateForm/> </span>
        </div>
    )
}

export default withAuth(Ensayos);
