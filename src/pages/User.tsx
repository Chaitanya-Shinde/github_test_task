import {useParams } from 'react-router-dom'
import { Separator } from "@/components/ui/separator"
import { TopLanguagesCard } from '@/components/LanguagesCard';
import UserRepositories from '@/components/RepoList';
import UserProfileCard from '@/components/UserProfileCard';
import { CommitHistory } from '@/components/CommitHistory';
import { useEffect, useState } from 'react';
import { getUserRepos } from '@/api/getUserRepos';




function User() {
    const { username } = useParams();
    const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function checkUser() {
      setError(null);
      setLoaded(false);
      try {
        // You can check using either repos or events API
        await getUserRepos(username || "Chaitanya-Shinde"); 
        setLoaded(true);
      } catch (err: any) {
        setError(err.message);
      }
    }

    checkUser();
  }, [username]);

  if (error === "User not found") {
    return (
      <div className="w-full p-6">
        <h2 className="text-xl font-bold mb-2">GitHub User</h2>
        <p className="text-red-500">User not found.</p>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="w-full p-6">
        <p>Loading user data...</p>
      </div>
    );
  }
    return (
        <div className="w-screen h-screen mx-auto flex flex-col justify-center items-center">
            <div className="w-full sm:w-2xl md:w-3xl lg:w-5xl xl:w-7xl h-full flex flex-col justify-start items-start p-6 space-y-6 pb-30 bg-[#f9f9f9] overflow-auto" style={{scrollbarWidth:'none'}}>
                <div className=' ml-1 w-full' >
                    <UserProfileCard username={username || 'Chaitanya-Shinde'}/>
                    <Separator className=' border-1 my-1'/>
                    <TopLanguagesCard username={username || 'Chaitanya-Shinde'}/>
                    <Separator className=' border-1 my-1'/>
                    <div className=' w-full h-[300px] mb-4'>
                        <CommitHistory username={username || 'Chaitanya-Shinde'}/>
                    </div>
                    
                    <Separator className=' border-1 my-1'/>
                    <h2 className=' text-lg font-semibold my-2' >User's Repositories:</h2>
                    <div className=' w-full h-[400px] overflow-auto my-4' style={{scrollbarWidth: 'none'}}>
                        {username && <UserRepositories username={username} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User