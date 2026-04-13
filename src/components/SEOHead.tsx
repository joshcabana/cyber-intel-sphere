import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
  image?: string;
}

const SITE_NAME = "AI Threat Brief";
const SITE_URL = "https://aithreatbrief.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

export default function SEOHead({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  author,
  image,
}: SEOHeadProps) {
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article-specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
}
