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

    window.addEventListener("popstate", () => setTimeout(refresh, 0))
    ;["pushState", "replaceState"].forEach((name) => {
        const orig = history[name]
        history[name] = function (...args) {
            const res = orig.apply(this, args)
            setTimeout(refresh, 0)
            return res
        }
    })

    new MutationObserver((records) => {
        for (const rec of records) {
            if (rec.type === "childList") {
                for (const node of rec.addedNodes) {
                    if (
                        node.nodeType === 1 &&
                        (node.id === "code-group" || node.querySelector?.("#code-group"))
                    ) {
                        return refresh()
                    }
                }
            }
            if (rec.type === "characterData" && rec.target.parentElement?.id === "page-title") {
                return refresh()
            }
        }
    }).observe(document.body, {
        childList: true,
        subtree: true,
    })
}
