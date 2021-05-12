import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReadArtistForm from "@/components/artists/ReadArtistForm";
import {useState} from "react";
import CreateArtistForm from "@/components/artists/CreateArtistForm";
import Conciertos from "../conciertos";
import ReadActivity from "@/components/activities/ReadActivity";
import CreateActivity from "@/components/activities/CreateActivity";


const Actividades = () => {

    return (
        <div>
            <div className="container">
                <ReadActivity/>
                <CreateActivity/>
            </div>
        </div>

    )
}

export default withAuth(Actividades);
