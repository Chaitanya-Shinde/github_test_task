// components/RepoList.tsx
type Repo = {
    name: string;
    html_url: string;
    description: string;
  };
  
  type Props = {
    repos: Repo[];
  };
  
  export const RepoList = ({ repos }: Props) => {
    return (
      <div className="grid gap-4">
        {repos.map((repo) => (
          <div key={repo.name} className="border p-4 rounded-xl shadow-sm">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold">
              {repo.name}
            </a>
            <p className="text-sm text-muted-foreground">{repo.description}</p>
          </div>
        ))}
      </div>
    );
  };
  