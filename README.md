# Express Docker Hub EC2 demo

An Express app that serves a JSON response on port 5000. The Dockerfile packages
the app with Node.js 24.

## Run locally

Install Node.js 24 and run:

```powershell
npm ci
npm start
```

Open [http://localhost:5000](http://localhost:5000). The root endpoint returns:

```json
{"message":"Express Server is running"}
```

For development, `npm run dev` restarts Node.js when source files change.

## Run with Docker

```powershell
docker build -t ec2-dockerhub-cicd-app .
docker run --name ec2-dockerhub-cicd-app -p 5000:5000 ec2-dockerhub-cicd-app
```

Open [http://localhost:5000](http://localhost:5000). Stop the container with
Ctrl+C, then remove it with `docker rm ec2-dockerhub-cicd-app`.

## GitHub Actions deployment

The [workflow](.github/workflows/deploy.yml) runs on pushes to `main`. It builds
the Docker image, pushes `latest` to Docker Hub, and attempts to connect over SSH
to an EC2 host to pull and run it. The workflow currently refers to these
repository secrets:

| Secret | Purpose |
| --- | --- |
| `DOCKER_HUB_USERNAME` | Docker Hub account and image namespace |
| `DOCKER_HUB_PASSWORD` | Docker Hub password or access token |
| `EC2_USER` | SSH user on the EC2 instance |
| `EC2_HOST` | Hostname or address of the EC2 instance |

**The workflow is not yet a complete SSH deployment:** it does not configure an
SSH private key and disables host-key verification. Configure secure key-based
authentication and a verified host key before relying on it. The EC2 instance
also needs Docker, access to the Docker Hub image, and a network path allowing
the GitHub-hosted runner to connect on SSH port 22. For local FLoCI, a
GitHub-hosted runner cannot reach the runner's `localhost`; use a self-hosted
runner with network access and adjust the SSH port if needed.

Do not commit private keys, credentials, or `.env` files. `.gitignore` and
`.dockerignore` exclude these from Git and Docker build contexts respectively;
they do not remove files that were already tracked or previously built into an
image.
