// Opens paintbrush SVG menu
document.querySelectorAll("#navigation-items div > svg").forEach((svg) => {
    const styleAttr = svg.getAttribute("style") || ""
    if (styleAttr.includes("pen-paintbrush.svg")) {
        console.log("🎨 Paintbrush SVG found:", svg)
        svg.parentElement.click()
    }
})
