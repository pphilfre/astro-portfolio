---
title: 'Pi-hole and the path of a DNS query'
description: 'DNS filtering, local names and checking why a request was blocked.'
pubDate: 2025-12-20
updatedDate: 2026-10-03
tags: ['networking', 'dns']
draft: false
---

I run Pi-hole on a Raspberry Pi to filter DNS queries and give local services readable names. My original configuration used Cloudflare’s 1.1.1.1 as the upstream resolver.

That means Pi-hole filters queries first, but permitted public queries still use a third-party DNS provider. It does not remove that provider from the path.

## What filtering covers

Devices need to use Pi-hole as their resolver for its rules to apply. Applications using their own encrypted DNS can bypass that resolver choice. DNS filtering also cannot distinguish an advert from other content served from the same permitted domain.

I use it as one useful layer, rather than a guarantee that every advert or tracker is blocked.

## Naming local services

For ordinary home DNS records, use a name under **home.arpa**, the domain designated for residential networks by [RFC 8375](https://www.rfc-editor.org/rfc/rfc8375). My earlier examples used **.local**, which is associated with multicast DNS.

Example records might be:

```text
pi.home.arpa       192.168.1.100
nas.home.arpa      192.168.1.50
printer.home.arpa  192.168.1.75
```

These addresses are examples. Use the reserved addresses for your own devices, then test against the Pi-hole resolver explicitly:

```bash
nslookup pi.home.arpa 192.168.1.100
```

## When something does not load

The query log is a useful starting point. Look for the relevant client and time, check whether a domain was blocked, then decide whether that specific domain should be allowed. Retest after clearing the client’s DNS cache.

A page failing to load is not automatically a DNS problem. If the name resolves correctly, the next checks are connectivity and the application itself.

## Away from home

Tailscale can provide a path to the Pi, but using Pi-hole for remote DNS needs the appropriate DNS configuration and access rules too. Simply signing in to Tailscale does not select Pi-hole as every device’s resolver.
