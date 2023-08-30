import { DocumentNode, gql, useMutation } from '@apollo/client';
import { add, addMonths, format, getDate, getDaysInMonth, startOfMonth, sub, subMonths } from 'date-fns';
import { useState } from 'react';
import CalenderCell from './CalenderCell';
import CalenderHeader from './CalenderHeader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../index.css';


const ADD_DATE = gql`
    mutation Mutation($id: ID!, $date: String!){
      addDate(input:{ id :$id, date :$date })
} `;

type hall = {
    hall: {
        id: String;
        price: number;
        name: String;
        location: {
            city: String;
            state: String;
        };
        bookings: [String];
    }
}

interface props extends React.PropsWithChildren {
    data: hall;
    id?: string;
    QUERY: DocumentNode;

}

const Calender: React.FC<props> = ({ id, data, QUERY }) => {

    const [modal, setmodal] = useState<boolean>(false);
    const [bookingDate, setbookingDate] = useState<string>("");
    const [startdate, setstartdate] = useState<Date>(startOfMonth(new Date()));


    const [setdate, _] = useMutation(ADD_DATE, {
        variables: {
            id, bookingDate
        },
        refetchQueries: [QUERY]
    });

    const daysofweek: Array<String> = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const numofdays: number = getDaysInMonth(startdate);
    const prenodays: number = getDaysInMonth(subMonths(startdate, 1));
    const prefixday: number = startdate.getDay();
    const suffixdays: number = addMonths(startdate, 1).getDay() > 0 ? 7 - addMonths(startdate, 1).getDay() : 0;
    const formateDate: Date = sub(new Date(bookingDate), { days: 1 });
    let no: number = prenodays - prefixday + 1;
    let numberArr: Array<number> = Array.from({ length: prefixday }).map(() => no++);
    const prevmonth = (): void => setstartdate(sub(startdate, { months: 1 }));
    const prevyear = (): void => setstartdate(sub(startdate, { years: 1 }));
    const nextmonth = (): void => { setstartdate(add(startdate, { months: 1 })) };
    const nextyear = (): void => { setstartdate(add(startdate, { years: 1 })); }

    console.log(startdate, getDate(startdate));

    return (
        <>
            <div className="d-grid text-center w-75 wid-100  shadow-lg rounded-2 " style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
                <CalenderHeader display="<<" onclick={prevyear} />
                <CalenderHeader display="<" onclick={prevmonth} />
                <CalenderHeader display={format(startdate, "LLLL yyyy")} onclick={prevmonth} grid={{ gridColumn: "span 3" }} />
                <CalenderHeader display=">" onclick={nextmonth} />
                <CalenderHeader display=">>" onclick={nextyear} />
                {
                    daysofweek.map((value, index) => {
                        return <CalenderHeader key={index} display={value} />
                    })
                }
                {
                    Array.from({ length: prefixday }).map((_, index) => {

                        return <CalenderCell key={index} display={numberArr[index]} startdate={startdate} index={index} disabled={true} />
                    })
                }
                {
                    Array.from({ length: numofdays }).map((_, index) => {


                        return (<CalenderCell key={index}
                            setmodal={setmodal}
                            index={index + 1}
                            startdate={startdate}
                            booking={data && data.hall.bookings}
                            setbookingDate={setbookingDate}
                            display={index + 1} />)
                    })
                }
                {
                    Array.from({ length: suffixdays }).map((_, index) => {

                        return <CalenderCell setbookingDate={setbookingDate} index={index} startdate={startdate} key={index} display={index + 1} disabled={true} />
                    })
                }
                <Modal show={modal} centered >
                    <Modal.Header >
                        <Modal.Title>
                            {data && data.hall.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            <section>
                                <h5> Location : <i className="fa-solid fa-sm fa-location-dot" style={{color:" #000000"}}></i> {data && data.hall.location.city}, {data && data.hall.location.state}</h5>
                                <h5>Price: {data && data.hall.price} <i className="fa-solid fa-sm fa-indian-rupee-sign" style={{color: "#000000"}}></i> </h5>
                                <h5>Booking Date: {modal && format(formateDate, "EEE dd LLL yyyy ")}</h5>
                            </section>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setmodal(false)} className='btn-dark' >close</Button>
                        <Button onClick={async () => {
                            await setdate({
                                variables: { id, date: bookingDate }
                            });
                            setmodal(false);
                        }} className="btn-dark ">Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export default Calender;