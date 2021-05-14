import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useState} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UpdateCalendar from "@/components/calendars/UpdateCalendar";
import DeleteCalendar from "@/components/calendars/DeleteCalendar";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
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
}));


const ReadCalendars = () => {

    const classes = useStyles();
    const {data: calendars, error} = useSWR(`/calendars/${''}`, fetcher);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if(error) return <p>No se pudieron cargar los calendarios...</p>;
    if (!calendars) return <Loading/>;

    return (
        <div>
            {calendars.data.map(calendar => {
                return(
                    <Accordion expanded={expanded === `${calendar.id}`}  key={calendar.id} onChange={handleChange(`${calendar.id}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>Nombre(De cada artista)</Typography>
                            <Typography className={classes.secondaryHeading}><b>Entrada:</b> {calendar.checkIn_Artist}&emsp;&emsp;&emsp;</Typography>
                            <UpdateCalendar id={calendar.id}/>
                            <DeleteCalendar id={calendar.id}/>
                            {/*<Typography className={classes.secondaryHeading}><b>- Salida:</b> {calendar.checkIn_Artist}</Typography>*/}
                        </AccordionSummary>
                        <AccordionDetails>
                            {/*<Typography className={classes.secondaryHeading}><b>Proviene: </b> {calendar.comingFrom}&emsp;&emsp;&emsp;&ensp;</Typography>*/}
                            {/*<Typography className={classes.tercearyHeading}><b>Número vuelo: </b>{calendar.flyNumber}&emsp;&emsp;&emsp;&ensp;</Typography>*/}
                            {/*<Typography className={classes.secondaryHeading}><b>Salida: </b> {calendar.checkIn_Artist}</Typography>*/}
                            <Typography className={classes.secondaryHeading}><b>Proviene de:&ensp;</b>{calendar.comingFrom}</Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography className={classes.tercearyHeading}><b>Número vuelo:&ensp;</b>{calendar.flyNumber}</Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography className={classes.secondaryHeading}><b>Salida:&ensp;</b>{calendar.checkOut_Artist}&emsp;&emsp;&emsp;</Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    )
}

export default ReadCalendars;