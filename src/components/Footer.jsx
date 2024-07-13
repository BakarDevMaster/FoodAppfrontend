// eslint-disable-next-line no-unused-vars
import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center bg-black shadow-md w-full p-6 gap-y-6 gap-x-12 border-t border-gray-700 text-center md:justify-between">
      <Typography color="white" className="font-normal">
        &copy; 2023 GoFood
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="white"
            className="font-normal transition-colors hover:text-gray-400 focus:text-gray-400"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="white"
            className="font-normal transition-colors hover:text-gray-400 focus:text-gray-400"
          >
            License
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="white"
            className="font-normal transition-colors hover:text-gray-400 focus:text-gray-400"
          >
            Contribute
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="white"
            className="font-normal transition-colors hover:text-gray-400 focus:text-gray-400"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
