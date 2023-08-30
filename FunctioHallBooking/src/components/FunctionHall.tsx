import { gql, useQuery } from "@apollo/client";
import Calender from "./Calender"
import { useParams } from "react-router-dom";

const GET_FUNCTIONHALL_QUERY = gql`
    query Query($hallID: ID!) {
  hall(id: $hallID) {
    id
    name
    price
    location{
        city
        state
    }
    bookings
  }
}`;

const FunctionHall = () => {
    const { id } = useParams();
    const { data, error, refetch } = useQuery(GET_FUNCTIONHALL_QUERY, {
        variables: { hallID: id }
    });
    if (data)
        console.log(data);
    if (error) {
        console.log(error);
    }

    return (
        <>
            <h1 className=' text-3xl font-bold underline text-center' > {data && data.hall.name}: calender </h1>
            <div className="d-flex m-2 justify-content-sm-center">
                <Calender id={id} data={data} refetch={refetch} />
            </div>
            <h3 className="text-center mt-5">Details</h3>
            <div className="d-flex m-5 min-w-75  bg-light flex-column flex-lg-row" >
                <div>
                    <img className="card-img-top rounded-3  shadow mr-3" src={`/images/${data && data.hall.id}.jpeg`} alt="Card image cap" />
                </div>
                <div className="px-3 shadow-lg w-100 p-3">
                    <h5 className="card-title mb-2">Name: {data && data.hall.name}</h5>
                    <p className="card-text mb-2 text-justify" > <strong> Description: </strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, aspernatur iusto! Neque harum vel animi amet corporis tempora architecto nesciunt laborum at consectetur quo, id, dolor quam ex qui facere.</p>
                    <p className="card-text mb-2"><strong>Location: </strong> {data && data.hall.location.city}, {data && data.hall.location.state} </p>
                    <p className="card-text mb-2"><strong>Price: </strong>{data && data.hall.price} INR</p>
                    <p className="card-text mb-2"><strong>Food-type: </strong> Non-Veg</p>
                    <p className="card-text mb-2"><strong>Occupency: </strong> 700-750 guests </p>
                </div>
            </div>
        </>
    )
}

export default FunctionHall