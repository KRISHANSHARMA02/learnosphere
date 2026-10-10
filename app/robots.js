export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',

        disallow: ['/userdashboard', '/Teacherdashboard', '/StudentForm', '/api', '/authcallback'],
      },
    ],
    sitemap: 'https://learnosphere.in/sitemap.xml',
  };
}