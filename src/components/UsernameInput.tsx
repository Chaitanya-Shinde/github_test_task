// components/UsernameInput.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  onSubmit: (username: string) => void;
};

export const UsernameInput = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState("");

  return (
    <div className="flex gap-2 items-center w-auto">
      <Input
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={() => onSubmit(username)}>Search</Button>
    </div>
  );
};
