---
title: 'Building my home lab'
description: 'Linux services, local virtual machines and a place to understand how the pieces fit together.'
pubDate: 2026-01-15
updatedDate: 2026-10-03
tags: ['home-lab', 'linux', 'docker']
draft: false
---

My home lab gives me somewhere to learn by running services myself. I use Linux, Docker Compose and Traefik across local Proxmox virtual machines and Oracle Cloud.

This article began as a January 2026 overview. The tools below reflect my setup as of October 2026; the earlier list of plans is no longer a description of what is installed.

## What runs where

Proxmox provides local virtual machines for experiments. Docker Compose describes the services I run, while Traefik routes requests to applications. Oracle Cloud provides another Linux environment outside my home network.

A Raspberry Pi runs Pi-hole for DNS filtering. I use Tailscale to reach home devices remotely. These tools solve separate problems: filtering DNS queries does not control every network connection, and remote access still needs an access policy.

## Looking at the system

I use Wazuh for lab log analysis, and Prometheus with Grafana for system metrics and dashboards. Logs help explain what happened; metrics help show how a system is behaving over time.

Keeping those views separate is useful. An application can be reachable while still returning errors, and a healthy host does not establish that every service on it works.

## DNS is one part of the path

Pi-hole answers local records and filters requests. Permitted public queries still go to an upstream resolver; in the configuration described in my DNS article, that is Cloudflare.

When looking at a connection problem, the questions are different at each step: did the name resolve, was the host reachable, and did the application return the expected response?

## What I’m documenting next

The public repository currently contains a short README. More useful evidence would be selected configuration, a recovery procedure and a dated account of a specific failure. I’m keeping those separate from claims about what the lab already proves.

[See the service overview](/projects/homelab) or [read the DNS notes](/blog/pihole-dns-filtering).
