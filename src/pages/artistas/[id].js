import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";


const ArtistasID= () =>{

    const router = useRouter();
    const {id} = router.query;
    const {data: artist, error} = useSWR(`/artists/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el Artista"</div>;
    if(!artist) return <Loading/>;

    return (
        <div>
            <h1>Detalle Artsta</h1>
            <div>
                <h2>Artist ID: {artist.id}</h2>
                <p>Nombre: {artist.name}</p>
                <p>Nacionalidad: {artist.nationality}</p>
            </div>
        </div>
    );

};

export default withAuth(ArtistasID);
