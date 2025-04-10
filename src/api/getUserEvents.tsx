export type EventDate = string;


export async function getUserEvents(username: string): Promise<EventDate[]> {
    const res = await fetch(`https://api.github.com/users/${username}/events/public`,{
        headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
    });
    if (res.status === 404) throw new Error("User not found");
    if (!res.ok) throw new Error("Failed to fetch user events");

    const data = await res.json();

    // Extract only the created_at dates
    return data.map((event: any) => event.created_at);
}
