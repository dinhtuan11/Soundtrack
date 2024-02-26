import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

export function ButtonRounded({ bgColor='', children, outline = 'outlined', size= 'md', onClick }) {
  return (
      <Button
        onClick={onClick}
        variant={`${outline}`}
        size={size}
        className={`rounded-full border-white ${bgColor} flex items-center gap-2 text-white `}
      >
        {children}
      </Button>
  );
}
ButtonRounded.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
  outline: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  onClick: PropTypes.func
};
