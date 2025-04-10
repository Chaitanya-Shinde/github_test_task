import { useEffect, useState } from 'react';
import { getUserRepos, UserRepo } from '@/api/getUserRepos';

type Props = {
  username: string;
};

export default function UserRepositories({ username }: Props) {
  const [repos, setRepos] = useState<UserRepo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await getUserRepos(username);
        setRepos(data);
      } catch (err) {
        setError('Failed to fetch repositories');
        console.error(err);
      }
    };

    fetchRepos();
  }, [username]);

  return (
    <div id="repositories" className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {repos.map((repo, index) => (
        <div
          key={index}
          id="repoTitle"
          className="border p-4 rounded-xl"
        >
          <a
            id="repoLink"
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="cursor-pointer text-[#111111] text-lg hover:underline">
              {repo.name}
            </p>
          </a>
          <p
            id="repoDescription"
            className="text-sm text-muted-foreground"
          >
            {repo.description || 'No description provided.'}
          </p>
        </div>
      ))}
    </div>
  );
}
