import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from "react-player";
import {Button, Card, CardActions, CardMedia, Link as MuiLink} from "@material-ui/core";
import Routes from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    adornated:{
        float: 'left',
        lineHeight: 0.7,
        fontSize: 55,
        color: '#333',
        border: 'solid #333',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        paddingLeft: 5,
        marginRight: 5,
        marginBottom: -5,
    },
    cover: {
        width: 151,
    },
}));
const About = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs >
                    <Paper className={classes.paper} >
                        <p>
                            <span className={classes.adornated}>I</span>nconcerto es un colectivo interdisciplinario de artistas, sociólogos, comunicadores y gestores culturales
                            que crean espacios y canales para difundir y revalorizar la música clásica en nuestra época y lugar
                            a través de proyectos que resignifican los protocolos que han situado a ésta,
                            como un arte de y para una determinada clase social e intelectual.

                            La larga trayectoria que ha tenido desde el año 2012 con actividades artísticas para los distintos públicos,
                            en particular con personas que no han tenido contacto con este tipo de arte,
                            han comprobado el potencial de la música de provocar, despertar y reactivar afectos y reacciones únicas en las audiencias.

                            Por este motivo y comprendiendo la importancia que la música clásica tiene en el desarrollo sensible de la sociedad
                            por sus características estéticas, poéticas &ensp; y filosóficas; InConcerto busca llegar a los grupos de personas
                            que por razones sociales, culturales, geográficas y etarias han sido históricamente excluidas
                            desde nuevas formas de acercamiento que potencien a la música clásica como una herramienta de inclusión social.
                            Razón por la cual, InConcerto ha realizado conciertos en distintos lugares tales como mercados, parques,
                            centros de rehabilitación, Instituto de Hansen, cárceles, casa de confianza, ancianatos, etc.
                        </p>
                        <p>
                            -InConcerto 2021-
                        </p>

                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <ReactPlayer
                            url='https://www.facebook.com/watch/?ref=search&v=1922342974729963&external_log_id=83637ffa-d87d-4515-8702-f2e5f9d7bf2c&q=musica%20ocupa%20vision%20360' playing />
                    </Paper>
                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={3}>
                <Grid  item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Paper className={classes.paper}>
                            <Image
                                src="/festivs.png"
                                alt="InConcerto"
                                width={1080}
                                height={1528}
                            />
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <p>
                            <strong>MúsicaOcupa</strong> es un festival de música clásica en espacios inusuales organizado por la <strong>Fundación InConcerto</strong> desde 2017. A través de un encuentro de instrumentistas provenientes de distintos países y bagajes culturales, expositores de diversas disciplinas, instituciones colaboradoras y públicos diversos, el festival saca la música clásica de sus espacios establecidos -salas de conciertos y teatros- para ocupar calles, espacios públicos, patrimoniales y comunitarios, de forma presencial y virtual.
                        </p>
                        <p>
                            <strong>MúsicaOcupa</strong> celebra su quinta edición del 3 al 24 de junio de 2021, con más de 15 actividades presenciales y en línea, abiertas a la comunidad: intervenciones musicales, conversatorios, charlas didácticas, recorridos musicales, convocatoria a compositores, InSitus virtuales y conciertos.
                            Para lograr sostener las acciones de acceso libre y llegar a todo tipo de públicos, se han creado canales de donaciones generales y aportes voluntarios individuales en cada evento del festival. Todas las actividades estarán alojadas en la plataforma Passline Ecuador, desde donde se recibirán las contribuciones.
                        </p>
                    </Paper>
                    <br/>
                    <Paper className={classes.paper}>
                        <Link href='https://www.passline.com/eventos/sumate-a-musicaocupa' passHref >
                            <MuiLink>
                                <Image
                                    src="/donaciones.png"
                                    alt="InConcerto"
                                    width={400}
                                    height={400}
                                />
                            </MuiLink>
                        </Link>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default About;