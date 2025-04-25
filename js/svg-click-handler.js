// Opens paintbrush SVG menu
document.querySelectorAll("#navigation-items div > svg").forEach((svg) => {
    const styleAttr = svg.getAttribute("style") || ""
    if (styleAttr.includes("pen-paintbrush.svg")) {
        svg.parentElement.click()
    }
})
