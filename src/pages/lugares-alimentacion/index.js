import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReadArtistForm from "@/components/artists/ReadArtistForm";
import {useState} from "react";
import CreateArtistForm from "@/components/artists/CreateArtistForm";
import Conciertos from "../conciertos";
import ReadFeedingPlace from "@/components/feeding-places/ReadFeedingPlace";
import CreateFeedingPlace from "@/components/feeding-places/CreateFeedingPlace";


const LugarAlimentacion = () => {

    return (
        <div>
            <div className="container">
                <ReadFeedingPlace/>
                <CreateFeedingPlace/>
            </div>
        </div>

    )
}

export default withAuth(LugarAlimentacion);
