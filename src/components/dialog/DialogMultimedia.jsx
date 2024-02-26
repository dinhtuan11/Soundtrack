import {
  Dialog,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

const DialogMultimedia = ({ size='xs', isOpen, setOpen, titleHeading, children, sizeTitle="h5" }) => {
  return (
    <>
      <Dialog size={size} open={isOpen} className="rounded-2xl overflow-hidden">
        <DialogHeader className="flex justify-between">
          <Typography variant={sizeTitle}>{titleHeading}</Typography>
            <button onClick={()=>setOpen(pre=>!pre)} className="hover:text-primary transition-all"><IoClose size={30}/></button>
        </DialogHeader>
          {children}
      </Dialog>
    </>
  );
};
DialogMultimedia.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  titleHeading: PropTypes.any.isRequired,
  children: PropTypes.node,
  sizeTitle: PropTypes.string,
  size: PropTypes.string
};
export default DialogMultimedia;
