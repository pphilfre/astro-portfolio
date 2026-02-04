---
title: "Building My Home Lab: A Platform for Learning"
description: "How I built and manage a comprehensive Linux-based home lab environment for hands-on cybersecurity and infrastructure learning."
pubDate: 2026-01-15
tags: ["home-lab", "linux", "docker"]
draft: false
---

# Building My Home Lab: A Platform for Learning

One of the most valuable investments I've made in my learning journey is building a home lab. It's become my primary platform for experimentation, breaking things, fixing them, and truly understanding how systems work.

## Why a Home Lab?

Reading documentation and watching tutorials only gets you so far. There's no substitute for hands-on experience—especially when things go wrong. A home lab gives you a safe environment to:

- Experiment with configurations without fear of breaking production systems
- Understand how different services interact
- Learn troubleshooting by actually troubleshooting
- Build a portfolio of real projects

## My Infrastructure

Over time, I've built out a comprehensive setup that includes:

### Docker Containers
The backbone of my lab runs on Docker. Containerisation makes it easy to spin up services, test configurations, and tear things down without affecting other parts of the system. I run everything from web servers to monitoring tools.

### VPN Configuration
Secure remote access is essential. I've configured VPN solutions that let me access my home network from anywhere—whether I'm at school or travelling. This was one of my first "real" projects and taught me a lot about networking and encryption.

### DNS Server
Running my own DNS server (Pi-hole) gives me:
- Network-wide ad blocking
- Custom local DNS records for my services
- Faster resolution for internal hostnames
- Better privacy by avoiding third-party DNS providers

### Reverse Proxy with SSL
Using Nginx and Traefik, I've set up reverse proxies that route traffic to different services and handle SSL termination. This means all my internal services get proper HTTPS certificates.

### Cloud-Hosted VPS
Not everything runs locally. I have cloud instances on Oracle Cloud's free tier for services that need to be publicly accessible or require more resources than my local hardware can provide.

## Lessons Learned

Building this lab has taught me more than any course could:

1. **Documentation matters** — I've learned to document everything. Future me will thank present me.
2. **Backups are non-negotiable** — I learned this the hard way after a corrupted SD card took out my Pi.
3. **Start simple, iterate** — My first setup was basic. Each iteration added complexity as I understood more.
4. **Troubleshooting is a skill** — When something breaks at 2am, you learn to read logs properly.

## What's Next?

I'm constantly evolving the lab. Current projects on my list include:
- Setting up a proper monitoring stack with Prometheus and Grafana
- Experimenting with Kubernetes (k3s) for container orchestration
- Building out more security tooling for practice

If you're considering building your own home lab, my advice is simple: just start. You don't need expensive hardware—a Raspberry Pi or an old laptop is enough to begin. The learning comes from doing.
