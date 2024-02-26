import { BsHeadphones } from "react-icons/bs"
import PropTypes from "prop-types";

const Listens = ({number}) => {
  if(!number) return null;
  return ( 
    <div className="flex items-center gap-2">
        <BsHeadphones/>
        <span>{number}</span>
    </div>
  )
}
Listens.propTypes = {
    number: PropTypes.number,
}
export default Listens