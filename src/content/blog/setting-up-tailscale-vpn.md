---
title: 'Tailscale: reaching my home devices'
description: 'The difference between connecting to a Tailscale endpoint and routing into a home subnet.'
pubDate: 2026-01-08
updatedDate: 2026-10-03
tags: ['networking', 'vpn']
draft: false
---

One of my early networking projects was setting up remote access to my Raspberry Pi. Tailscale gives my devices an encrypted connection without requiring me to publish the Pi’s SSH service directly to the internet.

The January setup described here used the Pi as a Tailscale endpoint. That distinction matters: reaching the Pi does not automatically give access to every device on the home LAN.

## Joining the network

Install Tailscale using the [official instructions for your operating system](https://tailscale.com/download/linux). The package repository needs to match the actual distribution and release; an Ubuntu repository is not a universal Debian instruction.

After installation, authenticate the Pi:

```bash
sudo tailscale up
tailscale status
tailscale ip -4
```

The last command shows the Pi’s Tailscale IPv4 address. Another signed-in device can use that address to reach a service on the Pi, subject to the tailnet policy and the host firewall.

```bash
# Replace the address and account with your own.
ssh your-user@100.x.y.z
```

## Endpoint or subnet router?

For devices that do not run Tailscale, subnet routing is a separate configuration. It requires IP forwarding on the router, an advertised LAN route, route approval and access rules. Some clients also need to accept routes.

Use the [subnet-router guide](https://tailscale.com/docs/features/subnet-routers) for the full configuration. Do not copy an example subnet without checking the address range of your network.

## Access rules still matter

Tailscale connectivity does not imply unrestricted access between all devices. Grants or ACLs determine which connections are permitted; host firewalls and application authentication still apply.

For my lab, I treat remote connectivity and permission to use a service as separate questions. That is also useful when troubleshooting: first establish which endpoint is reachable, then check the intended service and its policy.
