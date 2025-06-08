{
    function changeResponseCode() {
        const container = document.getElementById("content-container")
        const secondGroups = container?.querySelectorAll(".code-group:nth-of-type(2)")

        secondGroups.forEach((secondGroup) => {
            const tablist = secondGroup.querySelector('[role="tablist"]')
            const buttons = tablist?.querySelectorAll("button")
            const firstBtn = buttons?.[0]
            if (!firstBtn || firstBtn.tagName === "DIV") return

            firstBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }))

            const label = firstBtn.firstElementChild // unique div
            if (!label || label.textContent.trim() === "Response") return
            ;[...buttons].slice(1).forEach((button) => button.remove())

            const span = document.createElement("span")
            span.className = label.className
                .split(/\s+/)
                .filter((classe) => !classe.includes("hover"))
                .join(" ")
            span.textContent = "Response"

            label.replaceWith(span)

            const div = document.createElement("div")
            div.className = firstBtn.className
            div.style.cssText = firstBtn.style.cssText

            while (firstBtn.firstChild) {
                div.appendChild(firstBtn.firstChild)
            }

            firstBtn.replaceWith(div)
        })
    }

    changeResponseCode()

    const titleObserver = new MutationObserver(() => {
        changeResponseCode()
    })
    const title = document.querySelector("title")
    if (title) {
        titleObserver.observe(title, { childList: true })
    }
}
