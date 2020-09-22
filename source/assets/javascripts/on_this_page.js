document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector("[data-role~='main-content']")
  const onThisPageBar = document.querySelector("[data-role~='on-this-page']")
  const elementClassList = "my-2 block text-gray-600 text-sm no-underline hover:text-blue hover:underline"
  if (mainContent === null || onThisPageBar === null) { return }

  const headers = mainContent.querySelectorAll("h2, h3")

  if(headers.length == 0) {
    const node = document.createElement("li")
    node.textContent = "No subsections"
    node.classList.add("text-gray-600")
    node.classList.add("italic")
    onThisPageBar.appendChild(node)

    return;
  }

  const items = []

  headers.forEach((item) => {
    const linkNode = item.querySelector("a:not(.anchor)")
    if (linkNode) {
      const node = document.createElement("li")
      const itemLinkNode = linkNode.cloneNode(true)
      itemLinkNode.classList = elementClassList

      if (item.tagName === "H3") {
        itemLinkNode.classList.add("ml-2")
      }

      node.appendChild(itemLinkNode)
      onThisPageBar.appendChild(node)
    }
  })
})
