import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface Artwork {
  url: string
  screenshot: string
}


export function ScrollPage({ pages, selectedIndex, setSelectedIndex }: { pages: Artwork[], selectedIndex: number, setSelectedIndex: (index: number) => void }) {
  return (
    <ScrollArea className="h-8 w-full whitespace-nowrap overflow-hidden hover:h-[80px] transition-all duration-300 bg-black bg-opacity-60 rounded-t-md p-1">
      <div className="flex w-max space-x-2">
        {pages.map((artwork, index) => (
          <figure key={artwork.url} className={`
          relative w-[140px] h-[80px] shrink-0 cursor-pointer rounded-t-md overflow-hidden 
          hover:opacity-100 hover:scale-105 transition-all duration-300 border-2 opacity-20 
          ${selectedIndex === index ? 'border-primary opacity-100 scale-105' : 'border-transparent opacity-50'}
          `}>
            <div className="overflow-hidden h-full" onClick={() => setSelectedIndex(index)}>
              <Image
                src={artwork.screenshot}
                alt={`Photo by ${artwork.url}`}
                className="w-full h-auto object-cover"
                width={140}
                height={80}
                style={{ objectFit: "cover", width: "auto", height: "auto" }}
              />
            </div>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

  )
}
