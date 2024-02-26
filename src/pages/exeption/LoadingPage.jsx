import { Spinner } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const LoadingPage = () => {
    const {isLoading} = useSelector((state) => state.auth);

    return (
        <div className= {`${isLoading ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center bg-white`}>
            <Spinner color="amber" className="w-12 h-12"/>
        </div>
    );
};

export default LoadingPage;