import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface Artwork {
  url: string
  screenshot: string
}


export function PageTab({ pages, selectedIndex, setSelectedIndex }: { pages: Artwork[], selectedIndex: number, setSelectedIndex: (index: number) => void }) {
  return (
    <ScrollArea className="h-8 w-full whitespace-nowrap overflow-hidden">
      <div className="flex w-max space-x-1">
        {pages.map((artwork, index) => (
          <div
            key={artwork.url}
            className={`
            relative w-[140px] h-8 shrink-0 cursor-pointer rounded-t-md overflow-hidden 
            hover:bg-white transition-all duration-300 border-b-2 
            ${selectedIndex === index ? 'border-b-primary bg-white' : 'border-b-transparent bg-gray-100'}
            `}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="flex items-center justify-center h-full">
              <span className={`text-sm ${selectedIndex === index ? 'font-bold text-black' : 'text-gray-600'}`}>
                {`Page ${index + 1}`}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
