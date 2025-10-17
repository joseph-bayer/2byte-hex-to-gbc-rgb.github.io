"use client";

import { Button } from "@/components/ui/button";
import { Github, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface GitHubLinkProps {
  username: string;
  repository: string;
  className?: string;
}

export function GitHubLink({
  username,
  repository,
  className,
}: GitHubLinkProps) {
  const [starCount, setStarCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const githubUrl = `https://github.com/${username}/${repository}`;

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repository}`
        );
        if (response.ok) {
          const data = await response.json();
          setStarCount(data.stargazers_count);
        }
      } catch (error) {
        console.error("Failed to fetch star count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStarCount();
  }, [username, repository]);

  const formatStarCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Button
      variant="outline"
      size="default"
      asChild
      className={`${className} px-3 gap-2`}
      title={`View source code on GitHub${
        starCount !== null ? ` (${starCount} stars)` : ""
      }`}
    >
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        <Github className="h-4 w-4" />
        {!isLoading && starCount !== null && (
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span className="text-sm font-medium">
              {formatStarCount(starCount)}
            </span>
          </div>
        )}
        <span className="sr-only">
          View source on GitHub
          {starCount !== null ? ` (${starCount} stars)` : ""}
        </span>
      </a>
    </Button>
  );
}
