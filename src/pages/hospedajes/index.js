import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReadArtistForm from "@/components/artists/ReadArtistForm";
import {useState} from "react";
import CreateArtistForm from "@/components/artists/CreateArtistForm";
import Conciertos from "../conciertos";
import ReadLodging from "@/components/lodgings/ReadLodging";
import CreateLodging from "@/components/lodgings/CreateLodging";


const Hospedajes = () => {

    return (
        <div>
            <div className="container">
                <ReadLodging/>
                <CreateLodging/>
            </div>
        </div>

    )
}

export default withAuth(Hospedajes);
