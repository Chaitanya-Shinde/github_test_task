export type UserRepo = {
    name: string;
    description: string | null;
    language: string | null;
    html_url: string;
  };

  
  export async function getUserRepos(username: string): Promise<UserRepo[]> {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`,{
        headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
    });
    if (res.status === 404) throw new Error("User not found");
    if (!res.ok) throw new Error("Failed to fetch user repositories");
  
    const data = await res.json();
  
    return data.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      html_url: repo.html_url,
    }));
  }
  