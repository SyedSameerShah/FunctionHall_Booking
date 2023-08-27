import { add, addMonths, format, getDate, getDaysInMonth,  startOfMonth, sub, subMonths } from 'date-fns';
import { useState } from 'react';
import {  gql, useMutation, ApolloQueryResult } from '@apollo/client';
import '../index.css';
import { Button, Modal } from 'react-bootstrap';
import CalenderCell from './CalenderCell';
import CalenderHeader from './CalenderHeader';
import formatISO from 'date-fns/formatISO';



const ADD_DATE = gql`
    mutation Mutation($id: ID!, $date: String!){
      addDate(input:{ id :$id, date :$date })
} `;

interface props extends React.PropsWithChildren {
    data:any;
    id?:string;
    refetch: () => Promise<ApolloQueryResult<any>>

}

const  Calender:React.FC<props> = ({id,data,refetch}) => {

    const [modal, setmodal] = useState(false);
    const [bookingDate, setbookingDate] = useState<String>("");
    const [btnType, setbtnType] = useState(" btn btn-outline-dark ")
    // console.log(id);


    const [setdate, { data: confirm }] = useMutation( ADD_DATE, {
        variables: {
            id, bookingDate
        }
    });

    if (confirm)
        console.log(confirm);

    const daysofweek: Array<String> = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const [startdate, setstartdate] = useState<Date>(startOfMonth(new Date()))
    const numofdays: number = getDaysInMonth(startdate);
    const prenodays: number = getDaysInMonth(subMonths(startdate, 1));
    const prefixday: number = startdate.getDay();
    let no: number = prenodays - prefixday + 1;
    const suffixdays: number = addMonths(startdate, 1).getDay() > 0 ? 7 - addMonths(startdate, 1).getDay() : 0;

    const prevmonth = () => setstartdate(sub(startdate, { months: 1 }));
    const nextmonth = () => { setstartdate( add(startdate, { months: 1 })) ;console.log("next1")};
    const nextyear = () => add(startdate, { years: 1 });

    let calender: Array<number> = []

    for (let i = 0; i < prefixday; i++) {
        calender.push(no++);
    }

    for (let i = 0; i < numofdays; i++) {
        calender.push(i + 1);
    }
    for (let i = 0; i < suffixdays; i++) {
        calender.push(i + 1);
    }
    console.log( startdate, getDate(startdate) )

    const disablefun = (index: number) => {
        let date = add(startdate, { days: index });
        let datestr = date.toString();
        if ( date > new Date()) {
            if (data && data.hall.bookings.includes(datestr)) {
                setbtnType("btn-primary")
                return true;
            }
            else
                return false;
        }
        else
            return true;
    }


    return (
        <>
            <div className="d-grid text-center w-75 wid-100  shadow-lg rounded-2 " style={{gridTemplateColumns: "repeat(7, minmax(0, 1fr))"} as React.CSSProperties}>
                <CalenderHeader display="<<" onclick={prevmonth} />
                <CalenderHeader display="<" onclick={prevmonth} />
                <CalenderHeader display={format(startdate, "LLLL yyyy")} onclick={prevmonth} grid={{gridColumn: "span 3"}} />
                <CalenderHeader display=">" onclick={nextmonth} />
                <CalenderHeader display=">>" onclick={nextyear} />
                {
                    daysofweek.map((index, value) => {
                        return <CalenderCell key={value} display={index} classname={btnType} disabled={false} />
                    })
                }
                {
                    Array.from({ length: prefixday }).map((_, index) => {

                        return <CalenderCell key={index} display={no++} classname={btnType}  disabled={true} />
                    })
                }
                {
                    Array.from({ length: numofdays }).map((_, index) => {


                        return (<CalenderCell key={index}
                            date={  formatISO( add(startdate, { days: index }))}
                            setmodal={setmodal}
                            disabled={disablefun(index)}
                            setbookingDate={setbookingDate}
                            display={index + 1} />)
                    })
                }
                {
                    Array.from({ length: suffixdays }).map((_, index) => {

                        return < CalenderCell setbookingDate={setbookingDate} key={index} display={index + 1} classname={btnType} disabled={true} />
                    })
                }
                <Modal show={modal} centered>
                    <Modal.Header >
                        <Modal.Title>
                            {data && data.hall.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            <section>
                                <h5> Location : {data && data.hall.location.city}, {data && data.hall.location.state }</h5>
                                <h5>Price: {data && data.hall.price} INR</h5>
                                <h5>Booking Date: {bookingDate}</h5>
                            </section>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setmodal(false)} className='btn-dark' >close</Button>
                        <Button onClick={() => {
                            setdate({
                                variables: { id, date: bookingDate }
                            });
                            refetch();
                            setmodal(false);

                        }} className="btn-dark ">Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export default Calender;