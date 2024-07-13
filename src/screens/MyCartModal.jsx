import React from "react";
import { Dialog, Card, CardBody, CardFooter, Button, Typography } from "@material-tailwind/react";
import { CartStateContext, CartDispatchContext } from '../components/ContextReducer';

const MyCartModal = ({ open, setOpen }) => {
  const cart = React.useContext(CartStateContext);
  const dispatch = React.useContext(CartDispatchContext);

  const handleDeleteItem = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  // Calculate total price of all items in the cart
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handleCheckout = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("User email not found in local storage.");
      return;
    }

    const orderData = {
      order_data: cart,
      email: email,
    };

    try {
      const response = await fetch('http://localhost:4002/orderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Order placed successfully!");
        // Optionally clear the cart after successful order
        dispatch({ type: 'CLEAR_CART' });
        setOpen(false);
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <Dialog
      size="lg"
      open={open}
      handler={setOpen}
      className="bg-transparent"
      breakpoints={{
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-3xl",
        xl: "max-w-4xl",
      }}
    >
      <Card className="mx-auto w-full bg-white overflow-y-auto max-h-[70vh] lg:max-h-[80vh]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray" className="text-center">
            My Cart
          </Typography>
          {cart.length > 0 ? (
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{item.title}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">${item.price}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{item.quantity}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        ${item.price * item.quantity}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Button
                        variant="text"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography className="mb-3 font-normal text-center" variant="paragraph" color="gray">
              Your cart is empty.
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="gray">
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <div>
              <Button variant="text" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" className="ml-2" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default MyCartModal;
