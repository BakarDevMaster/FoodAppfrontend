import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CartStateContext, CartDispatchContext } from '../components/ContextReducer';
import { useContext, useState, useEffect } from "react";

export default function CardE(props) {
  const token = JSON.parse(localStorage.getItem("token"));
  const state = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  const [quantities, setQuantities] = useState(
    props.data.reduce((acc, item) => {
      acc[item.id] = 1;
    
      return acc;
    }, {})
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  useEffect(() => {
    // Update the cart context with the new quantities
    props.data.forEach((item) => {
      dispatch({
        type: 'UPDATE_CART_ITEM',
        payload: { ...item, quantity: quantities[item.id] },
      });
    });
  }, [quantities]);

  return (
    <div className="my-3 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
      {props.data.map((item, index) => (
        <Card key={index} className="bg-white text-black">
          <CardHeader shadow={false} floated={false} className="h-52">
            <img
              src={item.image}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="white" className="font-medium text-lg text-black">
                {item.title}
              </Typography>
              <Typography color="white" className="font-medium text-lg text-black">
                ${item.price}
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75 text-gray-800"
            >
              {item.description}
            </Typography>
            <Typography
              color="black"
              className="font-medium text-lg mt-2"
            >
              Total Price: ${((item.price * quantities[item.id]).toFixed(2))}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex gap-x-2 items-center -mt-4">
            <div className="flex items-center">
              <select
                name="quantity"
                id="quantity"
                value={quantities[item.id]}
                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                className="py-[10.1px] w-12 rounded-lg bg-black text-white px-1"
              >
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>
            <Button
              ripple={false}
              className="w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              onClick={() =>{
                token ?
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: { ...item, quantity: quantities[item.id], totalPrice: (item.price * quantities[item.id]).toFixed(2) },
                }): alert("You are not authenticated User. please login")
              }}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
