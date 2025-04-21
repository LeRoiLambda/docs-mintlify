// Implements single-open accordion behavior
function initAccordion(navRoot) {
    if (navRoot._accordionInitialized) return
    navRoot._accordionInitialized = true

    const onClick = (event) => {
        if (!event.isTrusted) return
        const group = event.target.closest(".group")
        if (!group || event.target.closest("a")) return

        const submenu = group.nextElementSibling
        if (!submenu || submenu.tagName !== "UL" || !submenu.querySelector(":scope > li > a")) {
            return
        }
        const isOpen = submenu.matches(":not([hidden])")
        if (!isOpen) {
            navRoot.querySelectorAll(".group + ul").forEach((otherUl) => {
                if (otherUl !== submenu && otherUl.querySelector(":scope > li > a")) {
                    otherUl.previousElementSibling.dispatchEvent(
                        new MouseEvent("click", { bubbles: true })
                    )
                }
            })
        }
    }

    const mObs = new MutationObserver((mutations) => {
        for (const { addedNodes } of mutations) {
            for (const node of addedNodes) {
                if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    node.tagName === "UL" &&
                    node.querySelector(":scope > li > a")
                ) {
                    navRoot.querySelectorAll(".group + ul").forEach((otherUl) => {
                        if (otherUl !== node && otherUl.querySelector(":scope > li > a")) {
                            otherUl.previousElementSibling.dispatchEvent(
                                new MouseEvent("click", { bubbles: true })
                            )
                        }
                    })
                }
            }
        }
    })

    navRoot.addEventListener("click", onClick, { capture: true })
    mObs.observe(navRoot, { childList: true, subtree: true })
    navRoot._accordionObserver = mObs
}

document.addEventListener("DOMContentLoaded", () => {
    const existing = document.getElementById("navigation-items")
    if (existing) initAccordion(existing)

    const bodyObs = new MutationObserver((mutations) => {
        for (const { addedNodes } of mutations) {
            for (const node of addedNodes) {
                if (node.nodeType !== Node.ELEMENT_NODE) continue
                const sidebar =
                    node.id === "navigation-items"
                        ? node
                        : node.querySelector?.("#navigation-items")
                if (sidebar) initAccordion(sidebar)
            }
        }
    })
    bodyObs.observe(document.body, { childList: true, subtree: true })
})
