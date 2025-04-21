// Shows a temporary banner when custom scripts are loaded (dev mode only)
;(function () {
    // Only show in development environment
    const devHosts = ["localhost", "127.0.0.1"]
    if (!devHosts.includes(window.location.hostname)) return

    const tag = document.createElement("div")
    tag.textContent = "✔️ Custom JS is active"
    Object.assign(tag.style, {
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        background: "#10b981",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        zIndex: "9999",
        boxShadow: "0 0 6px rgba(0,0,0,0.2)",
    })
    document.body.appendChild(tag)
    setTimeout(() => tag.remove(), 4000)
})()

//TODO object pages, mobile version, code group not showing
