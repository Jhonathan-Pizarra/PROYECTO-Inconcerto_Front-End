import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Link as MuiLink} from "@material-ui/core";
import Link from "next/link";
import UpdateEssay from "@/components/essays/UpdateEssay";
import React from "react";
import DeleteEssay from "@/components/essays/DeleteEssay";

const EnsayosID = () =>{

    const router = useRouter();
    const {id} = router.query;
    const {data: essay, error} = useSWR(`/essays/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el ensayo..."</div>;
    if(!essay) return <Loading/>;

    return (
        <div>
            <h1>Detalle Ensayo</h1>
            <div>
                <h2>Ensayo ID: {essay.id}</h2>
                <p>Nombre: {essay.name}</p>
                <p>Fecha: {essay.dateEssay}</p>
                <p>Lugar: {essay.place}</p>
                <p>Festival:
                <Link href={essay.festival} passHref>
                    <MuiLink>
                        Ver
                    </MuiLink>
                </Link>
                </p>
            </div>
            <UpdateEssay/>
            <DeleteEssay/>

        </div>
    );

};

export default withAuth(EnsayosID);
