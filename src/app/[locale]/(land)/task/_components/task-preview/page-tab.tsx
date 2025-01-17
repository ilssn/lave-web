import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Artwork {
  url: string;
  screenshot: string;
  metadata: {
    title: string;
    description: string;
  };
}

export function PageTab({
  pages,
  selectedIndex,
  setSelectedIndex,
}: {
  pages: Artwork[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}) {
  return (
    <ScrollArea className="h-8 w-full overflow-hidden whitespace-nowrap">
      <div className="flex w-max space-x-1">
        {pages.map((artwork, index) => (
          <div
            key={artwork.url}
            className={`relative h-8 w-[140px] shrink-0 cursor-pointer overflow-hidden rounded-t-md border-b-2 transition-all duration-300 hover:bg-white ${selectedIndex === index ? "border-b-primary bg-white" : "border-b-transparent bg-gray-100"} `}
            onClick={() => setSelectedIndex(index)}
            title={artwork.metadata?.title || `Page ${index + 1}`}
          >
            <div className="flex h-full items-center justify-center">
              <span
                className={`text-sm ${selectedIndex === index ? "font-bold text-black" : "text-gray-600"}`}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "120px",
                }}
              >
                {artwork.metadata?.title || artwork.url}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
