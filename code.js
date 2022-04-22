switch (figma.command) {
  case "horizontal":
    setAutoLayoutDirection("HORIZONTAL")
    figma.closePlugin()
    break;
  case "vertical":
    setAutoLayoutDirection("VERTICAL")
    figma.closePlugin()
    break;
  case "primary align start":
    alignPrimaryAxis("MIN")
    figma.closePlugin()
    break;
  case "primary align end":
    alignPrimaryAxis("MAX")
    figma.closePlugin()
    break;
  case "primary align center":
    alignPrimaryAxis("CENTER")
    figma.closePlugin()
    break;
  case "counter align start":
    alignCounterAxis("MIN")
    figma.closePlugin()
    break;
  case "counter align end":
    alignCounterAxis("MAX")
    figma.closePlugin()
    break;
  case "counter align center":
    alignCounterAxis("CENTER")
    figma.closePlugin()
    break;
  case "horizontal align start":
    alignHorizontalAxis("MIN")
    figma.closePlugin()
    break;
  case "horizontal align end":
    alignHorizontalAxis("MAX")
    figma.closePlugin()
    break;
  case "horizontal align center":
    alignHorizontalAxis("CENTER")
    figma.closePlugin()
    break;
  case "vertical align start":
    alignVerticalAxis("MIN")
    figma.closePlugin()
    break;
  case "vertical align end":
    alignVerticalAxis("MAX")
    figma.closePlugin()
    break;
  case "vertical align center":
    alignVerticalAxis("CENTER")
    figma.closePlugin()
    break;
  case "space between":
    alignPrimaryAxis("SPACE_BETWEEN")
    figma.closePlugin()
    break;
  case "packed":
    alignPrimaryAxis("MIN")
    figma.closePlugin()
    break;
  case "horizontal fixed":
    setFixedSizing("HORIZONTAL")
    figma.closePlugin()
    break;
  case "horizontal hug":
    setHugContents("HORIZONTAL")
    figma.closePlugin()
    break;
  case "horizontal fill":
    setFillContainer("HORIZONTAL")
    figma.closePlugin()
    break;
  case "vertical fixed":
    setFixedSizing("VERTICAL")
    figma.closePlugin()
    break;
  case "vertical hug":
    setHugContents("VERTICAL")
    figma.closePlugin()
    break;
  case "vertical fill":
    setFillContainer("VERTICAL")
    figma.closePlugin()
    break;
  default:
    figma.closePlugin()
}

function findNearestAutoLayout(frame) {
 if (["HORIZONTAL", "VERTICAL"].includes(frame.layoutMode)) {
    return frame
  } else if (frame.parent === null) {
    return null
  } else {
    return findNearestAutoLayout(frame.parent)
  }
}

function setAutoLayoutDirection(direction) {
  figma.currentPage.selection.forEach(f => {
    let al = findNearestAutoLayout(f)
    if (!al) return

    al.layoutMode = direction
  })
}

function alignPrimaryAxis(alignment) {
  figma.currentPage.selection.forEach(f => {
    let al = findNearestAutoLayout(f)
    if (!al) return

    al.primaryAxisAlignItems = alignment
  })
}

function alignCounterAxis(alignment) {
  figma.currentPage.selection.forEach(f => {
    let al = findNearestAutoLayout(f)
    if (!al) return

    al.counterAxisAlignItems = alignment
  })
}

function alignHorizontalAxis(alignment) {
  figma.currentPage.selection.forEach(f => {
    let al = findNearestAutoLayout(f)
    if (!al) return

    if (al.layoutMode == "HORIZONTAL") {
      al.primaryAxisAlignItems = alignment
    } else {
      al.counterAxisAlignItems = alignment
    }
  })
}

function alignVerticalAxis(alignment) {
  figma.currentPage.selection.forEach(f => {
    let al = findNearestAutoLayout(f)
    if (!al) return

    if (al.layoutMode == "VERTICAL") {
      al.primaryAxisAlignItems = alignment
    } else {
      al.counterAxisAlignItems = alignment
    }
  })
}

function setHugContents(direction) {
  figma.currentPage.selection.forEach(f => {
    let al = findNearestAutoLayout(f)
    if (!al) return

    if (al.layoutMode == direction) {
      if (al.parent.layoutMode == direction) {
        al.layoutGrow = 0;
      } else {
        al.layoutAlign = "INHERIT";
      }

      al.primaryAxisSizingMode = "AUTO"
    } else {
      if (al.parent.layoutMode == direction) {
        al.layoutGrow = 0;
      } else {
        al.layoutAlign = "INHERIT";
      }

      al.counterAxisSizingMode = "AUTO"
    }
  })
}

function setFixedSizing(direction) {
  figma.currentPage.selection.forEach(f => {
    if (f.layoutMode && f.layoutMode !== "NONE") {
      if (f.layoutMode == direction) {
        f.primaryAxisSizingMode = "FIXED"
      } else {
        f.counterAxisSizingMode = "FIXED"
      }
    }

    if (f.parent.layoutMode !== "NONE") {
      if (f.parent.layoutMode == direction) {
        f.layoutGrow = 0;
      } else {
        f.layoutAlign = "INHERIT";
      }
    }
  })
}

function setFillContainer(direction) {
  figma.currentPage.selection.forEach(f => {
    if (!f.parent.layoutMode || f.parent.layoutMode === "NONE") return

    if (f.parent.layoutMode == direction) {
      f.layoutGrow = 1;
    } else {
      f.layoutAlign = "STRETCH";
      f.primaryAxisSizingMode = "FIXED";
    }
  })
}
