import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import Card from "./Card";
import Nav from "./Nav";
import "../assets/CSS/index.css";

const QUERY_ALL_HALLS = gql`
  query getAllHalls {
    halls {
      id
      price
      name
      discription
      location {
        city
        state
      }
    }
  }
`;

const QUERY_FILTER = gql`
  query Filter($price: Int, $city: String, $state: String, $date: String) {
    filter(
      price: $price
      location: { city: $city, state: $state }
      date: $date
    ) {
      id
      price
      name
      discription
      location {
        city
        state
      }
      bookings
    }
  }
`;

type location = {
  city: String;
  state: String;
};

type hall = {
  id: String;
  price: number;
  name: String;
  location: location;
  cuisine?: "Veg" | "Non-Veg" | "Veg/Non-Veg";
  discription: String;
  occupency?: String;
};

const Hall:React.FC = () => {
  const [isloading, setisloading] = useState<boolean>(true);
  const { data: hallData, loading } = useQuery(QUERY_ALL_HALLS);
  const [filter, { error, data: filteredData }] = useLazyQuery(QUERY_FILTER);
  if (error) console.log(error);
  useEffect(() => {
    if (!loading) setisloading(false);
  }, [loading]);

  return (
    <>
      <Nav filterQuery={filter} />
      {isloading ? (
        <h3 className="text-center m-5">loading...</h3>
      ) : (
        <div className="d-flex flex-wrap justify-content-evenly wrapper">
          {filteredData ? (
            filteredData.filter.length > 0 ? (
              filteredData.filter.map((hall: hall, index: number) => {
                return (
                  <Card
                    key={index}
                    id={hall.id}
                    name={hall.name}
                    price={hall.price}
                    discription={hall.discription}
                    imgURL={`/images/${hall.id}.jpeg`}
                    location={hall.location}
                  />
                );
              })
            ) : (
              <h3 className="text-center m-5">
                No Match Found, <br /> Please Change the Filters.
              </h3>
            )
          ) : (
            hallData &&
            hallData.halls.map((hall: hall, index: number) => {
              return (
                <Card
                  key={index}
                  id={hall.id}
                  name={hall.name}
                  price={hall.price}
                  discription={hall.discription}
                  imgURL={`/images/${hall.id}.jpeg`}
                  location={hall.location}
                />
              );
            })
          )}
        </div>
      )}
    </>
  );
};

export default Hall;
