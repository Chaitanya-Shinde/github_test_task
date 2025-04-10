// components/TopLanguagesCard.tsx
import { JSX, useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TbBrandCSharp } from "react-icons/tb";
import {
  BiLogoTypescript,
  BiLogoJavascript,
  BiLogoPython,
  BiLogoJava,
  BiLogoCPlusPlus,
  BiLogoHtml5,
  BiLogoPhp,
} from "react-icons/bi";
import {
  SiGo,
  SiRuby,
  SiRust,
  SiSwift,
  SiKotlin,
  SiDart,
  SiShell,
  SiScala,
  SiPerl,
  SiElixir,
  SiHaskell,
  SiLua,
  SiC,
  SiJson,
  SiDocker,
  SiCss3 
} from "react-icons/si";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { getUserRepos, UserRepo } from "@/api/getUserRepos";

type Props = {
  username: string;
};

const languageIconMap: Record<string, JSX.Element> = {
  TypeScript: <BiLogoTypescript className="w-6 h-6" />,
  JavaScript: <BiLogoJavascript className="w-6 h-6" />,
  Python: <BiLogoPython className="w-6 h-6" />,
  Java: <BiLogoJava className="w-6 h-6" />,
  "C++": <BiLogoCPlusPlus className="w-6 h-6" />,
  "C#": <TbBrandCSharp className="w-6 h-6" />,
  C: <SiC className="w-6 h-6" />,
  Go: <SiGo className="w-6 h-6" />,
  Ruby: <SiRuby className="w-6 h-6" />,
  PHP: <BiLogoPhp className="w-6 h-6" />,
  Rust: <SiRust className="w-6 h-6" />,
  Swift: <SiSwift className="w-6 h-6" />,
  Kotlin: <SiKotlin className="w-6 h-6" />,
  Dart: <SiDart className="w-6 h-6" />,
  Shell: <SiShell className="w-6 h-6" />,
  Scala: <SiScala className="w-6 h-6" />,
  Perl: <SiPerl className="w-6 h-6" />,
  Elixir: <SiElixir className="w-6 h-6" />,
  Haskell: <SiHaskell className="w-6 h-6" />,
  Lua: <SiLua className="w-6 h-6" />,
  JSON: <SiJson className="w-6 h-6" />,
  HTML: <BiLogoHtml5 className="w-6 h-6" />,
  CSS: <SiCss3  className="w-5 h-5" />,
  Dockerfile: <SiDocker className="w-6 h-6" />,

};

export const TopLanguagesCard = ({ username }: Props) => {
  const [topLanguages, setTopLanguages] = useState<{ language: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      setLoading(true);
      const repos = await getUserRepos(username)
      const langs = await getTopLanguages(repos);
      setTopLanguages(langs);
      setLoading(false);
    };
    fetchLanguages();
  }, [username]);

  function getTopLanguages(repos: UserRepo[]): { language: string; count: number }[] {
    const langMap: Record<string, number> = {};
  
    repos.forEach((repo) => {
      const lang = repo.language;
      if (lang) {
        langMap[lang] = (langMap[lang] || 0) + 1;
      }
    });
  
    return Object.entries(langMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([language, count]) => ({ language, count }));
  }

  if (loading) {
    return (
      <Card className="w-full p-6">
        <CardTitle>Top Languages</CardTitle>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (!topLanguages.length) {
    return (
      <Card className="w-full p-6">
        <CardTitle>Top Languages</CardTitle>
        <CardContent>No language data available.</CardContent>
      </Card>
    );
  }

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold ">Top Languages</h2>
      <div id="languages" className="flex flex-col gap-0 mt-1">
        {loading ? (
          <p>Loading...</p>
        ) : topLanguages.length === 0 ? (
          <p>No language data found.</p>
        ) : (
          topLanguages.map(({ language }) => (
            <div key={language} className="flex items-center gap-1">
              {languageIconMap[language] || <AiOutlineQuestionCircle className="w-6 h-6" />}
              <p>{language}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
