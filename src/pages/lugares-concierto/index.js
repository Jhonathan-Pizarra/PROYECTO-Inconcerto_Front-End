import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReadArtistForm from "@/components/artists/ReadArtistForm";
import {useState} from "react";
import CreateArtistForm from "@/components/artists/CreateArtistForm";
import Conciertos from "../conciertos";
import ReadConcertPlace from "@/components/concert-places/ReadConcertPlace";
import CreateConcertPlace from "@/components/concert-places/CreateConcertPlace";


const LugaresConcierto = () => {

    return (
        <div>
            <div className="container">
                <ReadConcertPlace/>
                <CreateConcertPlace/>
            </div>
        </div>

    )
}

export default withAuth(LugaresConcierto);