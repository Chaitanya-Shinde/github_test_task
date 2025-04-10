import { UsernameInput } from "../components/UsernameInput";
import { useNavigate } from "react-router-dom";
import hero from '../assets/file-search.svg'

function Home() {
  const navigate = useNavigate();
  const handleSubmit = (username: string) => {
    if (username.trim()) {
      navigate(`/user/${username}`);
    }
  };
   
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="w-full sm:w-xl md:w-3xl lg:w-7xl h-full flex flex-col justify-center items-center p-6 space-y-6 pb-30 bg-[#f9f9f9]">
          <img className=" w-[200px] h-auto relative z-10" src={hero} alt="#" />
          <p className=" font-bold text-4xl " >Analyze any github user</p>
          <UsernameInput onSubmit={handleSubmit} />
          <p className=" font-bold text-lg " >Enter anyone's Github username and get detailed information about them!</p>
          
        </div>
      </div>
    );
}

export default Home