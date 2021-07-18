import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import Routes from "@/constants/routes";
import {Button} from "@material-ui/core";
import React from "react";
import {Transport} from "@/lib/transports";
import translateMessage from "@/constants/messages";

const DeleteTransport = ({id}) => {

    const router = useRouter();
    const {data: transport, error} = useSWR(`/transports/${id}`, fetcher);

    const handleDelete = async () => {
        try {
            await Transport.delete(id);
            router.push(Routes.TRANSPORTS);
        } catch (error) {
            if (error.response) {
                //alert(error.response.message);
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            alert(translateMessage(error.config));
            console.log(error.config);
        }
    };

    if(error) return <div>"No se pudo borrar el transporte..."</div>;
    if(!transport) return <Loading/>;

    return (
        <div>
            <Button
                size="small"
                color="primary"
                onClick={handleDelete}
            >
                Eliminar
            </Button>
        </div>
    );

};

export default DeleteTransport;
