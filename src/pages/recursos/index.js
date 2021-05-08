import withAuth from "@/hocs/withAuth";
import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReadArtistForm from "@/components/artists/ReadArtistForm";
import CreateArtistForm from "@/components/artists/CreateArtistForm";
import ReadResourcesForm from "@/components/resources/ReadResourcesForm";
import CreateResourceForm from "@/components/resources/CreateResourcesForm";


const Recursos = () => {

    return (
        <div>

            <div className="container">
                <ReadResourcesForm/>
                <CreateResourceForm/>
            </div>
        </div>
    )
}

export default withAuth(Recursos);
