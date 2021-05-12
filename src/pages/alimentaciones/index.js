import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReadArtistForm from "@/components/artists/ReadArtistForm";
import {useState} from "react";
import CreateArtistForm from "@/components/artists/CreateArtistForm";
import Conciertos from "../conciertos";
import ReadFeeding from "@/components/feedings/ReadFeeding";
import CreateFeeding from "@/components/feedings/CreateFeeding";


const Alimentaciones = () => {

    return (
        <div>
            <div className="container">
                <ReadFeeding/>
                <CreateFeeding/>
            </div>
        </div>

    )
}

export default withAuth(Alimentaciones);
