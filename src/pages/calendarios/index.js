import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReadArtistForm from "@/components/artists/ReadArtistForm";
import {useState} from "react";
import CreateArtistForm from "@/components/artists/CreateArtistForm";
import Conciertos from "../conciertos";
import ReadCalendar from "@/components/calendars/ReadCalendar";
import CreateCalendar from "@/components/calendars/CreateCalendar";


const Calendarios = () => {

    return (
        <div>
            <div className="container">
                <ReadCalendar/>
                <CreateCalendar/>
                {/*<ReadArtistForm/>*/}
                {/*<CreateArtistForm/>*/}
            </div>
        </div>

    )
}

export default withAuth(Calendarios);

