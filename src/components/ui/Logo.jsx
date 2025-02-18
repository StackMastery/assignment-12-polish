import { Link } from "react-router-dom";

const Logo = ({ className, textClass, ...props }) => {
  return (
    <>
      <Link to={"/"} className={`flex items-center gap-2 ${className}`}>
        <div className="loading">
          <svg className="scale-75" width="64px" height="48px">
            <polyline
              points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
              id="back"
            ></polyline>
            <polyline
              points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
              id="front"
            ></polyline>
          </svg>
        </div>
        <p className={`text-2xl font-bold hidden sm:block ${textClass}`}>
          Red. Bank
        </p>
      </Link>
    </>
  );
};

export default Logo;
