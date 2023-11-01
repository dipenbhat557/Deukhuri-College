const Subscription = () => {
  const handleSubscribe = () => {};
  return (
    <div className="flex flex-col w-[100%] h-[330px] sm:h-[300px] justify-center items-center mt-6 bg-gradient-to-b from-red-900 to-red-8 pt-4">
      <div className="flex flex-row w-[25%] items-center justify-center mt-2">
        <div className="w-[8%] h-[5px] border-b-4 border-red-400 mr-2 rounded-3xl flex-grow" />
        <p className="font-extrabold text-xl sm:text-2xl">SUBSCRIPTION</p>
        <div className="w-[8%] h-[5px] border-b-4 ml-2 border-red-400 rounded-3xl flex-grow" />
      </div>
      <p className="font-extrabold my-2 sm:my-3 text-[17px] sm:text-[20px]">
        Join our Newsletter
      </p>
      <p className="w-[25%] text-center font-bold text-[12px] md:text-[16px] md:leading-loose m-2">
        Subscribe to our Newsletter to get the latest news, updates delivered
        directly to your inbox.
      </p>
      <div className="my-2 mb-6 flex-wrap justify-center items-center flex flex-row">
        <input
          type="text"
          placeholder="Enter your mail address"
          className="p-2 px-10 rounded-xl"
        />
        <button
          onClick={handleSubscribe}
          className="bg-red-400 font-bold text-white hover:shadow-2xl mt-2 hover:bg-red-950 ml-3 p-2 px-4 rounded-2xl"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};
export default Subscription;
