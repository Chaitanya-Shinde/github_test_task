export type UserProfile = {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string | null;
    bio: string | null;
  };

  
  export async function getUserProfile(username: string): Promise<UserProfile> {
    const res = await fetch(`https://api.github.com/users/${username}`,{
        headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
    });
    if (res.status === 404) throw new Error("User not found");
    if (!res.ok) throw new Error("Failed to fetch user profile");
  
    const data = await res.json();
  
    return {
      login: data.login,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      name: data.name,
      bio: data.bio,
    };
  }
  