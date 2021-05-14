import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateTransport from "@/components/transports/UpdateTransport";
import DeleteTransport from "@/components/transports/DeleteTransport";


const TransportesID= () =>{
    const router = useRouter();
    const {id} = router.query;
    const {data: transport, error} = useSWR(`/transports/${id}`, fetcher);


    if(error) return <div>"No se obtuvo el tranporte"</div>;
    if(!transport) return <Loading/>;

    return (
        <div>
            <h1>Detalle Transporte</h1>
            <div>
                <h2>Transporte ID: {transport.id}</h2>
                <p>Nombre: {transport.type}</p>
                <p>Capacidad: {transport.capacity}</p>
                <p>Capacidad Instrumentos: {transport.instruments_capacity}</p>
                <p>Disponibilidad: {transport.disponibility}</p>
                <p>Matrícula: {transport.licence_plate}</p>
                <p>Calendario: {transport.calendar}</p>
            </div>
            <UpdateTransport id={transport.id}/>
            <DeleteTransport id={transport.id}/>
        </div>
    );

};

export default withAuth(TransportesID);
