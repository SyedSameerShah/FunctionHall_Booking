import { useQuery, useLazyQuery, gql } from "@apollo/client";
import Card from "./Card";
import Nav from './Nav';
import '../index.css'

const QUERY_ALL_HALLS = gql`
    query getAllHalls {
        halls {
            id
            price
            name
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
            location {
                city
                state
            }
        }
    }
`;

type location =  {
    city: String;
    state: String;
}

type hall = {
    id: String;
    price: number;
    name: String;
    location: location;

}


const Hall = () => {

    const {data:hallData} = useQuery(QUERY_ALL_HALLS);
    const [fetchprice, { data: filtereddata, error: perror }] = useLazyQuery(QUERY_PRICE_FILTER);
    if (filtereddata){
        console.log("filter",filtereddata)
    }
    if (perror)
        console.log(perror)

    return (
        <>
            <Nav filter={fetchprice} />
            <div className="d-flex flex-wrap center justify-content-even">
                {
                filtereddata ? (filtereddata.price.map((hall: hall) => {
                    return <Card id={hall.id} name={hall.name} price={hall.price} discription={""} imgURL= {`/images/${hall.id}.jpeg`} location={hall.location} />
                })) :
                  hallData  && (hallData.halls.map((hall: hall) => {
                    return <Card id={hall.id} name={hall.name} price={hall.price} discription={""} imgURL= {`/images/${hall.id}.jpeg`} location={hall.location} />
                }))

                }

            </div>
        </>
    )
}

export default Hall;