import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useState, useEffect } from 'react'
import Card from "./Card";
import Nav from './Nav';
import '../index.css'

const QUERY_ALL_HALLS = gql`
    query getAllHalls {
        halls {
            id
            price
            name
            discription
            location{
                city
                state
            }
        }
    }
`;

const QUERY_PRICE_FILTER = gql`

    query priceFilter($price: Int, $city: String, $state:String, $date:String  ){
        price(price: $price, location:{ city: $city, state: $state, } , date:$date){
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
}

type hall = {
    id: String;
    price: number;
    name: String;
    location: location;
    cuisine?: "Veg" | "Non-Veg" | "Veg/Non-Veg"
    discription: String
    occupency?: String

}


const Hall = () => {
    const [isloading, setisloading] = useState<boolean>(true);

    const { data: hallData, loading } = useQuery(QUERY_ALL_HALLS);
    useEffect(() => {
        if (!loading) setisloading(false)

    }, [loading])


    const [fetchprice, { error: perror, data: filtereddata }] = useLazyQuery(QUERY_PRICE_FILTER);
    if (filtereddata) {
        console.log("filter", filtereddata)
    }
    if (perror)
        console.log(perror)

    return (
        <>
            <Nav filter={fetchprice} />
            {
                isloading ? <h3 className="text-center m-5">loading...</h3>
                    :
                    <div className="d-flex flex-wrap justify-content-evenly wrapper">
                        {
                            filtereddata ? (filtereddata.price.map((hall: hall) => {
                                return <Card id={hall.id} name={hall.name} price={hall.price} discription={hall.discription} imgURL={`/images/${hall.id}.jpeg`} location={hall.location} />
                            })) :
                            hallData && (hallData.halls.map((hall: hall) => {
                                return <Card id={hall.id} name={hall.name} price={hall.price} discription={hall.discription} imgURL={`/images/${hall.id}.jpeg`} location={hall.location} />
                            }))
                        }

                    </div>
            }
        </>
    )
}

export default Hall;