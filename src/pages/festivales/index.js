import Navigation from "../../components/Navigation";

export default function Festivales({festivals}) {
    return(
        <div>
            <Navigation/>
            <h1>Festivales InConcerto</h1>
            <div>
                {festivals.data.map(festival => {
                    return(
                        <div key={festival.id}>
                            <a>
                                <p>Name: {festival.name}</p>
                                <p>Description: {festival.description}</p>
                                <br/>
                            </a>
                        </div>
                    )
                })}
            </div>

        </div>

    )
}

//Static Render Content
export async function getStaticProps() {
    const resp = await fetch('http://localhost:8000/api/festivals');
    const festivals = await resp.json();

    return {
        props:{
            festivals
        }
    }
}