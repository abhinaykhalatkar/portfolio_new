import { useEffect, useState } from "react";

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
};

export type RepoLoadState =
  | { status: "idle" | "loading"; repos: GithubRepo[] }
  | { status: "success"; repos: GithubRepo[] }
  | { status: "error"; repos: GithubRepo[]; message: string };

type RepoCacheEntry =
  | { status: "success"; repos: GithubRepo[] }
  | { status: "error"; message: string };

const repoCache = new Map<string, RepoCacheEntry>();
const inflightRequests = new Map<string, Promise<GithubRepo[]>>();

export function getGithubUsername(): string {
  const configured = import.meta.env.VITE_GITHUB_USERNAME;
  return typeof configured === "string" && configured.trim().length > 0
    ? configured.trim()
    : "abhinaykhalatkar";
}

async function fetchPublicRepos(username: string): Promise<GithubRepo[]> {
  const url = `https://api.github.com/users/${encodeURIComponent(
    username
  )}/repos?per_page=100&sort=updated`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Unexpected GitHub API response");
  }

  return (data as GithubRepo[])
    .filter((repo) => !repo.private)
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

function getCachedState(username: string): RepoLoadState {
  const cached = repoCache.get(username);
  if (!cached) {
    return { status: "idle", repos: [] };
  }

  if (cached.status === "success") {
    return { status: "success", repos: cached.repos };
  }

  return { status: "error", repos: [], message: cached.message };
}

export function useGithubRepos(username: string): RepoLoadState {
  const [state, setState] = useState<RepoLoadState>(() => getCachedState(username));

  useEffect(() => {
    const cached = repoCache.get(username);
    if (cached) {
      if (cached.status === "success") {
        setState({ status: "success", repos: cached.repos });
      } else {
        setState({ status: "error", repos: [], message: cached.message });
      }
      return;
    }

    setState((previous) => {
      if (previous.status === "loading") {
        return previous;
      }
      return {
        status: "loading",
        repos: previous.repos,
      };
    });

    let promise = inflightRequests.get(username);
    if (!promise) {
      promise = fetchPublicRepos(username);
      inflightRequests.set(username, promise);
    }

    let isMounted = true;
    promise
      .then((repos) => {
        repoCache.set(username, { status: "success", repos });
        if (!isMounted) return;
        setState({ status: "success", repos });
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Failed to load repos";
        repoCache.set(username, { status: "error", message });
        if (!isMounted) return;
        setState({ status: "error", repos: [], message });
      })
      .finally(() => {
        if (inflightRequests.get(username) === promise) {
          inflightRequests.delete(username);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  return state;
}
