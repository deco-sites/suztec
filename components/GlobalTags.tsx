import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />
      <title>
        The North Face | Roupas e Equipamentos de Neve, Montanha e cidade
      </title>
      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/favicon-16x16.png")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/favicon-32x32.png")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @font-face {
            font-family: 'helvetica_neue';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url(${
            asset("/fonts/HelveticaNeue-Condensed.ttf")
          }) format('truetype');
          }
          @font-face {
            font-family: 'helvetica_neue';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${
            asset("/fonts/HelveticaNeue-CondensedThin.ttf")
          }) format('truetype');
          }
          @font-face {
            font-family: 'helvetica_neue';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(${
            asset("/fonts/helvetica-neue-67-medium-condensed.otf")
          }) format('truetype');
          }
          @font-face {
            font-family: 'helvetica_neue';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${
            asset("/fonts/HelveticaNeueLTStd-Cn.otf")
          }) format('truetype');
          }
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
