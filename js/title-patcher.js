{
    // Updates the code-group tab label (Example) to match the title of the page
    function refresh() {
        if (!location.href.toLowerCase().includes("object")) return
        const titlePageElement = document.getElementById("page-title")
        const titlePage = titlePageElement?.textContent
        if (!titlePage) return

        const container = document.getElementById("content-container")
        const lastGroup = container?.querySelector("#content-container .code-group:last-of-type")

        const tablist = lastGroup.querySelector('[role="tablist"]')
        const buttons = tablist?.querySelectorAll("button")
        const firstBtn = buttons?.[0]
        if (!firstBtn || firstBtn.tagName === "DIV") return

        const label = firstBtn.firstElementChild
        if (!label || label.textContent.trim() === titlePage) return
        ;[...buttons].slice(1).forEach((button) => button.remove())

        const span = document.createElement("span")
        span.className = label.className
            .split(/\s+/)
            .filter((classe) => !classe.includes("hover"))
            .join(" ")
        span.textContent = titlePage

        label.replaceWith(span)

        const div = document.createElement("div")
        div.className = firstBtn.className
        div.style.cssText = firstBtn.style.cssText

        while (firstBtn.firstChild) {
            div.appendChild(firstBtn.firstChild)
        }

        firstBtn.replaceWith(div)
    }

    refresh()

    const container = document.getElementById("content-container")
    if (container) {
        new MutationObserver((mutations) => {
            for (const m of mutations) {
                if (m.type === "childList" && (m.addedNodes.length || m.removedNodes.length)) {
                    refresh()
                    break
                }
            }
        }).observe(container, {
            childList: true,
            subtree: true,
        })
    }
}
