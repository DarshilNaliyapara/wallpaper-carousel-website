const SHAPES = [
  { ar: "16:9", height: "aspect-video" },
  { ar: "16:10", height: "aspect-[16/10]" },
  { ar: "2:1", height: "aspect-[2/1]" },
  { ar: "3:2", height: "aspect-[3/2]" },   
];

export const getRandomCropUrl = (url: string, index: number, width: number) => {
  if (!url.includes("/upload/")) return { src: url, heightClass: "aspect-video" };

  const shapeIndex = (index * 7) % SHAPES.length;
  const shape = SHAPES[shapeIndex];
  const [base, file] = url.split("/upload/");
  const transformation = `w_${width},c_fill,g_auto,ar_${shape.ar},q_auto,f_auto`;
  
  return {
    src: `${base}/upload/${transformation}/${file}`,
    heightClass: shape.height
  };
};

export const getWallpaperName = (url: string) => {
  try {
    const regex = /\/([^/]+)\.[^/.]+$/;
    return (url.match(regex)?.[1] || "Unknown").replace(/[-_]/g, " ");
  } catch { 
    return "Unknown"; 
  }
};

export const getOptimizedUrl = (url: string, width: number = 600) => {
  if (!url?.includes("/upload/")) return url || "";
  const [base, file] = url.split("/upload/");
  return `${base}/upload/w_${width},q_auto,f_auto/${file}`;
};