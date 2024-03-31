import { Link } from "react-router-dom"

export const Home = () => {
    return (
      <>
        <div className="bg-[#313131] px-[25px] py-[30px] w-[420px] ml-[50%] mt-[100px] translate-x-[-50%] rounded-md flex flex-col">
          <div className="cursor-pointer text-center mb-[10px]">
            <Link to='/singin'>Sign an Account</Link>
          </div>
          <div className="cursor-pointer text-center">
            <Link to='/login'>Log an Account</Link>
          </div>
        </div>
      </>
    );
  };
