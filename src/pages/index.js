import styles from '@/styles/Home.module.css';
import BackToTop from "@/components/BackToTop";
import ReactPlayer from 'react-player'
import React from "react";
import {Link as MuiLink, makeStyles, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
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
    paper2: {
        //padding: theme.spacing(0),
        textAlign: 'center',
        //color: theme.palette.text.secondary,
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
    container2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));


export default function Home() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container2}>
                <p className={styles.title}>♪♬♩🎵InConcerto ♪🎶♫...</p>
                <i>"Música Clásica en Espacios InUsuales ..."</i>
            </div>

            <BackToTop/>

            <Grid container spacing={3}>
                <Grid item xs >

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


                </Grid>
                <Grid item xs>
                        <ReactPlayer url='https://www.youtube.com/watch?v=2gO1v2GPMFk' />
                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={3}>
                <Grid  item xs={12} sm={12} md={6} lg={6} xl={6}>

                        <Image
                            src="/logo1-inconcerto.png"
                            alt="InConcerto"
                            width={500}
                            height={400}
                        />

                </Grid>
                <Grid item xs>

                        <p>
                            El presente sistema web apoyará a la difusión de la música clásica, permitiendo coordinar diferentes áreas importantes para la gestión de eventos organizados por Inconcerto
                            A su vez, pretende:
                            <ul>
                                <li>
                                    <strong>Gestión de artistas invitados:</strong> Los artistas son nacionales e internacionales por lo que se lleva el control de compras de pasajes, tiempos de llegada y salida, observaciones de alimentación especiales, transporte, etc.
                                </li>
                                <li>
                                    <strong>Gestión de hospedajes:</strong> Se coordina donde se hospedan los artistas invitados teniendo en cuenta los horarios de entrada y salida de los artistas con el fin de optimizar los gastos.
                                </li>
                                <li>
                                    <strong>Gestión de auspicios:</strong> La fundación cuenta con varios auspicios, entre los cuales están hostales y hoteles, alimentación, transporte, lugares para conciertos y auspicios directamente económicos para cubrir los gastos de los eventos.
                                </li>
                                <li>
                                    <strong>Gestión de espacios para conciertos:</strong> La fundación está constantemente en búsqueda de espacios poco usuales para ofrecer conciertos. Se lleva un control de estos espacios para facilitar la organización de cada evento.
                                </li>
                                <li>
                                    <strong>Adicionalmente</strong>, la fundación cuenta con una <strong>página web</strong> con medios adecuados para la difusión de sus actividades para las personas interesadas en sus eventos.
                                </li>
                            </ul>

{/*
                            <strong>MúsicaOcupa</strong> es un festival de música clásica en espacios inusuales organizado por la <strong>Fundación InConcerto</strong> desde 2017. A través de un encuentro de instrumentistas provenientes de distintos países y bagajes culturales, expositores de diversas disciplinas, instituciones colaboradoras y públicos diversos, el festival saca la música clásica de sus espacios establecidos -salas de conciertos y teatros- para ocupar calles, espacios públicos, patrimoniales y comunitarios, de forma presencial y virtual.
*/}
                        </p>

                    <br/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs>

                    <p>
                        Colectivo de músicos, comunicadores, gestores y analistas culturales que construye diferentes espacios y canales para popularizar y resignificar la música clásica en nuestra época a través de proyectos que faciliten el acceso a la apreciación e interpretación musical, generando una relación activa, integral y humana entre músicos y espectadores. Una de las principales actividades que InConcerto desarrolla desde 2017 es el Festival Música Ocupa.
                    </p>
                    <p>
                        El ensamble colabora habitualmente con artistas nacionales e internacionales como David Ballesteros (Orquesta Sinfónica de Londres), Sarah Willis (Orquesta Filarmónica de Berlín), Bruno Lourensetto (Orquesta Sinfónica del Estado de São Paulo), Emmanuel Siffert (Orquesta Sinfónica de San Juan, Argentina) y Camila Barrientos (Orquesta Sinfónica Municipal de São Paulo).

                    </p>


                    <br/>
                    {/*<Paper className={classes.paper}>
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
                    </Paper>*/}
                </Grid>
                <Grid  item xs={12} sm={12} md={6} lg={6} xl={6}>

                    <Image
                        src="/creadores.jpg"
                        alt="InConcerto"
                        width={700}
                        height={500}
                    />

                </Grid>
            </Grid>
            <br/>
            <br/>
            <Paper className={classes.paper2}>
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
        </div>
    );
}
