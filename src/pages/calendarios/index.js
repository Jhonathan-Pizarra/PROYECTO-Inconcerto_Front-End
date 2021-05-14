import withAuth from "@/hocs/withAuth";
import CreateCalendar from "@/components/calendars/CreateCalendar";
import ReadCalendars from "@/components/calendars/ReadCalendars";


const Calendarios = () => {

    return (
        <div>
            <div className="container">
                <ReadCalendars/>
                <CreateCalendar/>
            </div>
        </div>

    )
}

export default withAuth(Calendarios);

