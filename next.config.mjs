/** @type {import('next').NextConfig} */
const nextConfig = {
    // async headers() {
    //     return [
    //         {
    //             source: "/:path*",
    //             headers: [
    //                 { key: "Access-Control-Allow-Credentials", value: "false" },
    //                 { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
    //                 { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
    //                 { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
    //             ]
    //         }
    //     ]
    // }

    // async rewrites() {
    //     return [
    //       {
    //         source: '/:path*',
    //         destination: 'http://localhost:3000/:path*'
    //       }
    //     ]
    // }
};

export default nextConfig;
