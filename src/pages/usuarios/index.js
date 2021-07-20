import withAuth from "@/hocs/withAuth";
import ReadUsers from "@/components/usuarios/ReadUsers";
import React, {useEffect, useState} from "react";
import api from "@/lib/api";
import cookie from "js-cookie";
import useSWR from "swr";
import {fetcher} from "../../utils";
import {useAuth} from "@/lib/auth";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import Routes from "@/constants/routes";
import Loading from "@/components/Loading";


const Usuarios = () => {

    const { user } = useAuth();

    if(!user) return <Loading/>
    const rol = (user.role === undefined) ? user.user.role : user.role;
    //console.log("Usuario", user.user.name);
    //console.log("Rol", user.user.role);

    return (
        <div>
            <div>
                {rol === 'ROLE_ADMIN' ? (<ReadUsers/>) : (<h2>No tienes permisos de administrador 😅 ...</h2>)}
            </div>
        </div>
    )

}

export default withAuth(Usuarios);
