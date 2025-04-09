import { useState } from "react";
import { UsernameInput } from "../components/UsernameInput";
import { RepoList } from "../components/RepoList";
import hero from '../assets/file-search.svg'

function Home() {
    const [repos, setRepos] = useState([]);
    const [chartData, setChartData] = useState<{ date: string; count: number }[]>([]);
    
    const fetchGitHubData = async (username: string) => {
      const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
      const repoData = await repoRes.json();
      setRepos(repoData);
  
      const now = new Date();
      const since = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();
  
      const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
      const events = await eventsRes.json();
  
      const commitEvents = events
        .filter((e: any) => e.type === "PushEvent")
        .flatMap((e: any) => e.payload.commits.map((c: any) => ({ date: e.created_at })));
  
      const dailyCount: Record<string, number> = {};
      commitEvents.forEach((c: { date: string }) => {
        const date: string = new Date(c.date).toISOString().split("T")[0];
        dailyCount[date] = (dailyCount[date] || 0) + 1;
      });
  
      const chart = Object.entries(dailyCount).map(([date, count]) => ({ date, count }));
      setChartData(chart);
    };
  
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="w-full sm:w-xl md:w-3xl lg:w-7xl h-full flex flex-col justify-center items-center p-6 space-y-6 pb-30 bg-[#f9f9f9]">
          <img className=" w-[200px] h-auto relative z-10" src={hero} alt="#" />
          <p className=" font-bold text-4xl " >Analyze any github user</p>
          <UsernameInput onSubmit={fetchGitHubData} />
          <p className=" font-bold text-lg " >Enter anyone's Github username and get detailed information about them!</p>
          {repos.length > 0 && <RepoList repos={repos} />}
        </div>
      </div>
    );
}

export default Home