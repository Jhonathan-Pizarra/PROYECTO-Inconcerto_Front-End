import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import UpdateConcert from "@/components/concerts/UpdateConcert";
import React from "react";
import DeleteConcert from "@/components/concerts/DeleteConcert";


const ConciertosID = () => {

    const router = useRouter();
    const {id} = router.query;
    const {data: concert, error} = useSWR(`/concerts/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el concierto..."</div>;
    if(!concert) return <Loading/>;

    return (
        <div>
            <h1>Detalle Concierto</h1>
            <div>
                <h2>Concert ID: {concert.id}</h2>
                <p>Nombre: {concert.name}</p>
                <p>Fecha: {concert.dateConcert}</p>
            </div>
            <UpdateConcert/>
            <DeleteConcert/>
        </div>
    );

};

export default withAuth(ConciertosID);
