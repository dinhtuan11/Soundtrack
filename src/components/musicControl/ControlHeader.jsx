import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

function ControlHeader({itemPlay}) {
  return (
      <div className="mobile-lg:flex justify-center items-center gap-2 hidden">
        <Typography className="font-bold">
          {itemPlay?.song_name??""}
        </Typography>
        <span>({itemPlay?.artists_name})</span>
      </div>
  );
}

ControlHeader.propTypes = {
    itemPlay: PropTypes.shape({
        song_name: PropTypes.string,
        artists_name: PropTypes.string
    })
};

export default ControlHeader;
