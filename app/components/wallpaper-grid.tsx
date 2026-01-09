import StaggeredGrid from "./smart-layout";

export default async function WallpaperGrid({ category }: { category: string }) {
    const baseUrl = "https://wallpaper-carousel-production.up.railway.app/api/v1/wallpapers";
    const apiUrl = category && category !== "All"
        ? `${baseUrl}?category=${encodeURIComponent(category)}`
        : baseUrl;

    let wallpapers: string[] = [];

    try {
        const response = await fetch(apiUrl, {
            next: { revalidate: 600 }
        });

        if (response.ok) {
            const json = await response.json();
            wallpapers = json.data?.wallpapers || [];
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }

    if (wallpapers.length === 0) {
        return (
            <div className="col-span-full w-full h-[calc(100vh-150px)] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    No Results Found
                </h3>
                <p className="text-gray-400 max-w-sm leading-relaxed">
                    We couldn't find any wallpapers for <span className="text-cyan-400 font-medium">"{category}"</span>.
                    <br />
                    Try selecting a different category.
                </p>
            </div>
        );
    }

    return (
        <StaggeredGrid wallpapers={wallpapers} />
    );
}