import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Button, Grid, Link, List, ListItem, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Routes from "@/constants/routes";
import React from "react";
import CreateTransport from "@/components/transports/CreateTransport";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ReadTransport = () => {

    const classes = useStyles();
    const {data: transports, error} = useSWR(`/transports/${''}`, fetcher);

    if(error) return <p>No se pudieron cargar los tranpsortes...</p>;
    if (!transports) return <Loading/>;

    return (

        <div>
            <h1>Transportes para IncConcerto</h1>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    {transports.data.map(transport => {
                        return(
                            <div key={transport.id}>
                                <ListItem button divider>
                                    <ListItemText primary={transport.type} />
                                    <Link href={`${Routes.TRANSPORTS}/${transport.id}`}>
                                        <Button size="small" color="primary">
                                            Detalle
                                        </Button>
                                    </Link>
                                </ListItem>
                            </div>
                        );
                    })}
                </List>

            </Grid>
            <CreateTransport/>
        </div>
    )
}

export default ReadTransport;