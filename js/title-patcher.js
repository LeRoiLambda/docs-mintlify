// Updates the code-group tab label (Example) to match the title of the page
function refresh() {
    if (!location.href.toLowerCase().includes("object")) return
    const titleEl = document.getElementById("page-title")
    const titleText = titleEl?.textContent.trim()
    if (!titleText) return

    const codeGroup = document.getElementById("code-group")
    if (!codeGroup) return

    const target = codeGroup.querySelector('[id^="headlessui-tabs-tab"] > div')
    if (target) target.textContent = titleText
}

document.addEventListener("DOMContentLoaded", refresh)
window.addEventListener("popstate", () => setTimeout(refresh, 0))

;["pushState", "replaceState"].forEach((name) => {
    const orig = history[name]
    history[name] = function (...args) {
        const res = orig.apply(this, args)
        setTimeout(refresh, 0)
        return res
    }
})

const mo = new MutationObserver((records) => {
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
})

mo.observe(document.body, { childList: true, subtree: true, characterData: true })
