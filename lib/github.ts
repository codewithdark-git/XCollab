import { Octokit } from "@octokit/rest"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function getMembers() {
  const { data: members } = await octokit.orgs.listMembers({
    org: "xcollab",
    per_page: 100,
  })

  const { data: admins } = await octokit.orgs.listMembers({
    org: "xcollab",
    role: "admin",
    per_page: 100,
  })

  const adminIds = new Set(admins.map((admin) => admin.id))

  return Promise.all(
    members.map(async (member) => {
      const { data: user } = await octokit.users.getByUsername({ username: member.login })

      return {
        id: user.id,
        login: user.login,
        name: user.name || user.login,
        avatar: user.avatar_url,
        bio: user.bio || "",
        url: user.html_url,
        isAdmin: adminIds.has(user.id),
        contributions: user.public_repos, // Using public repos count as a proxy for contributions
        location: user.location || "",
        company: user.company || "",
        publicRepos: user.public_repos,
        followers: user.followers,
      }
    }),
  )
}

export async function getProjects() {
  const { data } = await octokit.repos.listForOrg({
    org: "xcollab",
    sort: "stars",
    direction: "desc",
    per_page: 100,
  })

  return Promise.all(
    data.map(async (repo) => {
      const { data: languages } = await octokit.repos.listLanguages({
        owner: "xcollab",
        repo: repo.name,
      })

      return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        language: repo.language,
        languages: Object.keys(languages),
        updatedAt: repo.updated_at,
      }
    }),
  )
}

