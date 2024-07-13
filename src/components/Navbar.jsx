// NavbarE.jsx

import React from "react";
import {
  Badge,
  Navbar as MaterialNavbar,
  Button,
  IconButton,
  Typography,
  MobileNav,
  Dialog,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import MyCartModal from "../screens/MyCartModal"; // Import the MyCartModal component
import { CartStateContext, CartDispatchContext } from '../components/ContextReducer';

const NavbarE = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openCartModal, setOpenCartModal] = React.useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const cart = React.useContext(CartStateContext);
  const dispatch = React.useContext(CartDispatchContext);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal text-base transition-colors hover:text-gray-400 focus:text-gray-400"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal transition-colors hover:text-gray-400 focus:text-gray-400 text-base"
      >
        <Link to="#" className="flex items-center">
          Account
        </Link>
      </Typography>
      {token && (
        <Typography
          as="li"
          variant="small"
          color="white"
          className="p-1 font-normal transition-colors hover:text-gray-400 focus:text-gray-400 text-base"
        >
          <Link to="#" className="flex items-center">
            My Orders
          </Link>
        </Typography>
      )}
      <div className="flex flex-col lg:hidden">
        {token ? (
          <>
            <div className="flex items-center -ml-2">
              <Badge content={cart.length} withBorder className="">
                <Button
                  variant="text"
                  size="sm"
                  className="text-white hover:text-gray-400 text-base"
                  onClick={() => setOpenCartModal(true)}
                >
                  <span>My Cart</span>
                </Button>
              </Badge>
            </div>
            <Button
              variant="text"
              size="sm"
              className="text-white hover:text-gray-400 text-base"
              onClick={() => setOpenModal(true)}
            >
              <span className="text-deep-orange-500 text-base hover:text-deep-orange-300">Logout</span>
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="text"
                size="sm"
                className="text-white hover:text-gray-400 text-base"
              >
                <span>Log In</span>
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="gradient"
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-base"
              >
                <span>Sign Up</span>
              </Button>
            </Link>
          </>
        )}
      </div>
    </ul>
  );

  const handleDeleteItem = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  return (
    <MaterialNavbar className="sticky top-0 z-10 h-max max-w-full border-none rounded-none px-4 py-2 bg-black/100 text-white lg:px-8 lg:py-2">
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          className="flex items-center gap-x-2 mr-4 cursor-pointer py-1"
        >
          <img src="./logo.jpeg" alt="logo" className="w-14 h-14 rounded-full" />
          <h1 className="text-2xl font-bold">GoFood</h1>
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="hidden lg:flex items-center gap-x-1">
            {token ? (
              <div className="flex items-center gap-x-1 -ml-6">
                <Badge content={cart.length} withBorder className="py-0.5">
                  <Button
                    variant="text"
                    size="sm"
                    className="text-white hover:text-gray-400 text-base"
                    onClick={() => setOpenCartModal(true)}
                  >
                    <span>My Cart</span>
                  </Button>
                </Badge>
                <Button
                  variant="text"
                  size="sm"
                  className="text-base"
                  onClick={() => setOpenModal(true)}
                >
                  <span className="text-deep-orange-500 text-base hover:text-deep-orange-300">
                    Logout
                  </span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-x-1">
                <Link to="/login">
                  <Button
                    variant="text"
                    size="sm"
                    className="text-white hover:text-gray-400 text-base"
                  >
                    <span>Log In</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-base"
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
      <hr className="border border-gray-500 border-b" />
      {/* My Cart Modal */}
      <MyCartModal open={openCartModal} setOpen={setOpenCartModal} />
      {/* Logout Modal */}
      <Dialog
        open={openModal}
        handler={setOpenModal}
        size="sm"
        className="bg-white text-black"
      >
        <div className="flex justify-center">
          <Typography variant="h3" color="black pt-8  font-bold ">
            Logout
          </Typography>
        </div>
        <div className="flex justify-center py-2">
          <Typography variant="body" color="gray">
            Are you sure you would like to logout of your account?
          </Typography>
        </div>
        <div className="flex justify-center gap-4 pb-4">
          <Button
            variant="text"
            color="gray"
            onClick={() => setOpenModal(false)}
            className="hover:bg-gray-900 duration-200 bg-black text-white"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              localStorage.removeItem("token");
              setOpenModal(false);
              window.location.reload();
            }}
            className="bg-red-500 hover:bg-red-600"
          >
            <span>Logout</span>
          </Button>
        </div>
      </Dialog>
    </MaterialNavbar>
  );
};

export default NavbarE;
