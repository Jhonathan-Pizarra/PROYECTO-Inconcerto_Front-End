import withAuth from "@/hocs/withAuth";
import ReadTransport from "@/components/transports/ReadTransport";
import CreateTransport from "@/components/transports/CreateTransport";


const Transportes = () => {

    return (
        <div>
            <div className="container">
                <ReadTransport/>
            </div>
        </div>

    )
}

export default withAuth(Transportes);
