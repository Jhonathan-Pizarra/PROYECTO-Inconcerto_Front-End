import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Button, CardActions, Divider, Link, List, ListItem, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Routes from "@/constants/routes";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ReadTransport = () => {

    const {data: transports, error} = useSWR(`/transports/${''}`, fetcher);
    const classes = useStyles();

    if(error) return <p>No se pudieron cargar los tranpsortes...</p>;
    if (!transports) return <Loading/>;

    return (
        // Ver artists index si quieres hacer una tabla
        // Ver festivals index si quieres hacer cards
        // Ver essays index si quieres hacer lists
        // Ver resources index si quieres hacer en tabs
        <div>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                {transports.data.map(transport => {
                    return(
                        <div key={transport.id}>
                            <ListItem button divider>
                                <ListItemText primary={transport.type} />
                                <Link href={`${Routes.TRANSPORTS}/${transport.id}`}>
                                    <Button size="small" color="primary">
                                        Ver más
                                    </Button>
                                </Link>
                            </ListItem>
                        </div>
                    )
                })}
            </List>

        </div>
    )
}

export default ReadTransport;//Colocar WithAuth Al terminar