# GPU Monitor access page

The header opens `/gpu-monitor/` in a new tab. Its direct link opens the existing
monitor at `http://115.145.209.141:9000/` in that tab.

The monitor must keep this HTTP address. The page therefore shows SKKU VPN
guidance and an **Open GPU Monitor** button, with no automatic connection check
or redirect. This flow also works with JavaScript disabled.

HTTPS GitHub Pages cannot fetch the HTTP IP address because browsers block mixed
content. A direct top-level navigation is allowed, but the lab website cannot
observe whether the destination loads. The page must not claim to detect an
offline VPN or a reachable monitor. `no-cors`, image probes, and iframe load
events do not provide a reliable workaround. See
[MDN's mixed-content documentation](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content).
