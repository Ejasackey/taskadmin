# Environment

- **OS**: Alpine Linux v3.24 (Linux x86_64)
- **Package manager**: `apk` (apk-tools 3.0.6-r0)

# Conventions

- **Commit messages**: Use [Conventional Commits](https://www.conventionalcommits.org/) format (e.g., `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`)

# Web Server

- **Server**: darkhttpd (installed via `apk add darkhttpd`)
- **Start**: Run `./start.sh` from the project root
- **Port**: 8080
- **URL**: http://localhost:8080
- **Logs**: /tmp/darkhttpd.log
- **Serve directory**: /home/taskadmin

# Testing

- **Framework**: Playwright
- **Run tests**: `npm test`
- **Test files**: `tests/*.spec.ts`
