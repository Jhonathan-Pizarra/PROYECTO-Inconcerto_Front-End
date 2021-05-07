import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReadArtistForm from "@/components/artists/ReadArtistForm";
import {useState} from "react";
import CreateArtistForm from "@/components/artists/CreateArtistForm";
import Conciertos from "../conciertos";


const Artistas = () => {

    return (
        <div>
            <div className="container">
                <ReadArtistForm/>
                <CreateArtistForm/>
            </div>
        </div>

    )
}

export default withAuth(Artistas);
