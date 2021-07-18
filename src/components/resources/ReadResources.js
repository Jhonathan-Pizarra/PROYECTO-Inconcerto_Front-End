import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UpdateResource from "@/components/resources/UpdateResource";
import DeleteResource from "@/components/resources/DeleteResource";
import CreateResource from "@/components/resources/CreateResource";
import SnackSuccess from "@/components/SnackSuccess";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        //flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


const ReadResources = () => {

    const classes = useStyles();
    const {data: resources, error} = useSWR(`/resources`, fetcher);
    const [expanded, setExpanded] = useState(false);

    if(error) return <p>No se pudieron cargar los recursos...</p>;
    if (!resources) return <Loading/>;

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    return (
        <div>
            <h1>Recursos InConcerto</h1>
            <div>
                {resources.data ? <SnackSuccess/> : <Loading/>}
                {resources.data && resources.data.map(resource => {
                    return(
                        <Accordion expanded={expanded === `${resource.id}`}  key={resource.id} onChange={handleChange(`${resource.id}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Grid container  item >
                                        <Typography className={classes.heading}>{resource.name}</Typography>
                                    </Grid>
                                    <Grid container  item>
                                        <Typography className={classes.secondaryHeading}><b>Cantidad:</b> {((resource.quantity) === 0) ? "No Aplica" : resource.quantity }&emsp;&emsp;&emsp;</Typography>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Grid container  item xs={6} sm={3}>
                                        <Typography className={classes.secondaryHeading}><b>Descripción:&ensp;</b>{resource.description}</Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>

                            <AccordionDetails>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Grid container item xs={7} sm={6}>
                                        <span><UpdateResource id={resource.id}/></span>
                                        <span style={{marginLeft:  10}}><DeleteResource id={resource.id}/></span>
                                    </Grid>

                                </Grid>
                                {/*<Typography className={classes.secondaryHeading}><b>Salida:&ensp;</b>{calendar.checkOut_Artist}&emsp;&emsp;&emsp;</Typography>*/}
                                {/*<span style={{marginLeft: 150}}><UpdateCalendar id={calendar.id}/></span>*/}
                                {/*<span style={{marginLeft:  5}}><DeleteCalendar id={calendar.id}/></span>*/}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </div>
            <CreateResource/>
        </div>

    )
}

export default ReadResources;