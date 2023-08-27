import { useState } from "react"
import  Modal  from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { gql, useLazyQuery } from '@apollo/client';
import { Link } from "react-router-dom";

type filter = {
    price?: number;
    date?: String ;
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

interface props extends React.PropsWithChildren {
    filter: (variables: object) => void
}

const Nav: React.FC<props> = ({ filter }) => {

    const [display, setdisplay] = useState("d-none")
    const [search, setsearch] = useState("");
    const [priceFilter, setpriceFilter] = useState<filter>();
    const [modal, setmodal] = useState<boolean>(false);

    const [fetchname, { data: searchdata, }] = useLazyQuery(GET_SEARCH_RESULT);


    const [fetchlocation, { data, error }] = useLazyQuery(GET_STATE_CITY);
    if (data)
        console.log(data)
    if (error)
        console.log(error)

    return (
        <div>
            <nav className="navbar navbar-dark sticky-top bg-dark">
                <div className="container-fluid mx-3">
                    <a className="navbar-brand">Navbar</a>
                    <div className="d-flex " role="search">
                        <input className="form-control me-2 position-relative" type="search" onChange={ event => setsearch(event.target.value)}
                            onKeyUp={() => {
                                    fetchname({
                                        variables: {
                                            name: search
                                        }
                                    }); 
                                setdisplay("d-block");
                            }} placeholder="Enter the name of Hall" aria-label="Search" />
                        <button className="btn btn-secondary" type="submit">Search</button>
                        <section className={`position-absolute bg-light ${display}`} style={{ top: "47px", width: "205px" }}>
                            <ul className="m-0 p-0">
                                {
                                    searchdata ? searchdata.searchHall.map((name: any) => {
                                        return (<li className="list-unstyled p-1 border-bottom">
                                            <Link to={`/halls/${name.id}`} className="text-decoration-none text-dark ">{name.name}</Link>

                                        </li>)
                                    }) : <li>NoMATCH FOUND</li>
                                }

                            </ul>


                        </section>
                    </div>


                    <Button onClick={() => { fetchlocation(); setmodal(true) }}>Filter</Button>
                    <Modal show={modal} centered>
                        <Modal.Header >
                            <Modal.Title>
                                Filters
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <input type="date" className="form-element" onChange={(e) => { setpriceFilter({ date: e.target.value})  }} />
                            <input type="number" className="form-element" onChange={(e) => { setpriceFilter({ price: Number(e.target.value) }) }} />
                            <select className=" form-select btn-dark " onChange={(event) => setpriceFilter({ state: event.target.value })}>
                                <option value="" selected>select state</option>

                                {
                                    data && data.halls.map((hall: hall) => {

                                        return (<option className="" value={hall.location.state}>{hall.location.state}</option>)
                                    })
                                }
                            </select>
                            <select className="form-select " onChange={(event) => setpriceFilter({ city: event.target.value })}>
                                <option value="" selected>select city</option>
                                {
                                    data && data.halls.map((hall: hall) => {
                                        return (<option value={hall.location.city}>{hall.location.city}</option>)
                                    })
                                }
                            </select>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setmodal(false)} >close</Button>
                            <Button onClick={() => {
                                filter({
                                    variables: {
                                        price: priceFilter?.price,
                                        city: priceFilter?.city,
                                        state: priceFilter?.state,
                                        date: priceFilter?.date?.length != 0 ? priceFilter?.date : ""
                                    }
                                }); setmodal(false)
                            }} className=" btn-dark ">Apply</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </nav>
        </div>
    )
}

export default Nav;