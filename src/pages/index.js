import styles from '@/styles/Home.module.css';
import BackToTop from "@/components/BackToTop";
import ReactPlayer from 'react-player'
import React from "react";

export default function Home() {
  return(
      <div className={styles.container}>
        <p className={styles.title}>¡Bienvenido...!</p>

          <BackToTop/>
          <style jsx>
              {`
                span {
                  float: left;
                  line-height: 35px;
                  font-size: 55px;
                  color: #333;
                  border: solid #333;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  padding-right: 5px;
                  padding-left: 5px;
                  margin-right: 5px;
                  margin-bottom: -5px;
                }
              `}

          </style>


          <i>"And in the end, the love you take, is equal to the love you give..."</i>


          <p>
              <span>I</span>nconcerto es un colectivo interdisciplinario de artistas, sociólogos, comunicadores y gestores culturales
              que crean espacios y canales para difundir y revalorizar la música clásica en nuestra época y lugar
              a través de proyectos que resignifican los protocolos que han situado a ésta,
              como un arte de y para una determinada clase social e intelectual.

              La larga trayectoria que ha tenido desde el año 2012 con actividades artísticas para los distintos públicos,
              en particular con personas que no han tenido contacto con este tipo de arte,
              han comprobado el potencial de la música de provocar, despertar y reactivar afectos y reacciones únicas en las audiencias.

              Por este motivo y comprendiendo la importancia que la música clásica tiene en el desarrollo sensible de la sociedad
              por sus características estéticas, poéticas y filosóficas; InConcerto busca llegar a los grupos de personas
              que por razones sociales, culturales, geográficas y etarias han sido históricamente excluidas
              desde nuevas formas de acercamiento que potencien a la música clásica como una herramienta de inclusión social.
              Razón por la cual, InConcerto ha realizado conciertos en distintos lugares tales como mercados, parques,
              centros de rehabilitación, Instituto de Hansen, cárceles, casa de confianza, ancianatos, etc.
          </p>

          <h3>Video tutorial:</h3>
          <ReactPlayer url='https://www.youtube.com/watch?v=KQetemT1sWc' playing />

          {/*{[...new Array(10)]*/}
              {/*    .map(() =>*/}
              {/*        `Cras mattis consectetur purus sit amet fermentum.*/}
              {/*         Cras justo odio, dapibus ac facilisis in, egestas eget quam.*/}
              {/*         Morbi leo risus, porta ac consectetur ac, vestibulum at eros.*/}
              {/*         Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,*/}
              {/*    )*/}
              {/*    .join('\n')}*/}
      </div>

  )
}