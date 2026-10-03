---
title: 'Running lab services on Oracle Cloud'
description: 'A cloud Linux environment, with resource limits and recovery to think about.'
pubDate: 2026-02-01
updatedDate: 2026-10-03
tags: ['cloud', 'docker']
draft: false
---

Oracle Cloud gives me another Linux environment alongside the services I run at home. My February 2026 setup notes described Pterodactyl and supporting services, Docker containers, monitoring and Traefik.

Always Free resources are subject to eligibility, capacity and resource limits. Before provisioning anything, I need to check which resources qualify and what the account would charge for usage outside that allowance.

## The application stack

The game-server setup described in the original notes used Pterodactyl Panel, MariaDB, Redis and Wings. Other services included Uptime Kuma and Portainer. Traefik handled request routing and TLS certificates.

Keeping service configuration explicit makes it easier to understand the dependencies. The database, application data and deployment configuration matter separately when planning recovery.

## Before making a service public

Cloud network rules and the host firewall both affect reachability. I check the intended ports at both layers, keep administrative access separate from public application access, and check whether the selected images support the instance architecture.

A reverse proxy does not remove the need for application authentication or software updates.

## Limits and recovery

Oracle documents the possible reclamation of idle Always Free compute instances. A periodic cron job is not a recovery plan or a guarantee against reclamation.

The [Always Free resource documentation](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm) is the source to check before provisioning. Verify the current allowance and billing status in the account as well.

A useful recovery plan needs backups of persistent data outside the instance and a tested way to recreate services. I have not published a restore test for this setup, so I am not presenting automated restarts as evidence of recoverability.

## What belongs in the lab notes

The next useful documentation is specific: the configuration needed to rebuild a service, the data it needs, and the result of restoring it. That would say more about reliability than an uptime claim or an undated cost total.
