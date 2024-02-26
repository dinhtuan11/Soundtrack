const LoadingPopularRelease = () => {
  const data = new Array(10).fill(0);
  return (
    <>
      {data.map((_, index) => (
        <div
          className="skeleton w-[250px] h-[250px] rounded-xl"
          key={index}
        ></div>
      ))}
    </>
  );
};

export default LoadingPopularRelease;