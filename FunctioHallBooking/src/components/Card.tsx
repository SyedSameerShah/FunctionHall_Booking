import { Link } from "react-router-dom";
interface props extends React.PropsWithChildren {
  id: String;
  name: String;
  discription: String;
  price: number;
  imgURL: string;
  location: { city: String; state: String };
}
const Card: React.FC<props> = ({
  name,
  price,
  imgURL,
  location,
  id,
  discription,
}) => {
  let pricefromat = new Intl.NumberFormat("en-IN");

  return (
    <div className="card m-2 max-w-25 shadow-lg ">
      <img
        className="card-img-top"
        src={imgURL}
        style={{ maxWidth: "21rem" }}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p
          className="card-text text-justify "
          style={{ maxWidth: "19rem", height: "10rem" }}
        >
          {discription}
        </p>
        <p className="card-text">
          <i
            className="fa-solid fa-location-dot"
            style={{ color: " #000000" }}
          ></i>{" "}
          {location && location.city}, {location && location.state}
        </p>
        <p className="card-text">
          <i
            className="fa-solid fa-indian-rupee-sign"
            style={{ color: "#000000;" }}
          ></i>{" "}
          {pricefromat.format(price)}{" "}
        </p>
        <Link to={`/halls/${id}`} className="btn btn-dark">
          Check Availability
        </Link>
      </div>
    </div>
  );
};

export default Card;
