import { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { gql, useLazyQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import '../assets/CSS/index.css';

type filter = {
    price?: number;
    date?: String;
    city?: String;
    state?: String;

}

type hall = {
    location: {
        state: string;
        city: string;
    }
}

const GET_STATE_CITY = gql`
    query Query{
        halls{
            location{
                state
                city
            }
        }
    }
`;

const GET_SEARCH_RESULT = gql`
    query Query($name:String){
        searchHall(name:$name){
            name
            id
        }
    }
`;




const Nav: React.FC<{ filterQuery: (variables: object) => void }> = ({ filterQuery }) => {

    const [display, setdisplay] = useState<string>("d-none")
    const [search, setsearch] = useState<string>("");
    const [filter, setfilter] = useState<filter>();
    const [modal, setmodal] = useState<boolean>(false);
    let uniquesearch: Array<string> = []


    const [fetchname, { data: searchdata }] = useLazyQuery(GET_SEARCH_RESULT,

        );

    const [fetchlocation, { data }] = useLazyQuery(GET_STATE_CITY);
    return (
        <div>
            <nav className="navbar navbar-dark sticky-top bg-dark">
                <div className="container-fluid mx-3">
                    <a className="navbar-brand">FESTIVALT</a>
                    <div className="d-flex m-1 " role="search">
                        <input className="form-control me-2 position-relative rounded-4" type="search" value={search} onChange={event => {
                            setsearch(event.target.value);
                            fetchname({
                                variables: {
                                    name: event.target.value
                                }
                            });
                            setdisplay("d-block");
                        }} placeholder="Enter the name of Venu" aria-label="Search" />
                        <button className="btn btn-secondary rounded-5" type="submit"><i className="fa-solid fa-magnifying-glass" style={{ color: " #030303" }}></i></button>
                        <section className={`position-absolute bg-white top ${display}`} style={{ top: "50px", width: "205px" }}>
                            <ul className="m-0 p-0">
                                {
                                    search.length > 1 && searchdata && searchdata.searchHall.map((name: any) => {
                                        return (<li key={name.id} className="list-unstyled p-1 border-bottom">
                                            <Link to={`/halls/${name.id}`} className="text-decoration-none text-dark ">{name.name}</Link>

                                        </li>)
                                    })
                                }
                            </ul>
                        </section>
                    </div>


                    <Button className="btn btn-secondary filter " onClick={() => { fetchlocation(); setmodal(true) }}>Filter</Button>
                    <Modal show={modal} centered>
                        <Modal.Header >
                            <Modal.Title>
                                Filters
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Price: <input type="number" className="form-control m-1" placeholder="Enter the minimum price" onChange={(e) => { setfilter({...filter,  price: Number(e.target.value) }); }} />
                            Date:<input type="date" className="form-control m-1" onChange={(e) => { setfilter({...filter,date: e.target.value })  }} />
                            State:<select className=" form-select btn-dark m-1" onChange={(event) => { setfilter({...filter, state: event.target.value }) }}>
                                <option value="" >select state</option>
                                {
                                    data && data.halls.map((hall: hall,index:number) => {
                                        if (!uniquesearch.includes(hall.location.state)) {
                                            uniquesearch.push(hall.location.state)
                                            return (<option key={index} className="" value={hall.location.state}> {hall.location.state}</option>)
                                        }
                                    })
                                }
                            </select>
                            City: <select className="form-select " onChange={(event) => setfilter({...filter, city: event.target.value })}>
                                <option value="" >select city</option>
                                {
                                    data && data.halls.map((hall: hall,index:number) => {
                                        if (!uniquesearch.includes(hall.location.city)) {
                                            uniquesearch.push(hall.location.city)
                                            return (<option key={index} value={hall.location.city}>{hall.location.city}</option>)
                                        }
                                    })
                                }
                            </select>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="btn btn-dark" onClick={() => setmodal(false)} >close</Button>
                            <Button type="submit" onClick={() => {
                                filterQuery({
                                    variables: {
                                        price: filter?.price,
                                        city: filter?.city,
                                        state: filter?.state,
                                        date: filter?.date?.length != 0 && filter?.date
                                    },
                                    onCompleted: () => setfilter({})
                                }); setmodal(false)
                            }} className=" btn btn-dark " >Apply</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </nav >
        </div >
    )
}

export default Nav;