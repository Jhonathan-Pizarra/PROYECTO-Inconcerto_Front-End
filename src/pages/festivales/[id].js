import {useEffect, useState} from "react";
import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";


const FestivalID = () =>{
    const router = useRouter();
    const {id} = router.query;
    const {data, error} = useSWR(`/festivals/${id}`, fetcher);


    if(error) return <div>"No se obtuvo el festival"</div>;
    if(!data) return <Loading/>;

    return (
        <div>
            <h1>Detalle Festival</h1>
            <div>
                <h2>Festival ID: {data.id}</h2>
                <p>Nombre: {data.name}</p>
                <p>Descripcion: {data.description}</p>
            </div>
        </div>
    );

};

export default withAuth(FestivalID);

