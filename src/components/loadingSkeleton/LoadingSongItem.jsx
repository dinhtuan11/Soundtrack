const LoadingSongItem = () => {
    const data = new Array(10).fill(0);
    return (
        <div className="p-3">
            {data.map((_, index) => (
                <div className="w-full flex justify-between bg-white h-[70px]" key={index}>
                    <div className="flex items-center justify-between py-2">
                        <p className="skeleton w-10 h-8 rounded-md"></p>
                        <div className="relative flex items-center justify-start gap-2 pl-2 xl:pl-12">
                            <div className="w-14 h-14 rounded-xl skeleton"></div>
                            <p className="skeleton w-52 mobile-md:w-36 h-8 rounded-md"></p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-10">
                        <div className="skeleton tablet-sm:hidden w-16 h-8 flex gap-3 items-center rounded-md"></div>
                        <div className="skeleton tablet-sm:hidden w-24 h-8 items-center gap-3 px-5 flex rounded-md"></div>
                        <div className="skeleton mobile-lg:hidden w-12 h-8 flex gap-3 items-center rounded-md"></div>
                        <div className="skeleton  w-12 h-8 flex justify-end rounded-md"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingSongItem;