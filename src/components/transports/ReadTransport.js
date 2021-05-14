import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Button, Link, List, ListItem, ListItemText} from "@material-ui/core";
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

    const classes = useStyles();
    const {data: transports, error} = useSWR(`/transports/${''}`, fetcher);

    if(error) return <p>No se pudieron cargar los tranpsortes...</p>;
    if (!transports) return <Loading/>;

    return (

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
                    );
                })}
            </List>

        </div>
    )
}

export default ReadTransport;