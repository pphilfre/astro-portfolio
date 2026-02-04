---
title: "Zero Trust Access with Twingate"
description: "Implementing zero-trust network access for private resources using Twingate alongside Tailscale and Pi-hole."
pubDate: 2026-01-22
tags: ["cybersecurity", "networking"]
draft: false
---

# Zero Trust Access with Twingate

After setting up Tailscale for general remote access, I wanted to explore a different approach: zero-trust network access. Twingate provides this, and it complements my existing setup nicely.

## What is Zero Trust?

The traditional security model is "castle and moat"—once you're inside the network, you're trusted. Zero trust flips this: **never trust, always verify**. Every access request is authenticated and authorised, regardless of where it comes from.

This is increasingly how enterprises approach security, and I wanted hands-on experience with the concept.

## Why Twingate?

Twingate provides secure remote access without a traditional VPN:

- **Zero trust architecture** — Resources are only accessible after device and user authentication
- **No port forwarding** — My Pi stays hidden from the public internet
- **Split tunnelling** — Only private traffic goes through Twingate; everything else stays local
- **Fine-grained access control** — I can specify exactly who can access what

## My Setup

I run Twingate on my Raspberry Pi 3 alongside Pi-hole and Tailscale. Each serves a different purpose:

| Service | Purpose |
|---------|---------|
| **Pi-hole** | DNS filtering and ad blocking |
| **Tailscale** | Full mesh VPN for device connectivity |
| **Twingate** | Zero-trust access to specific applications |

### Deploying the Connector

Twingate uses a "connector" that runs inside your network. I deployed it using Docker:

```bash
docker run -d \
  --restart unless-stopped \
  --name twingate-connector \
  --network host \
  -e TWINGATE_NETWORK="your-network" \
  -e TWINGATE_ACCESS_TOKEN="your-access-token" \
  -e TWINGATE_REFRESH_TOKEN="your-refresh-token" \
  -e TWINGATE_LABEL="raspberrypi" \
  twingate/connector:latest
```

### Defining Resources

In Twingate's admin console, I defined the private resources I want to access:

- Internal dashboards (Pi-hole admin, router config)
- Development servers
- Local web apps I'm testing

Each resource can have specific access policies—who can access it, from which devices, under what conditions.

### Client Setup

On my iPhone and laptop, I installed the Twingate client and logged in. Now I can access defined resources from anywhere, and the connection is authenticated every time.

## How It Differs from Tailscale

You might wonder: why use both Tailscale and Twingate?

**Tailscale** gives me a mesh network—all my devices can talk to each other directly. It's like extending my LAN across the internet. Great for SSH access, file sharing, and general connectivity.

**Twingate** is more restrictive by design. It's about accessing specific resources with explicit permissions. I use it for services where I want extra assurance that access is controlled.

In practice:
- I use Tailscale for everyday remote access
- I use Twingate when I want to test zero-trust patterns or access sensitive admin panels

## Lessons Learned

### Zero Trust Requires Planning
You need to think carefully about what resources exist and who should access them. This planning exercise itself was valuable—it forced me to inventory my services.

### The UX is Different
With a traditional VPN, you "connect" and then have full access. With zero trust, you access specific resources as needed. It's more seamless in some ways, more restrictive in others.

### Defense in Depth
Running multiple access solutions isn't redundant—it's defense in depth. If one solution has a vulnerability, the other provides a fallback.

## Conclusion

Zero trust is the direction enterprise security is moving. Having hands-on experience with tools like Twingate gives me practical understanding of these concepts, not just theoretical knowledge.

If you're already running Tailscale or a traditional VPN, consider experimenting with zero-trust access. Twingate's free tier is enough for personal use, and the learning experience is valuable.
