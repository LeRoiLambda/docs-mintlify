{
    function hidePathParams() {
        const contentArea = document.getElementById("content-area")
        if (!contentArea) return

        contentArea.querySelectorAll("h4").forEach((h4) => {
            if (h4.textContent.trim() === "Path Parameters") {
                let el = h4
                for (let i = 0; i < 3 && el; i++) el = el.parentElement
                if (el) el.style.display = "none"
            }
        })
    }

    hidePathParams()

    const container = document.getElementById("content-container")
    if (container) {
        new MutationObserver((mutations) => {
            for (const m of mutations) {
                if (m.type === "childList" && (m.addedNodes.length || m.removedNodes.length)) {
                    hidePathParams()
                    break
                }
            }
        }).observe(container, {
            childList: true,
            subtree: true,
        })
    }
}
