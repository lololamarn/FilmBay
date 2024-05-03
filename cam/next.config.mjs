/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",                
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",                
            },
            {
                protocol: "https",
                hostname: "i.pinimg.com",                
            },
            {
                protocol: "https",
                hostname: "www.sony.com.hn",                
            },
            {
                protocol: "https",
                hostname: "www.sony.net",                
            }
        ]
    },
};

export default nextConfig;
