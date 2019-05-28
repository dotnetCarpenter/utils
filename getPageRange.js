import PSPDFKit from 'pspdfkit'

function getPageRange (instance) {
  const { layoutMode, keepFirstSpreadAsSinglePage, currentPageIndex } = instance.viewState
  const totalPageCount = instance.totalPageCount - 1

  if (layoutMode === PSPDFKit.LayoutMode.AUTO) {
    throw new Error('PSPDFKit.LayoutMode.AUTO can not be handled - see https://support.pspdfkit.com/hc/en-us/requests/10152')
  }

  if (
    layoutMode === PSPDFKit.LayoutMode.SINGLE ||
    keepFirstSpreadAsSinglePage && currentPageIndex === 0
  )
  {
    return [currentPageIndex]
  }
  else
  {
    if (currentPageIndex === totalPageCount) { // last page
      if (isOdd(currentPageIndex))
      {
        return [currentPageIndex]
      }
      else
      {
        return [currentPageIndex - 1, currentPageIndex]
      }
    }
    else
    {
      if (isOdd(currentPageIndex)) {
        return [currentPageIndex, currentPageIndex + 1]
      } else {
        return [currentPageIndex - 1, currentPageIndex]
      }
    }
  }
}

function isOdd (num) {
  return num % 2 === 1
}

export default getPageRange
