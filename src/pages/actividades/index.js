import withAuth from "@/hocs/withAuth";
import React from "react";
import ReadActivity from "@/components/activities/ReadActivity";
import CreateActivity from "@/components/activities/CreateActivity";


const Actividades = () => {

    return (
        <div>
            <div className="container">
                <ReadActivity/>
            </div>
        </div>
    )
}

export default withAuth(Actividades);
