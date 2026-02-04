---
title: "Free Cloud Hosting with Oracle Cloud"
description: "How I use Oracle Cloud's generous free tier to host Pterodactyl Panel, Docker services, and more."
pubDate: 2026-02-01
tags: ["cloud", "docker"]
draft: false
---

# Free Cloud Hosting with Oracle Cloud

Not everything in my infrastructure runs locally. Some services need to be publicly accessible or require more resources than my Raspberry Pi can provide. That's where Oracle Cloud's free tier comes in.

## Why Oracle Cloud?

Oracle's Always Free tier is genuinely generous:

- **4 vCPU + 24 GB RAM** (Ampere A1 ARM instances)
- **200 GB block storage**
- **Public IPv4 + IPv6**
- **No time limit** — It's actually free forever, not a trial

This is enough to run real workloads, not just toy projects.

## What I Host

On my Oracle Cloud instance, I run:

### Pterodactyl Panel
A game server management panel for hosting and managing Minecraft servers. It provides a web interface for server administration without needing SSH access for routine tasks.

### Supporting Services
- **MariaDB** — Database for Pterodactyl
- **Redis** — Caching layer
- **Wings Daemon** — Pterodactyl's server management daemon (runs in Docker)

### Other Docker Services
- **Uptime Kuma** — Self-hosted monitoring for all my services
- **Portainer** — Visual Docker management

### Traefik Reverse Proxy
All services sit behind Traefik, which handles:
- Routing requests to the correct container
- Automatic SSL certificates via Let's Encrypt
- Basic security headers

## Initial Setup

### Creating the Instance

1. Sign up for Oracle Cloud (requires a credit card but won't be charged for free tier)
2. Create an Ampere A1 instance with Ubuntu 22.04
3. Configure security lists to allow HTTP/HTTPS traffic
4. Set up SSH access

### Basic Hardening

Before deploying services, I secured the instance:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Set up UFW firewall
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable

# Install fail2ban for brute force protection
sudo apt install fail2ban
```

### Docker Setup

Docker makes deploying services reproducible and isolated:

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Docker Compose
sudo apt install docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
```

## DNS and HTTPS

I use Cloudflare to manage DNS:
- A records point to Oracle's public IP
- Orange cloud (proxy) enabled for DDoS protection and HTTPS

Traefik automatically obtains Let's Encrypt certificates, so all services get proper HTTPS.

## Lessons Learned

### ARM Architecture
Oracle's free instances use ARM (aarch64), not x86. Most Docker images support ARM now, but occasionally you'll need to find ARM-compatible alternatives or build your own images.

### Instance Stability
Oracle occasionally reclaims resources from idle instances. I run a lightweight cron job to keep the instance active, and all services are configured to restart automatically.

### Network Considerations
Free tier instances have limited network throughput. For my use case (game servers and dashboards), it's plenty. But if you're planning to serve lots of traffic, keep this in mind.

## Cost

Total monthly cost: **£0**

Seriously. I've been running this setup for months without spending anything. The free tier covers everything I need.

## Conclusion

Oracle Cloud's free tier is an incredible resource for learning and hosting real services. Combined with Docker and Cloudflare, you can run a professional setup without any hosting costs.

If you're looking to expand beyond your home lab or need publicly accessible services, I highly recommend exploring Oracle Cloud's free tier.
