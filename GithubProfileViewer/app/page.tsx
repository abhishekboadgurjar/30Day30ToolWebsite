'use client';

import { useState, useEffect } from 'react';
import { Search, Github, MapPin, Link as LinkIcon, Twitter, Users, GitFork, Star, ExternalLink, Moon, Sun, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  twitter_username: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  topics: string[];
}

export default function GitHubProfileViewer() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('github-viewer-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('github-viewer-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('github-viewer-theme', 'dark');
    }
  };

  // Fetch user data
  const fetchUserData = async (searchUsername: string) => {
    if (!searchUsername.trim()) {
      toast({
        title: "Error",
        description: "Please enter a GitHub username",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError('');
    setUser(null);
    setRepos([]);

    try {
      // Fetch user profile
      const userResponse = await fetch(`https://api.github.com/users/${searchUsername}`);
      
      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error('User not found');
        } else if (userResponse.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error('Failed to fetch user data');
        }
      }

      const userData: GitHubUser = await userResponse.json();
      setUser(userData);

      // Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${searchUsername}/repos?sort=updated&per_page=12`);
      
      if (reposResponse.ok) {
        const reposData: GitHubRepo[] = await reposResponse.json();
        // Sort by stars descending
        const sortedRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sortedRepos);
      }

      toast({
        title: "Success",
        description: `Loaded profile for ${userData.name || userData.login}`,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserData(username);
  };

  // Format number with K/M suffix
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get language color
  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      C: '#555555',
      'C#': '#239120',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      HTML: '#e34c26',
      CSS: '#1572B6',
      Vue: '#4FC08D',
      React: '#61DAFB',
    };
    return colors[language] || '#8b949e';
  };

  return (
    <>
      <Head>
        <title>GitHub Profile Viewer – Explore GitHub Stats by Username</title>
        <meta name="description" content="A powerful GitHub profile viewer to explore public user data, repositories, and contributions using the GitHub API." />
        <meta name="keywords" content="GitHub profile viewer, GitHub stats, GitHub username search, GitHub repositories viewer, GitHub API tools, developer tools, open source" />
        <meta name="author" content="BOAD Technologies" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="GitHub Profile Viewer – Explore GitHub Stats by Username" />
        <meta property="og:description" content="A powerful GitHub profile viewer to explore public user data, repositories, and contributions using the GitHub API." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://github-profile-viewer.vercel.app" />
        <meta property="og:image" content="https://github-profile-viewer.vercel.app/og-image.png" />
        <meta property="og:site_name" content="GitHub Profile Viewer" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GitHub Profile Viewer – Explore GitHub Stats by Username" />
        <meta name="twitter:description" content="A powerful GitHub profile viewer to explore public user data, repositories, and contributions using the GitHub API." />
        <meta name="twitter:image" content="https://github-profile-viewer.vercel.app/og-image.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "GitHub Profile Viewer",
              "description": "A powerful GitHub profile viewer to explore public user data, repositories, and contributions using the GitHub API.",
              "url": "https://github-profile-viewer.vercel.app",
              "applicationCategory": "DeveloperTool",
              "operatingSystem": "Web Browser",
              "author": {
                "@type": "Organization",
                "name": "BOAD Technologies"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://github-profile-viewer.vercel.app" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                GitHub Profile Viewer
              </h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore GitHub profiles, discover repositories, and analyze developer statistics with our powerful profile viewer.
            </p>
          </header>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-slate-700 dark:text-slate-200">
                  Search GitHub Profile
                </CardTitle>
                <CardDescription className="text-center">
                  Enter a GitHub username to explore their profile and repositories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Enter GitHub username..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                      disabled={loading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={toggleTheme}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="backdrop-blur-sm bg-red-50/70 dark:bg-red-900/20 border-red-200 dark:border-red-800 shadow-xl">
                <CardContent className="py-6 text-center">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
                    {error}
                  </h3>
                  <p className="text-red-600 dark:text-red-300">
                    Please check the username and try again
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* User Profile */}
          {user && (
            <div className="space-y-8">
              {/* Profile Header */}
              <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <Avatar className="w-32 h-32 mx-auto md:mx-0 ring-4 ring-blue-100 dark:ring-blue-900">
                      <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
                      <AvatarFallback className="text-2xl">
                        {(user.name || user.login).charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 text-center md:text-left space-y-4">
                      <div>
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                          {user.name || user.login}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                          @{user.login}
                        </p>
                      </div>
                      
                      {user.bio && (
                        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                          {user.bio}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-600 dark:text-slate-400">
                        {user.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                          </div>
                        )}
                        {user.blog && (
                          <a 
                            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <LinkIcon className="w-4 h-4" />
                            <span>{user.blog}</span>
                          </a>
                        )}
                        {user.twitter_username && (
                          <a 
                            href={`https://twitter.com/${user.twitter_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                            <span>@{user.twitter_username}</span>
                          </a>
                        )}
                      </div>
                      
                      <div className="flex gap-6 justify-center md:justify-start">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                            {formatNumber(user.followers)}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                            {formatNumber(user.following)}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Following</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                            {formatNumber(user.public_repos)}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Repositories</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 justify-center md:justify-start">
                        <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View on GitHub
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Repositories */}
              {repos.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">
                    Top Repositories
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {repos.map((repo) => (
                      <Card key={repo.id} className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              <a 
                                href={repo.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {repo.name}
                              </a>
                            </CardTitle>
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                          </div>
                          {repo.description && (
                            <CardDescription className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                              {repo.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            {repo.language && (
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                                />
                                <span className="text-slate-600 dark:text-slate-400">{repo.language}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                <span>{formatNumber(repo.stargazers_count)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="w-4 h-4" />
                                <span>{formatNumber(repo.forks_count)}</span>
                              </div>
                            </div>
                          </div>
                          
                          {repo.topics && repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {repo.topics.slice(0, 3).map((topic) => (
                                <Badge 
                                  key={topic} 
                                  variant="secondary" 
                                  className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                >
                                  {topic}
                                </Badge>
                              ))}
                              {repo.topics.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{repo.topics.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Updated {formatDate(repo.updated_at)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!user && !loading && !error && (
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-xl max-w-2xl mx-auto">
              <CardContent className="py-12 text-center">
                <Github className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  Ready to explore GitHub profiles?
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Enter a GitHub username above to get started and discover amazing repositories and developer insights.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Designed and Developed by{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  BOAD Technologies
                </span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Explore the world of open source development through GitHub profiles
              </p>
            </div>
          </div>
        </footer>

        <Toaster />
      </main>
    </>
  );
}