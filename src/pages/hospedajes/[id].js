import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";


const HospedajesID= () =>{
    const router = useRouter();
    const {id} = router.query;
    const {data: lodging, error, mutate} = useSWR(`/lodgings/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el hospedaje"</div>;
    if(!lodging) return <Loading/>;

    return (
        <div>
            <h1>Detalle Hospedaje</h1>
            <div>
                <h2>Hospedaje ID: {lodging.id}</h2>
                <p>Fecha ingreso: {lodging.checkIn}</p>
                <p>Descripcion: {lodging.description}</p>
            </div>
        </div>
    );

};

export default withAuth(HospedajesID);
