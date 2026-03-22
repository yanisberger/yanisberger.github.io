---
title: "Zero-Knowledge Proofs in Practice"
description: "Why ZKPs matter, how they work, and why they are the foundation of privacy-preserving authentication."
date: "March 2026"
readTime: "3 min read"
---

## The problem with passwords

Every time you log in somewhere, you send a secret across a wire. The server checks it, stores a hash of it, and hopes nothing goes wrong. This model is decades old and it shows; data breaches, credential stuffing, phishing. The fundamental issue is that proving you *know* something requires *revealing* it.

Zero-knowledge proofs break that assumption entirely.

## What is a zero-knowledge proof?

A zero-knowledge proof (ZKP) is a cryptographic protocol that lets you convince someone that a statement is true without revealing *why* it is true, and without leaking any information beyond the truth of the statement itself.

The classic illustration is alibaba's cave, a cave with two entrances and a door dividing them in the middle. You want to prove you know the password to open the door, but you don't want to say the password out loud. A verifier stands at the entrance while you walk in from one side, whitout the verifier knowing which side you went in. They can then repeatedly ask you to leave through any one of the two entrances. With enough repetitions they are now fairly certain that you indeed know the password, or else you would not be able to leave through both cave entrances on demand.

Three properties define a valid ZKP:

- **Completeness:**  if the statement is true, an honest prover will convince the verifier.
- **Soundness:** if the statement is false, no cheating prover can convince the verifier (except with negligible probability).
- **Zero-knowledge:** the verifier learns nothing beyond the fact that the statement is true.

## Why this matters for authentication

Modern authentication still relies on shared secrets: passwords, OTPs, session tokens. Even "passwordless" flows using WebAuthn send a signed challenge that reveals your public key. Something is always transmitted.

With ZKPs, a user could prove *I have a valid credential issued by this authority* without revealing the credential itself, not even a pseudonym. The server learns only that the proof is valid. Nothing is stored that could be stolen, nothing is transmitted that could be intercepted.

This is not theoretical. Protocols like [zk-SNARKs](https://z.cash/technology/zksnarks/) and [zk-STARKs](https://starkware.co/stark/) are in production today, powering privacy-preserving blockchains. The same primitives should now be adapted for authentication systems.

## The middleman problem

But the deeper issue isn't just that secrets get stolen. It's that the current model requires a trusted third party to hold them. OAuth and OIDC didn't invent this problem — they just scaled it. Every time you hit "Sign in with Google", you're not just authenticating, you're appointing Google as the arbiter of your identity for that session. ZKPs remove that dependency at the cryptographic level. There's no authority to trust because there's nothing to delegate.

## Integrating ZKPs into OAuth/OIDC

My Bachelor thesis focused on exactly that. OpenID Connect already has a natural seam where a ZKP fits: the moment a user proves to a relying party that they hold a valid identity. In standard OIDC, that proof is delegated to a centralized identity provider. Google vouches for you. Replace that with a zero-knowledge membership proof, and the user can vouch for themselves: I hold a credential from this valid set, without revealing which one, without a middleman, and without the relying party learning anything beyond the fact that the claim is legitimate.
The rest of the OIDC flow stays untouched. Token structure, redirect URIs, JWT verification — all standard. ZKPs slot in at exactly the point where centralization was the only solution before.

## A note on complexity

ZKPs are computationally expensive to generate, though verification is fast. Recent advances, particularly in recursive proofs and hardware acceleration, are massively improving performance. The cryptographic machinery is also notoriously hard to implement correctly, which is why most practical systems rely on audited circuit libraries rather than hand-rolled proofs.

## A look into the future
Proof systems are getting faster, tooling is maturing, and standards bodies are beginning to take self-sovereign identity seriously. The hard problem was never really cryptographic but rather it was building something that fits into existing infrastructure without asking everyone to rebuild from scratch. OpenID Connect, for all its centralization baggage, turns out to be a surprisingly good host for these ideas.


