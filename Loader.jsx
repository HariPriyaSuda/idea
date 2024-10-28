import "../style/Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-circle"></div> {/* Changed class name for better semantics */}
      <div className="loader-text">Loading...</div> {/* Added text for better user experience */}
    </div>
  );
};

export default Loader;
