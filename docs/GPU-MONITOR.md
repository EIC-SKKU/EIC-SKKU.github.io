# GPU Monitor access popup

Clicking **GPU Monitor** in the header opens a compact **Members only** dialog
with an SKKU VPN reminder. **Open GPU Monitor** opens
`http://115.145.209.141:9000/` in a new tab. Cancel, Escape, or clicking the
backdrop dismisses the dialog. There is no intermediate page or small header
label.

The reminder appears on every ordinary click; it is not a detected VPN failure.
Modified clicks and JavaScript-disabled access follow the header's direct HTTP
link using normal browser navigation.

HTTPS GitHub Pages cannot fetch the HTTP IP address because browsers block mixed
content. A direct top-level navigation is allowed, but the lab website cannot
observe whether the destination loads. The popup must not claim to detect an
offline VPN or a reachable monitor. `no-cors`, image probes, and iframe load
events do not provide a reliable workaround. See
[MDN's mixed-content documentation](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content).
