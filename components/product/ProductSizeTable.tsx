import { asset, Head } from "$fresh/runtime.ts";


const availableCategories = [
  "TENIS",
  "Polos",
  "T-Shirts",
  "Calças",
  "Bermudas",
  "Blazer",
  "Tricots",
  "Shorts e Sungas",
  "Roupas",
  "Calçados e Acessórios",
];

function ProductSizeTable({ category }: { category: string }) {
  const show = availableCategories.includes(category);

  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                .szb-vfr-pipe, #szb_aviator_size_chart {
                    display: none !important;
                }
                .szb-chart-button{
                  text-decoration: none;
                  text-transform: uppercase;
                }
                #szb-vfr-button {
                    font-size: 15px;
                    font-weight: 400;
                    -webkit-text-decoration: none;
                    text-decoration: none;
                    letter-spacing: 0.8px;
                    color: #252526;
                    text-transform: uppercase;
                    font-family: "helvetica_neue", sans-serif !important;
                }
                .vfr__container {
                    flex-wrap: nowrap !important;
                    flex-direction: row-reverse !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    margin-bottom: 0 !important;
                    font-family: "helvetica_neue", sans-serif !important;
                }
                #szb-container {
                    padding-top: 8px;
                }
                .vfr__container>* {
                    font-family: "helvetica_neue", sans-serif !important;
                }
                #szb-vfr-recommendation {
                  position: absolute;
                  top: -50%;
                }
          `,
          }}
        >
        </style>
      </Head>
      <div class={`${show ? "" : "hidden"} father vfr__container`}>
        <div class="content content-product-choose seletor-sku" />
      </div>
      <script id="sizebay-vfr-v4" src={asset("/thenorthface_prescript.js")}>
      </script>
    </>
  );
}

export default ProductSizeTable;
