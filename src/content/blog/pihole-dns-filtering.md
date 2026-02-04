---
title: "Network-Wide Ad Blocking with Pi-hole"
description: "How I set up Pi-hole for DNS-level ad blocking and custom local DNS records on my home network."
pubDate: 2025-12-20
tags: ["networking", "dns"]
draft: false
---

# Network-Wide Ad Blocking with Pi-hole

Pi-hole has become one of the most essential services in my home lab. It acts as a DNS sinkhole, blocking ads and trackers at the network level—before they even reach your devices.

## Why DNS-Level Blocking?

Browser-based ad blockers only work in that specific browser. Pi-hole blocks requests at the DNS level, which means:

- **Every device benefits** — Phones, tablets, smart TVs, IoT devices
- **No software to install** — Just point your DNS to Pi-hole
- **Better performance** — Blocked requests never load, saving bandwidth
- **Privacy improvement** — Tracking domains are blocked network-wide

## My Setup

I run Pi-hole on a Raspberry Pi 3, the same device that hosts my Tailscale endpoint. It's a perfect use case for a Pi—low power consumption but more than capable of handling DNS queries for a home network.

### Installation

Pi-hole installation is straightforward:

```bash
curl -sSL https://install.pi-hole.net | bash
```

The installer walks you through the configuration, including:
- Choosing an upstream DNS provider (I use Cloudflare's 1.1.1.1)
- Selecting blocklists
- Enabling the web interface

### Local DNS Records

One feature I use heavily is local DNS. Instead of remembering IP addresses, I can access my services by name:

- `pi.local` → 192.168.1.100 (the Pi itself)
- `nas.local` → 192.168.1.50 (network storage)
- `printer.local` → 192.168.1.75

This makes accessing local services much more convenient and feels more professional.

## The Numbers

After running Pi-hole for several months, the stats are impressive:

- Around 15-20% of DNS queries are blocked
- Thousands of ads and trackers stopped daily
- Noticeable improvement in page load times on ad-heavy sites

The web dashboard shows exactly what's being blocked and by which device—useful for troubleshooting if something breaks.

## Troubleshooting Tips

Sometimes legitimate services break because a required domain is on a blocklist. Pi-hole makes it easy to whitelist domains:

1. Check the query log to find the blocked domain
2. Add it to the whitelist
3. Flush the DNS cache on affected devices

I maintain a small whitelist for services that need specific domains unblocked.

## Advanced: Running Unbound

For extra privacy, I've also experimented with running Unbound as a recursive DNS resolver. Instead of forwarding queries to Cloudflare or Google, Unbound resolves domains directly by querying root nameservers.

This adds a layer of privacy since no single upstream provider sees all your DNS queries.

## Integration with Tailscale

Because Pi-hole runs alongside Tailscale on my Pi, I can use it as my DNS server even when I'm away from home. This means I get ad blocking on my phone whether I'm on my home WiFi or using mobile data through the VPN.

## Conclusion

Pi-hole is one of those projects where the effort-to-benefit ratio is excellent. A few hours of setup gives you network-wide ad blocking, local DNS, and a dashboard full of interesting data about your network traffic.

If you have a spare Raspberry Pi or any always-on Linux device, I'd highly recommend setting up Pi-hole.
