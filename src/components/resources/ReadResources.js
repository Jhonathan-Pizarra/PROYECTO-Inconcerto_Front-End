import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Grid, makeStyles, Paper, Tabs} from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UpdateResource from "@/components/resources/UpdateResource";
import DeleteResource from "@/components/resources/DeleteResource";
import CreateResource from "@/components/resources/CreateResource";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 300,
        //height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const ReadResources = () => {

    const classes = useStyles();
    const {data: resources, error} = useSWR(`/resources/${''}`, fetcher);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (error) return <p>Recarga la página para continuar...</p>;
    if (!resources) return <Loading/>;

    return (
        <div>
            <CreateResource/>
            <h1>Recursos/Necesidades InConcerto</h1>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {resources.data.map(resource => {
                        return (
                            <Tab key={resource.id} label={resource.name} {...a11yProps(resource.id)} />

                        );
                    })}
                </Tabs>
                {resources.data.map(resource => {
                    return (
                        <div>
                            <TabPanel key={resource.id} value={value} index={(resource.id)-1}>
                                <p>{resource.description}</p>
                                <br/>
                                <p>Cantidad: {resource.quantity === 0 ? "No aplica": resource.quantity}</p>
                                <br/>
                                <Grid container item xs>
                                    <span style={{paddingRight: 10}}><UpdateResource id={resource.id} /></span>
                                    <span style={{paddingLeft: 10}}><DeleteResource id={resource.id} /></span>
                                </Grid>
                            </TabPanel>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ReadResources;