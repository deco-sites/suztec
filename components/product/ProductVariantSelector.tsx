import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useVariantSimilarPossibilities } from "deco-sites/suztec/sdk/useVariantSimilarPossibilities.ts";

interface Props {
  similars?: Product[];
  product: Product;
  variant: "size" | "color";
  inStock?: boolean;
}

function VariantSelector(
  { product, product: { url }, variant = "size", inStock, similars }: Props,
) {
  const possibilities = useVariantPossibilities(product);
  // similars?.map((similar) =>
  //    console.log(similar)
  // );

  function getUrlAndFirstImage(): { url: string; image: string }[] {
    const urlImageMap: { [url: string]: string } = {}; // Mapa para rastrear URLs de imagens
  
    return similars.map((product) => {
      const imageUrl = product.image.length > 0 ? product.image[0].url : '';
      
      // Verifica se a URL da imagem já foi incluída na lista
      if (!urlImageMap[imageUrl]) {
        urlImageMap[imageUrl] = imageUrl; // Adiciona a URL ao mapa
        return {
          url: product.url,
          image: imageUrl
        };
      }
      
      return null; // Retorna null para imagens repetidas
    }).filter((item) => item !== null); // Filtra itens nulos (imagens repetidas)
  }
  
  
  const urlAndFirstImageList = getUrlAndFirstImage();
  
  return (
    <div>
      <ul class="flex flex-col gap-4">
        <li class="flex flex-col gap-2">
          <span class="text-base text-[#353535] font-bold">
            Cor
          </span>
          <ul class="flex flex-wrap max-w-[400px] gap-1">
            {urlAndFirstImageList!.map((item, i) => (
              <li>
                <a href={item.url}>
                  <Avatar
                    inStock={inStock}
                    type={"color"}
                    content={item.image}
                    variant={item.url === url ? "active" : "default"}
                  />
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <ul class="flex flex-col gap-4">
        <li class="flex flex-col gap-2">
          <span class="text-base text-[#353535] font-bold">
            {variant === "size" ? "Tamanho" : "Cor"}
          </span>
          <ul class="flex flex-wrap max-w-[400px] gap-1">
            {possibilities!.map((item, i) => (
              <li>
                <a href={item.url[0]}>
                  <Avatar
                    inStock={inStock}
                    type={variant === "size" ? "size" : "color"}
                    content={item.size}
                    variant={item.url[0] === url ? "active" : "default"}
                  />
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default VariantSelector;
