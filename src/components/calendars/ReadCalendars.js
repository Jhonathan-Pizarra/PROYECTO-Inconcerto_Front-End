import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UpdateCalendar from "@/components/calendars/UpdateCalendar";
import DeleteCalendar from "@/components/calendars/DeleteCalendar";
import SnackSuccess from "@/components/SnackSuccess";
import Link from "next/link";
import Routes from "@/constants/routes";
import IconButton from "@material-ui/core/IconButton";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import CreateCalendar from "@/components/calendars/CreateCalendar";

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
    tercearyHeading : {
        textAlign: "end",
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    detail:{
        color: "#3f51b5",
    },
}));


const ReadCalendars = () => {

    const classes = useStyles();
    const {data: calendars, error} = useSWR(`/calendars`, fetcher);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if(error) return <p>No se pudieron cargar los calendarios...</p>;
    if (!calendars) return <Loading/>;

    return (
        <div>
            <h1>Calendarios InConcerto</h1>
            <div>
                {calendars.data ? <SnackSuccess/> : <Loading/>}
                {calendars.data && calendars.data.map(calendar => {
                    return(
                        <Accordion expanded={expanded === `${calendar.id}`}  key={calendar.id} onChange={handleChange(`${calendar.id}`)}>
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
                                        <Link href={`${Routes.CALENDARS}/${calendar.id}`}>
                                            <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>
                                        </Link>
                                        <Typography className={classes.heading}>{calendar.artist.map(artist => artist.name+" | ")}</Typography>
                                    </Grid>
                                    <Grid container  item>
                                        <Typography className={classes.secondaryHeading}><b>Entrada:</b> {calendar.checkIn_Artist}&emsp;&emsp;&emsp;</Typography>
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
                                        <Typography className={classes.secondaryHeading}><b>Proviene de:&ensp;</b>{calendar.comingFrom}</Typography>
                                    </Grid>
                                    <Grid container  item xs={6} sm={3}>
                                        <Typography className={classes.secondaryHeading} ><b>Número vuelo:&ensp;</b>{calendar.flyNumber}</Typography>
                                    </Grid>
                                </Grid>


                                {/*<Typography className={classes.secondaryHeading}><b>Proviene: </b> {calendar.comingFrom}&emsp;&emsp;&emsp;&ensp;</Typography>*/}
                                {/*<Typography className={classes.tercearyHeading}><b>Número vuelo: </b>{calendar.flyNumber}&emsp;&emsp;&emsp;&ensp;</Typography>*/}
                                {/*<Typography className={classes.secondaryHeading}><b>Salida: </b> {calendar.checkIn_Artist}</Typography>*/}

                                {/*<Typography className={classes.secondaryHeading}><b>Proviene de:&ensp;</b>{calendar.comingFrom}</Typography>*/}
                                {/*<Grid*/}
                                {/*    container*/}
                                {/*    direction="row"*/}
                                {/*    justify="center"*/}
                                {/*    alignItems="center"*/}
                                {/*>*/}
                                {/*    <Typography className={classes.tercearyHeading}><b>Número vuelo:&ensp;</b>{calendar.flyNumber}</Typography>*/}
                                {/*</Grid>*/}

                            </AccordionDetails>
                            {/*<AccordionDetails>
                                <Typography className={classes.tercearyHeading}><b>Número vuelo:&ensp;</b>{calendar.flyNumber}</Typography>
                            </AccordionDetails>*/}
                            <AccordionDetails>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Grid container  item xs={5} sm={3}>
                                        <Typography className={classes.secondaryHeading}><b>Salida:&ensp;</b>{calendar.checkOut_Artist}&emsp;&emsp;&emsp;</Typography>
                                    </Grid>
                                    <Grid container item xs={7} sm={6}>
                                        <span><UpdateCalendar id={calendar.id}/></span>
                                        <span style={{marginLeft:  10}}><DeleteCalendar id={calendar.id}/></span>
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
            <CreateCalendar/>
        </div>
    )
}

export default ReadCalendars;