---
title: 'Twingate and Tailscale: different access paths'
description: 'What experimenting with resource access taught me about policies and network reachability.'
pubDate: 2026-01-20
updatedDate: 2026-10-03
tags: ['networking', 'cybersecurity', 'zero-trust']
draft: false
---

I experimented with Twingate alongside Tailscale in my Raspberry Pi setup. The useful comparison was how I described access to services, rather than which product could be labelled “more secure”.

This is a note about that January 2026 experiment, not a claim that both access paths are required by my current lab.

## Defining a resource

In Twingate, a connector provides a path to private resources. I used its resource model to think about internal dashboards, development servers and local web applications as separate destinations.

That is a useful exercise even before choosing tooling: identify the service, the people who need it, and the conditions under which access should be allowed.

## Tailscale also has access controls

My earlier wording implied that Tailscale automatically lets every device talk to every other device. That is too broad. Its grants or ACLs control permitted connections, and its [access-control documentation](https://tailscale.com/docs/features/access-control) explains that policy model.

A device being connected to a tailnet and being authorised to reach a particular service are different things.

## Two routes are not two successive barriers

If a dashboard can be reached through either Twingate or Tailscale, a request normally uses one path. The two systems do not automatically check the same request in sequence.

Both paths need appropriate policies. Adding another route can add work to the access review; it is not, by itself, proof of defence in depth.

## What I took from the experiment

The most useful outcome was thinking about permissions in terms of specific resources. For each service, I want to be able to explain who can reach it, how they authenticate, and what happens when that access should stop.

That question also applies to [publishing notes in Glyph](/projects/glyph): a public URL should stop working for future requests when its owner unpublishes the note.
