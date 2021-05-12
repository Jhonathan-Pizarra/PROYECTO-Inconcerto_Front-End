import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";


const FeedingPlaceID = () =>{
    const router = useRouter();
    const {id} = router.query;
    const {data: fplace, error} = useSWR(`/feeding_places/${id}`, fetcher);


    if(error) return <div>"No se obtuvo el festival"</div>;
    if(!fplace) return <Loading/>;

    return (
        <div>
            <h1>Detalle Lugar Alimentación</h1>
            <div>
                <h2>Lugar ID: {fplace.id}</h2>
                <p>Nombre: {fplace.name}</p>
                <p>Descripcion: {fplace.address}</p>
            </div>
        </div>
    );

};

export default withAuth(FeedingPlaceID);
