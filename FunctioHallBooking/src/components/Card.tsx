import {Link } from 'react-router-dom'
'../assets/images/64d884bb0fdf6167d9813047.jpg' 
interface props extends React.PropsWithChildren{
    id:String;
    name:String;
    discription:String;
    price:number;
    imgURL:string;
    location:{city:String, state:String};
}
const Card : React.FC<props> = ({
    name,price,imgURL,location,id
}) => {
    return (
        <div className="card m-2 min-w-25 shadow-lg " >
            <img className="card-img-top" src={imgURL} style={{ maxWidth: "21rem" }}  alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text text-justify " style={{ maxWidth:"19rem",height:"10rem" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, aspernatur iusto! Neque harum vel animi amet corporis tempora architecto nesciunt laborum at consectetur quo, id, dolor quam ex qui facere.</p>

                <p className="card-text"><i className="fa-solid fa-location-dot" style={{color:" #000000"}}></i> {location && location.city}, {location && location.state}</p>
                <p className="card-text">{price} <i className="fa-solid fa-indian-rupee-sign" style={{color: "#000000;"}}></i></p>
                <Link to={`/halls/${id}`} className="btn btn-dark">Check Availability</Link>
            </div>
        </div>
    )
        
}

export default Card;