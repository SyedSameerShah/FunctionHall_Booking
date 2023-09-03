import { gql, useQuery } from "@apollo/client";
import Calender from "./Calender";
import { useParams } from "react-router-dom";

const GET_FUNCTIONHALL_QUERY = gql`
  query Query($hallID: ID!) {
    hall(id: $hallID) {
      id
      name
      price
      occupency
      discription
      cuisine
      location {
        city
        state
      }
      bookings
    }
  }
`;

const FunctionHall:React.FC = () => {
  const { id } = useParams<string>();
  let pricefromat = new Intl.NumberFormat("en-IN");
  const { data, error } = useQuery(GET_FUNCTIONHALL_QUERY, {
    fetchPolicy: "network-only",
    variables: { hallID: id },
  });
  if (error) {
    console.log(error);
  }

  return (
    <>
      <h1 className=" text-3xl font-bold underline text-center">
        {data && data.hall.name}: calender{" "}
      </h1>
      <hr className="mx-3" />
      <div className="d-flex m-2 my-5 justify-content-sm-center">
        <Calender id={id} data={data} QUERY={GET_FUNCTIONHALL_QUERY} />
      </div>
      <h3 className="text-center mt-5">Details</h3>
      <hr className="mx-3" />
      <div className="d-flex m-5 min-w-75  bg-light flex-column flex-lg-row">
        <div>
          <img
            className="card-img-top rounded-3  shadow mr-3"
            src={`/images/${data && data.hall.id}.jpeg`}
            alt="Card image cap"
          />
        </div>
        <div className="px-3 shadow-lg w-100 p-3">
          <h5 className="card-title mb-2">Name: {data && data.hall.name}</h5>
          <p className="card-text mb-2 text-justify">
            {" "}
            <strong> Description: </strong>
            {data && data.hall.discription}
          </p>
          <p className="card-text mb-2">
            <strong>Location: </strong>
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "#000000" }}
            ></i>{" "}
            {data && data.hall.location.city},{" "}
            {data && data.hall.location.state}{" "}
          </p>
          <p className="card-text mb-2">
            <strong>Price: </strong>{" "}
            <i
              className="fa-solid fa-sm fa-indian-rupee-sign"
              style={{ color: "#000000" }}
            ></i>{" "}
            {pricefromat.format(data && data.hall.price)}
          </p>
          <p className="card-text mb-2">
            <strong>Food-type: </strong> {data && data.hall.cuisine}
          </p>
          <p className="card-text mb-2">
            <strong>Occupency: </strong>
            {data && data.hall.occupency} guest
          </p>
        </div>
      </div>
    </>
  );
};

export default FunctionHall;
