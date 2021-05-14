import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateConcertPlace from "@/components/concert-places/UpdateConcertPlace";
import DeleteConcertPlace from "@/components/concert-places/DeleteConcertPlace";


const PlaceConcertsID= () =>{

    const router = useRouter();
    const {id} = router.query;
    const {data: place, error} = useSWR(`/places/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el lugar"</div>;
    if(!place) return <Loading/>;

    return (
        <div>
            <h1>Detalle Festival</h1>
            <div>
                <h2>Places ID: {place.id}</h2>
                <p>Nombre: {place.name}</p>
                <p>Dirección: {place.address}</p>
            </div>
            <UpdateConcertPlace id={place.id}/>
            <DeleteConcertPlace id={place.id}/>
        </div>
    );

};

export default withAuth(PlaceConcertsID);
