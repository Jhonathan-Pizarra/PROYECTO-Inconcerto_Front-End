import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {makeStyles, Tabs} from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UpdateResourcesForm from "@/components/resources/UpdateResourcesForm";
import DeleteResourceForm from "@/components/resources/DeleteResourcesForm";
import UpdateActivity from "@/components/activities/UpdateActivity";
import DeleteActivity from "@/components/activities/DeleteActivity";

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

const ReadActivity = () => {

    const {data: activities, error} = useSWR(`/activityfestivals/${''}`, fetcher);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (error) return <p>Recarga la página para continuar...</p>;
    if (!activities) return <Loading/>;

    return (
        <div>
            <h1>Tareas InConcerto</h1>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {activities.data.map(activity => {
                        return (
                            <Tab key={activity.id} label={activity.name} {...a11yProps(activity.id)} />

                        )
                    })}
                </Tabs>
                {activities.data.map(activity => {
                    return (
                        <div>
                            <TabPanel key={activity.id} value={value} index={(activity.id)-1}>
                                <p>Fecha: {activity.date}</p>
                                <br/>
                                <p>Descripcion: {activity.description}</p>
                                <p>Observación: {activity.observation}</p>
                                <p>Festival: {activity.festival}</p>
                                <p>Usuario: {activity.user}</p>
                                <UpdateActivity id={activity.id}/>
                                <DeleteActivity id={activity.id}/>
                                {/*<UpdateResourcesForm id={resource.id} />*/}
                                {/*<DeleteResourceForm id={resource.id} />*/}
                            </TabPanel>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default ReadActivity;