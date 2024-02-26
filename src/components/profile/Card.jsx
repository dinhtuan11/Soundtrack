import { Button } from "@material-tailwind/react";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";

const Card = ({name = "Obito"}) => {
  return (
      <div className="w-[230px] h-[320px] bg-[#F5F5F5] rounded-[15px]">
        <div className="h-48 px-[15px] py-3">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="w-full h-full object-cover rounded-[20px]"
          />
          <div className="flex relative -top-3 justify-around gap-3">
            <div className="flex items-center -space-x-4">
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className="w-[30px] h-[30px] object-cover rounded-full"
              />
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className="w-[30px] h-[30px] object-cover rounded-full"
              />
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className="w-[30px] h-[30px] object-cover rounded-full"
              />
            </div>
            <div className="custom-profile-icon bg-[#FFFBFB] border rounded-full w-[30px] h-[30px] flex justify-center items-center">
              <AiOutlineDelete size={20} color="black" />
            </div>
          </div>
          <div className="w-full mb-2">
            <span className="text-base font-normal w-full line-clamp-2">
              Đánh đổi , xuất phát điểm , đầu đường xó chợ , ....
            </span>
          </div>
          <Button className="bg-[#FF5E00] rounded-[20px] h-9 flex items-center justify-center">
            {name}
          </Button>
        </div>
      </div>
  );
}
Card.propTypes = {
    name: PropTypes.string
}
export default Card