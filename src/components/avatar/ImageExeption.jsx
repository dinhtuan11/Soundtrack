import PropTypes from "prop-types";
import logo from "src/assets/images/logo.png";

export function ImageExeption({ classname, src, srcError = logo }) {
  return (
    <div className={`w-12 h-12 tablet-sm:h-10 tablet-sm:w-10 rounded-full overflow-hidden ${classname}`}>
      <img
        src={src}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; 
          currentTarget.src = srcError;
        }}
        className="object-cover"
      />
    </div>
  );
}

ImageExeption.propTypes = {
  classname: PropTypes.string, 
  src: PropTypes.string,
  srcError: PropTypes.string,  
};
