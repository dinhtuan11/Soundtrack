const LoadingSlide = () => {
    return (
        <div className="flex justify-between px-20 mobile-lg:px-10 w-full">
            <div className="flex flex-col gap-y-4">
                <h1 className="skeleton w-32 h-11 rounded-md"></h1>
                <h2 className="skeleton w-52 h-11 rounded-md"></h2>
                <p className="skeleton w-48 h-11 rounded-md"></p>
                <div className="flex gap-3">
                    <div className="skeleton w-24 h-10 rounded-xl"></div>
                    <div className="skeleton w-24 h-10 rounded-xl"></div>
                </div>
            </div>
            <div className="skeleton w-72 h-56 tablet:w-48 tablet:h-48 mt-5 mobile-lg:hidden rounded-md"></div>
        </div>
    );
};

export default LoadingSlide;