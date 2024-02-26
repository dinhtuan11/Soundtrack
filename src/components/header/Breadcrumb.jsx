import { AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { empty } from "src/utils/Helper";

const Breadcrumb = () => {
  const {breadcrumb} = useSelector((state) => state.settings);
  if(empty(breadcrumb)) return <></>;
  const length = breadcrumb.length;
    return (
        <div className={`flex items-center gap-3 text-sm mobile-lg:hidden`}>
        {breadcrumb.map((item, index)=>(
            <div className="flex items-center gap-3 tablet-sm:text-xs" key={index}>
                <NavLink to={item.url}>{item.title}</NavLink>
                {length > index + 1 && (
                    <AiOutlineRight />
                )}
            </div>
        ))}
      </div>
    );
};

export default Breadcrumb;