import withAuth from "@/hocs/withAuth";
import React from "react";
import ReadEssays from "@/components/essays/ReadEssays";


const Ensayos = () => {

    return (
       <ReadEssays/>
    )
}

export default withAuth(Ensayos);
