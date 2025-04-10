import { useEffect, useState } from 'react';
import { getUserProfile } from '@/api/getUserProfile';
import avatar from '../assets/avatar.svg'
import { Card, CardContent, CardTitle } from './ui/card';

type UserProfile = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
};

export default function UserProfileCard({ username }: { username: string }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile(username);
        setUser(data);
      } catch (err) {
        setError('Failed to load user profile');
      }
    }

    fetchProfile();
  }, [username]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading...</p>;
  return (
    <div className="flex flex-col items-start">
      <img
        className="w-[150px] mb-3 rounded-[50%]"
        src={user.avatar_url || avatar}
        alt={user.name || user.login}
      />
      <p className="font-semibold text-2xl">{user.name || user.login}</p>
      <p className="font-normal text-md text-muted-foreground">
        {user.bio || 'No bio available.'}
      </p>
    </div>
  );
}
