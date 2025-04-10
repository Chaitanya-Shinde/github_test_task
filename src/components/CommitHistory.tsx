import { getUserEvents } from "@/api/getUserEvents";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { isScreenMeduim } from "./isScreenMeduim";

type DailyCommit = {
  date: string;
  count: number;
};

export function CommitHistory({ username }: { username: string }) {
  const isMedium = isScreenMeduim(); // 🟢 Check screen width
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);
  oneMonthAgo.setDate(today.getDate()); // ensures proper alignment (e.g., April 10 to March 10)


  const dateMap: Record<string, number> = {};
  const [events, setEvents] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getUserEvents(username || "Chaitanya-Shinde");

        setEvents(data);
      } catch (err) {
        setError("Failed to load user profile");
      }
    }
    fetchEvents();
  }, [username]);

  if (error) return <p className="text-red-500">{error}</p>;

  events.forEach((timestamp) => {
    const dateOnly = new Date(timestamp).toISOString().split("T")[0];
    const commitDate = new Date(dateOnly);

    if (commitDate >= oneMonthAgo && commitDate <= today) {
      dateMap[dateOnly] = (dateMap[dateOnly] || 0) + 1;
    }
  });

  const dailyData: DailyCommit[] = [];
  const dateCursor = new Date(oneMonthAgo);

  while (dateCursor <= today) {
    const key = dateCursor.toISOString().split("T")[0];
    dailyData.push({
      date: key,
      count: dateMap[key] || 0,
    });
    dateCursor.setDate(dateCursor.getDate() + 1);
  }

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-bold">Daily Commit History (Last 30 Days)</h2>
      <ResponsiveContainer width="100%" height="95%" className='-translate-x-10 '>
        <BarChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            angle={-45}
            textAnchor="end"
            height={isMedium ? 60 : 0}
            interval={isMedium ? 0 : "preserveEnd"}
            tick={isMedium}
            tickFormatter={(dateStr) =>
              isMedium ? `${new Date(dateStr).getDate()}/${new Date(dateStr).getMonth() + 1}` : ""
            }
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#111111" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
