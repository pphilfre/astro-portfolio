---
title: "Setting Up Tailscale for Secure Remote Access"
description: "A guide to configuring Tailscale VPN on a Raspberry Pi for secure access to your home network from anywhere."
pubDate: 2026-01-08
tags: ["networking", "vpn"]
draft: false
---

# Setting Up Tailscale for Secure Remote Access

One of the first networking projects in my home lab was setting up secure remote access. I wanted to connect to my local devices from anywhere—school, travelling, wherever—as if I was on my home network. Tailscale made this surprisingly easy.

## Why Tailscale?

Traditional VPNs can be complex to set up and maintain. You need to deal with port forwarding, dynamic DNS, certificate management, and firewall rules. Tailscale simplifies all of this by creating a mesh network between your devices.

Key benefits:
- **No port forwarding required** — Works through NAT without exposing ports
- **Zero-config encryption** — WireGuard-based, encrypted by default
- **Cross-platform** — Works on Linux, Windows, macOS, iOS, Android
- **Easy to set up** — Literally minutes to get running

## My Setup

I run Tailscale on my Raspberry Pi 3, which acts as an always-on endpoint in my home network. This low-power device runs 24/7 with minimal electricity cost.

### Installation on Ubuntu/Debian

```bash
# Add Tailscale's package repository
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/oracular.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/oracular.tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list

# Update and install
sudo apt-get update
sudo apt-get install tailscale

# Bring the device online
sudo tailscale up
```

After running `tailscale up`, you'll get a link to authenticate. Once logged in, your device joins your Tailscale network and gets a stable IP address.

### Connecting from Mobile

On my iPhone, I simply downloaded the Tailscale app, signed in with the same account, and immediately had access to my home network. No complex configuration needed.

## Use Cases

With this setup, I can:
- **SSH into my Pi** from anywhere for administration
- **Access local services** like my Pi-hole dashboard or file shares
- **Test services** I'm developing without exposing them publicly
- **Transfer files** securely between devices

## Security Considerations

While Tailscale is convenient, I've learned to think about security in layers:

1. **Device security** — The Pi itself is hardened with regular updates and minimal services
2. **Access control** — Tailscale's ACLs let you control which devices can talk to each other
3. **Monitoring** — I keep an eye on connected devices and authentication events

## What's Next

Tailscale also supports features I'm planning to explore:
- **Exit nodes** — Route all traffic through a specific device
- **Subnet routing** — Expose entire subnets to your Tailscale network
- **Funnel** — Securely expose services to the public internet

If you're looking for a simple way to access your home network remotely, I highly recommend giving Tailscale a try. The free tier is generous enough for personal use.
