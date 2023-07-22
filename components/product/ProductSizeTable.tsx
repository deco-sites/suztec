import { asset, Head } from "$fresh/runtime.ts";
import { useState } from "preact/compat";

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
  const [active, setActive] = useState(false);
  const show = availableCategories.includes(category);

  const handleSizeTable = () => {
    setActive(!active);
  };

  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          body .x-size-table-wrapper {
            position: fixed;
            top: 0px;
            left: 0px;
            z-index: 9999;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-transition: all 200ms ease;
            -o-transition: all 200ms ease;
            transition: all 200ms ease; }
            @media (max-width: 475px) {
              body .x-size-table-wrapper tr td:nth-child(1),
              body .x-size-table-wrapper tr th:nth-child(1) {
                text-align: left !important;
                padding: 17px 10px !important;
                width: 140px !important; }
              body .x-size-table-wrapper tr td:not(:nth-child(1)),
              body .x-size-table-wrapper tr th:not(:nth-child(1)) {
                text-align: center; } }
            @media (max-width: 320px) {
              body .x-size-table-wrapper tr td:nth-child(1),
              body .x-size-table-wrapper tr th:nth-child(1) {
                width: 110px !important; }
              body .x-size-table-wrapper tr td:not(:nth-child(1)),
              body .x-size-table-wrapper tr th:not(:nth-child(1)) {
                text-align: left; } }
            body .x-size-table-wrapper.is--active {
              opacity: 1;
              visibility: visible;
              pointer-events: initial;
              -webkit-user-select: initial;
              -moz-user-select: initial;
              -ms-user-select: initial;
              user-select: initial; }
            body .x-size-table-wrapper .x-size-type {
              display: none; }
              body .x-size-table-wrapper .x-size-type.is--active {
                display: block; }
                @media (max-width: 968px) {
                  body .x-size-table-wrapper .x-size-type.is--active {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -moz-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -moz-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    -webkit-flex-wrap: wrap;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                    -webkit-box-pack: center;
                    -webkit-justify-content: center;
                    -moz-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center; } }
              @media (max-width: 1024px) {
                body .x-size-table-wrapper .x-size-type.is--mobile.is--active {
                  display: block; } }
              @media (min-width: 1025px) {
                body .x-size-table-wrapper .x-size-type.is--desk.is--active {
                  display: block; } }
            body .x-size-table-wrapper .x-size-table-wrapper__content {
              position: absolute;
              top: 60%;
              left: 50%;
              -webkit-transform: translateX(-50%) translateY(-50%);
              -ms-transform: translateX(-50%) translateY(-50%);
              transform: translateX(-50%) translateY(-50%);
              background-color: #fff;
              padding: 10px 50px;
              width: 70%;
              max-height: 70vh;
              overflow: auto; }
              body .x-size-table-wrapper .x-size-table-wrapper__content-close {
                position: absolute;
                top: 15px;
                right: 15px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                display: block;
                border: 0;
                width: 20px;
                height: 20px;
                font-size: 0px; }
                body .x-size-table-wrapper .x-size-table-wrapper__content-close:before {
                  content: "";
                  display: block;
                  width: 25px;
                  height: 1px;
                  background-color: #000;
                  position: absolute;
                  top: 9px;
                  left: -2px;
                  -webkit-transform: rotate(45deg);
                  -ms-transform: rotate(45deg);
                  transform: rotate(45deg); }
                body .x-size-table-wrapper .x-size-table-wrapper__content-close:after {
                  content: "";
                  display: block;
                  width: 25px;
                  height: 1px;
                  background-color: #000;
                  position: absolute;
                  top: 9px;
                  left: -2px;
                  -webkit-transform: rotate(-45deg);
                  -ms-transform: rotate(-45deg);
                  transform: rotate(-45deg); }
              body .x-size-table-wrapper .x-size-table-wrapper__content-title {
                font-family: "Nunito Sans", sans-serif;
                font-size: 28px;
                text-align: center;
                margin-bottom: 50px;
                color: #787878; }
                body .x-size-table-wrapper .x-size-table-wrapper__content-title:after {
                  content: "|";
                  display: block;
                  margin: 10px 0px;
                  font-weight: 300; }
              body .x-size-table-wrapper .x-size-table-wrapper__content-prod-name {
                text-align: center;
                font-size: 16px;
                font-weight: 600; }
              body .x-size-table-wrapper .x-size-table-wrapper__content-table {
                position: relative;
                width: 100%;
                margin: 0px;
                padding: 0px;
                font-size: 14px;
                color: #787878; }
                @media (max-width: 968px) {
                  body .x-size-table-wrapper .x-size-table-wrapper__content-table {
                    width: -webkit-calc(100% - 10px);
                    width: calc(100% - 10px); } }
                body .x-size-table-wrapper .x-size-table-wrapper__content-table tr {
                  border-bottom: 1px solid #c9c9c9; }
                body .x-size-table-wrapper .x-size-table-wrapper__content-table thead {
                  background-color: #f4f4f4; }
                  @media (max-width: 480px) {
                    body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr:nth-child(1) th {
                      text-align: center; } }
                  body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr {
                    padding: 0; }
                    body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th {
                      padding: 12px 20px;
                      font-weight: 500; }
                      @media (max-width: 480px) {
                        body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th {
                          padding: 5px 0;
                          vertical-align: text-top; }
                          body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th p {
                            display: inline-block; }
                          body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th .x-size-table-wrapper__content-body-hover {
                            display: block;
                            text-align: center; }
                            body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th .x-size-table-wrapper__content-body-hover .x-what-this {
                              padding: 0px;
                              border: 1px solid #787878;
                              -webkit-border-radius: 100px;
                              border-radius: 100px;
                              margin-left: 10px;
                              line-height: 11px;
                              width: 13px;
                              display: inline-block;
                              text-align: center;
                              margin: 0 auto; }
                            body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th .x-size-table-wrapper__content-body-hover .x-hover {
                              position: absolute;
                              bottom: 0;
                              left: 50%;
                              display: block;
                              width: 200px;
                              height: auto;
                              background-color: #fff;
                              -webkit-border-radius: 4px;
                              border-radius: 4px;
                              border: 1px solid #ddd;
                              padding: 20px;
                              text-align: center;
                              -webkit-box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.02);
                              box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.02);
                              -webkit-transform: translate3d(-50%, 0, 0px);
                              transform: translate3d(-50%, 0, 0px);
                              -webkit-transition: all 200ms ease;
                              -o-transition: all 200ms ease;
                              transition: all 200ms ease;
                              opacity: 0;
                              visibility: hidden;
                              pointer-events: none;
                              -webkit-user-select: none;
                              -moz-user-select: none;
                              -ms-user-select: none;
                              user-select: none; }
                              body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th .x-size-table-wrapper__content-body-hover .x-hover h4,
                              body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th .x-size-table-wrapper__content-body-hover .x-hover img,
                              body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th .x-size-table-wrapper__content-body-hover .x-hover p {
                                display: block;
                                text-align: center; }
                              body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th .x-size-table-wrapper__content-body-hover .x-hover h4 {
                                margin-bottom: 20px; }
                              body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th .x-size-table-wrapper__content-body-hover .x-hover img {
                                margin: 10px auto 20px; }
                            body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr th .x-size-table-wrapper__content-body-hover:hover .x-hover {
                              opacity: 1;
                              visibility: visible;
                              pointer-events: initial;
                              -webkit-user-select: initial;
                              -moz-user-select: initial;
                              -ms-user-select: initial;
                              user-select: initial; } }
                    body .x-size-table-wrapper .x-size-table-wrapper__content-table thead tr .x-prod-name {
                      background-color: #ededed; }
                body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody {
                  background-color: #fff; }
                  body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr {
                    padding: 0; }
                    body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td {
                      padding: 17px 20px; }
                      body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td p {
                        display: inline-block; }
                      body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td .x-size-table-wrapper__content-body-hover {
                        display: inline-block; }
                        body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td .x-size-table-wrapper__content-body-hover .x-what-this {
                          padding: 0px;
                          border: 1px solid #000;
                          -webkit-border-radius: 100px;
                          border-radius: 100px;
                          margin-left: 10px;
                          line-height: 16px;
                          width: 18px;
                          display: inline-block;
                          text-align: center; }
                        body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td .x-size-table-wrapper__content-body-hover .x-hover {
                          position: absolute;
                          bottom: 0;
                          left: 50%;
                          display: block;
                          width: 200px;
                          height: auto;
                          background-color: #fff;
                          -webkit-border-radius: 4px;
                          border-radius: 4px;
                          border: 1px solid #ddd;
                          padding: 20px;
                          text-align: center;
                          -webkit-box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.02);
                          box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.02);
                          -webkit-transform: translate3d(-50%, 0, 0px);
                          transform: translate3d(-50%, 0, 0px);
                          -webkit-transition: all 200ms ease;
                          -o-transition: all 200ms ease;
                          transition: all 200ms ease;
                          opacity: 0;
                          visibility: hidden;
                          pointer-events: none;
                          -webkit-user-select: none;
                          -moz-user-select: none;
                          -ms-user-select: none;
                          user-select: none; }
                          body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td .x-size-table-wrapper__content-body-hover .x-hover h4,
                          body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td .x-size-table-wrapper__content-body-hover .x-hover img,
                          body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td .x-size-table-wrapper__content-body-hover .x-hover p {
                            display: block;
                            text-align: center; }
                          body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td .x-size-table-wrapper__content-body-hover .x-hover h4 {
                            margin-bottom: 20px; }
                          body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td .x-size-table-wrapper__content-body-hover .x-hover img {
                            margin: 10px auto 20px; }
                        body .x-size-table-wrapper .x-size-table-wrapper__content-table tbody tr td .x-size-table-wrapper__content-body-hover:hover .x-hover {
                          opacity: 1;
                          visibility: visible;
                          pointer-events: initial;
                          -webkit-user-select: initial;
                          -moz-user-select: initial;
                          -ms-user-select: initial;
                          user-select: initial; }
              body .x-size-table-wrapper .x-size-table-wrapper__content-undertitle {
                padding: 15px 20px;
                text-align: center;
                font-size: 12px;
                color: #787878; }
                @media (max-width: 1024px) {
                    .father .x-size-table-wrapper .x-size-table-wrapper__content {
                        position: absolute;
                        top: 8px;
                        left: 0;
                        right: 10px;
                        max-height: -webkit-calc(100vh - 20px);
                        max-height: calc(100vh - 20px);
                        padding: 10px 0px;
                        margin: 0 auto;
                        width: 100%;
                        -webkit-transform: none;
                        -ms-transform: none;
                        transform: none;
                    }
                    .father .x-size-table-wrapper .x-size-table-wrapper__content table thead tr th {
                        padding: 12px 0;
                        font-weight: 500;
                    }
                    .father .x-size-table-wrapper .x-size-table-wrapper__content table tbody tr td {
                        padding: 10px 0px;
                    }
                    #szb-vfr-button {
                        font-size: 14px !important;
                    }
                }

                .szb-vfr-pipe, #szb_aviator_size_chart {
                    display: none !important;
                }
                #szb-vfr-button {
                    font-size: 16px;
                    font-weight: 700;
                    -webkit-text-decoration: underline;
                    text-decoration: underline;
                    letter-spacing: 0.8px;
                    color: #252526;
                    text-transform: none;
                    font-family: "Nunito Sans", sans-serif !important;
                }
                .vfr__container {
                    flex-wrap: nowrap !important;
                    flex-direction: row-reverse !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    margin-bottom: 0 !important;
                    font-family: "Nunito Sans", sans-serif !important;
                }
                #szb-container {
                    width: 60% !important;
                    justify-content: flex-start !important;
                }
                .vfr__container>* {
                    font-family: "Nunito Sans", sans-serif !important;
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
        <div class="content content-product-choose seletor-sku"></div>

        <span class={`x-size-table-wrapper ${active ? "is--active" : ""}`}>
          <div class="x-size-table-wrapper__content">
            <button
              class="x-size-table-wrapper__content-close outline-none focus:outline-none"
              type="button"
              onClick={() => setActive(false)}
            >
              x
            </button>
            <h3 class="x-size-table-wrapper__content-title">Guia de medidas</h3>
            <div
              class={`x-size-type ${category == "Camisas" ? "is--active" : ""}`}
              data-type="Camisas"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={10}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Camisa Slim Fit
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_ml_comp.png?v=636792092237970000"
                          />
                          <p>Comprimento</p>
                          <p>
                            Nas costas, medida da parte inferior da gola até a
                            barra da camisa.
                          </p>
                        </div>
                      </span>
                    </td>
                    <td>75</td>
                    <td>76</td>
                    <td>77</td>
                    <td>78</td>
                    <td>79</td>
                    <td>80</td>
                    <td>81</td>
                    <td>82</td>
                    <td>83</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Tôrax</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_ml_torax.png?v=636792092257800000"
                          />
                          <p>Tôrax</p>
                          <p>
                            Ligeiramente abaixo da axila (2,5cm), medida até o
                            outro lado.
                          </p>
                        </div>
                      </span>
                    </td>
                    <td>49,5</td>
                    <td>51,5</td>
                    <td>53,5</td>
                    <td>55,5</td>
                    <td>58</td>
                    <td>61,5</td>
                    <td>63,5</td>
                    <td>65,5</td>
                    <td>67,5</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Manga longa</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_ml_manga.png?v=636792092247800000"
                          />
                          <p>Manga longa</p>
                          <p>Medida do começo do ombro até o final do punho.</p>
                        </div>
                      </span>
                    </td>
                    <td>64</td>
                    <td>65</td>
                    <td>66</td>
                    <td>67</td>
                    <td>67,5</td>
                    <td>68,5</td>
                    <td>69,5</td>
                    <td>70,5</td>
                    <td>71,5</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Cintura</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_ml_cint.png?v=636792092227930000"
                          />
                          <p>Cintura</p>
                          <p>20 cm abaixo da axila, medida até o outro lado.</p>
                        </div>
                      </span>
                    </td>
                    <td>46,5</td>
                    <td>48,5</td>
                    <td>50,5</td>
                    <td>52,5</td>
                    <td>56</td>
                    <td>59,5</td>
                    <td>61,5</td>
                    <td>63,5</td>
                    <td>65,5</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Ombro</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/medidas-camisas-ombro.png?v=636764724125700000"
                          />
                          <p>Ombro</p>
                          <p>
                            Medida apenas de um lado da costura do ombro até a
                            gola.
                          </p>
                        </div>
                      </span>
                    </td>
                    <td>12,5</td>
                    <td>13,5</td>
                    <td>14,5</td>
                    <td>15,5</td>
                    <td>17</td>
                    <td>19</td>
                    <td>20</td>
                    <td>21</td>
                    <td>22</td>
                  </tr>
                </tbody>
              </table>
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={10}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Camisa Classic Fit
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_ml_comp.png?v=636792092237970000"
                          />
                          <p>Comprimento</p>
                          <p>
                            Nas costas, medida da parte inferior da gola até a
                            barra da camisa.
                          </p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>77</td>
                    <td>78</td>
                    <td>79</td>
                    <td>80</td>
                    <td>81</td>
                    <td>82</td>
                    <td>84</td>
                    <td>86</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Tôrax</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_ml_torax.png?v=636792092257800000"
                          />
                          <p>Tôrax</p>
                          <p>
                            Ligeiramente abaixo da axila (2,5cm), medida até o
                            outro lado.
                          </p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>54,5</td>
                    <td>56,5</td>
                    <td>58,5</td>
                    <td>61,5</td>
                    <td>65</td>
                    <td>67</td>
                    <td>70</td>
                    <td>73</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Manga longa</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_ml_manga.png?v=636792092247800000"
                          />
                          <p>Manga longa</p>
                          <p>Medida do começo do ombro até o final do punho.</p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>65</td>
                    <td>66</td>
                    <td>67</td>
                    <td>67,5</td>
                    <td>68,5</td>
                    <td>69,5</td>
                    <td>70,5</td>
                    <td>71,5</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Cintura</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_ml_cint.png?v=636792092227930000"
                          />
                          <p>Cintura</p>
                          <p>20 cm abaixo da axila, medida até o outro lado.</p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>52</td>
                    <td>54</td>
                    <td>56</td>
                    <td>59</td>
                    <td>62</td>
                    <td>64</td>
                    <td>67</td>
                    <td>70</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Ombro</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/medidas-camisas-ombro.png?v=636764724125700000"
                          />
                          <p>Ombro</p>
                          <p>
                            Medida apenas de um lado da costura do ombro até a
                            gola.
                          </p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>14</td>
                    <td>15</td>
                    <td>16</td>
                    <td>18</td>
                    <td>20,5</td>
                    <td>21,5</td>
                    <td>22</td>
                    <td>22,5</td>
                  </tr>
                </tbody>
              </table>
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={10}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Camisa Manga Curta
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_mc_comp.png?v=636792092197900000"
                          />
                          <p>Comprimento</p>
                          <p>
                            Nas costas, medida da parte inferior da gola até a
                            barra da camisa.
                          </p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>75</td>
                    <td>76</td>
                    <td>77</td>
                    <td>78</td>
                    <td>79</td>
                    <td>80</td>
                    <td>81</td>
                    <td>82</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Tôrax</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_mc_torax.png?v=636792092217770000"
                          />
                          <p>Tôrax</p>
                          <p>
                            Ligeiramente abaixo da axila (2,5cm), medida até o
                            outro lado.
                          </p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>51,5</td>
                    <td>53,5</td>
                    <td>55,5</td>
                    <td>58</td>
                    <td>65</td>
                    <td>67</td>
                    <td>70</td>
                    <td>73</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Manga</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_mc_manga.png?v=636792092211800000"
                          />
                          <p>Manga</p>
                          <p>Medida do começo do ombro até o final da manga.</p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>23</td>
                    <td>24</td>
                    <td>25</td>
                    <td>26</td>
                    <td>27</td>
                    <td>28</td>
                    <td>29</td>
                    <td>30</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Cintura</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/camisa_mc_cintura.png?v=636792092188830000"
                          />
                          <p>Cintura</p>
                          <p>20 cm abaixo da axila, medida até o outro lado.</p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>48,5</td>
                    <td>50,5</td>
                    <td>52,5</td>
                    <td>56</td>
                    <td>60</td>
                    <td>62</td>
                    <td>64</td>
                    <td>66</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Ombro</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/medidas-camisas-ombro.png?v=636764724125700000"
                          />
                          <p>Ombro</p>
                          <p>
                            Medida apenas de um lado da costura do ombro até a
                            gola.
                          </p>
                        </div>
                      </span>
                    </td>
                    <td></td>
                    <td>13,5</td>
                    <td>14,5</td>
                    <td>15,5</td>
                    <td>17</td>
                    <td>20,5</td>
                    <td>21,5</td>
                    <td>21,5</td>
                    <td>22</td>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças. Para ver como
                medir basta clicar no ícone de interrogação.
              </h6>
            </div>

            <div
              class={`x-size-type ${category == "Polos" ? "is--active" : ""}`}
              data-type="Polos"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Polos
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>PP</th>
                    <th>P</th>
                    <th>M</th>
                    <th>G</th>
                    <th>GG</th>
                    <th>XXG</th>
                    <th>XXXG</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/polo_comp.png?v=636792092357830000"
                          />
                          <p>Comprimento</p>
                          <p>
                            Nas costas, medida da parte inferior da gola até a
                            barra da polo.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>69</th>
                    <th>71</th>
                    <th>73</th>
                    <th>75</th>
                    <th>77</th>
                    <th>79</th>
                    <th>81</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Tôrax</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/polo_torax.png?v=636792092411670000"
                          />
                          <p>Tôrax</p>
                          <p>
                            Ligeiramente abaixo da axila (2 cm), medida até o
                            outro lado.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>50</th>
                    <th>52</th>
                    <th>54</th>
                    <th>56,5</th>
                    <th>59,5</th>
                    <th>62,5</th>
                    <th>64,5</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Manga curta</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/polo_manga.png?v=636792092367670000"
                          />
                          <p>Manga curta</p>
                          <p>
                            Medida do começo do ombro e até o final da manga.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>21</th>
                    <th>22</th>
                    <th>23</th>
                    <th>24</th>
                    <th>25</th>
                    <th>26</th>
                    <th>27</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Manga longa</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/polo_ml_manga.png?v=636792092387730000"
                          />
                          <p>Manga longa</p>
                          <p>Medida do começo do ombro até o final do punho.</p>
                        </div>
                      </span>
                    </td>
                    <th>62</th>
                    <th>63</th>
                    <th>64</th>
                    <th>65</th>
                    <th>66</th>
                    <th>67</th>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças. Para ver como
                medir basta clicar no ícone de interrogação.
              </h6>
            </div>

            <div
              class={`x-size-type ${
                category == "T-Shirts" ? "is--active" : ""
              }`}
              data-type="T-shirts"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        T-shirts
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>PP</th>
                    <th>P</th>
                    <th>M</th>
                    <th>G</th>
                    <th>GG</th>
                    <th>XXG</th>
                    <th>XXXG</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/tshirt_comp.png?v=636792092477830000"
                          />
                          <p>Comprimento</p>
                          <p>
                            Nas costas, medida da parte inferior da gola até a
                            barra da t-shirt.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>68</th>
                    <th>70</th>
                    <th>72</th>
                    <th>74</th>
                    <th>76</th>
                    <th>78</th>
                    <th>80</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Tôrax</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/tshirt_torax.png?v=636792092538130000"
                          />
                          <p>Tôrax</p>
                          <p>
                            Ligeiramente abaixo da axila (2 cm), medida até o
                            outro lado.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>50,5</th>
                    <th>52,5</th>
                    <th>54,5</th>
                    <th>57,5</th>
                    <th>60,5</th>
                    <th>62,5</th>
                    <th>64,5</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Manga curta</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/tshirt_manga.png?v=636792092487830000"
                          />
                          <p>Manga curta</p>
                          <p>Medida do começo do ombro até o final da manga.</p>
                        </div>
                      </span>
                    </td>
                    <th>21</th>
                    <th>22</th>
                    <th>23</th>
                    <th>24</th>
                    <th>25</th>
                    <th>26</th>
                    <th>27</th>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças. Para ver como
                medir basta clicar no ícone de interrogação.
              </h6>
            </div>

            <div
              class={`x-size-type ${category == "Calças" ? "is--active" : ""}`}
              data-type="Calças"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Calça Chino/Social
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>38</th>
                    <th>40</th>
                    <th>42</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>50</th>
                    <th>52</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Cintura</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/calca_cintura.png?v=636792092167900000"
                          />
                          <p>Cintura</p>
                          <p>
                            Com a calça esticada, medida da parte de trás da
                            cintura.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>40</th>
                    <th>42</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>50</th>
                    <th>52</th>
                    <th>54</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/calca_comp.png?v=636792092177400000"
                          />
                          <p>Comprimento</p>
                          <p>Medida de toda a lateral.</p>
                        </div>
                      </span>
                    </td>
                    <th>110,5</th>
                    <th>111</th>
                    <th>111,5</th>
                    <th>112</th>
                    <th>112,5</th>
                    <th>113</th>
                    <th>113,5</th>
                    <th>114</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Abertura Boca</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/calca_boca.png?v=636792092157730000"
                          />
                          <p>Abertura Boca</p>
                          <p>Medida da barra da calça esticada.</p>
                        </div>
                      </span>
                    </td>
                    <th>19</th>
                    <th>19,5</th>
                    <th>20</th>
                    <th>20,5</th>
                    <th>21</th>
                    <th>21,5</th>
                    <th>22</th>
                    <th>22,5</th>
                  </tr>
                </tbody>
              </table>
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Calça Jeans
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>38</th>
                    <th>40</th>
                    <th>42</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>50</th>
                    <th>52</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Cintura</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/calca_cintura.png?v=636792092167900000"
                          />
                          <p>Cintura</p>
                          <p>
                            Com a calça esticada, medida da parte de trás da
                            cintura.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>40</th>
                    <th>42</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>50</th>
                    <th>52</th>
                    <th>54</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/calca_comp.png?v=636792092177400000"
                          />
                          <p>Comprimento</p>
                          <p>Medida de toda a lateral.</p>
                        </div>
                      </span>
                    </td>
                    <th>108,5</th>
                    <th>109</th>
                    <th>110</th>
                    <th>110,5</th>
                    <th>111,5</th>
                    <th>112</th>
                    <th>112,5</th>
                    <th>113,5</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Abertura Boca</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/calca_boca.png?v=636792092157730000"
                          />
                          <p>Abertura Boca</p>
                          <p>Medida da barra da calça esticada.</p>
                        </div>
                      </span>
                    </td>
                    <th>19</th>
                    <th>19,5</th>
                    <th>20</th>
                    <th>20,5</th>
                    <th>21</th>
                    <th>21,5</th>
                    <th>22</th>
                    <th>22,5</th>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças. Para ver como
                medir basta clicar no ícone de interrogação.
              </h6>
            </div>

            <div
              class={`x-size-type ${
                category == "Bermudas" ? "is--active" : ""
              }`}
              data-type="Bermudas"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Bermudas
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>38</th>
                    <th>40</th>
                    <th>42</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>50</th>
                    <th>52</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Cintura</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/bermuda_cint.png?v=636792092124870000"
                          />
                          <p>Cintura</p>
                          <p>
                            Com a bermuda esticada, medida da parte de trás da
                            cintura.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>40</th>
                    <th>42</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>50</th>
                    <th>52</th>
                    <th>54</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/bermuda_comp.png?v=636792092128630000"
                          />
                          <p>Comprimento</p>
                          <p>Medida de toda a lateral.</p>
                        </div>
                      </span>
                    </td>
                    <th>52</th>
                    <th>52,5</th>
                    <th>53</th>
                    <th>53,5</th>
                    <th>54</th>
                    <th>54,5</th>
                    <th>55</th>
                    <th>55,5</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Tamanho P-M-G</p>
                    </td>
                    <th>P</th>
                    <th>P</th>
                    <th>M</th>
                    <th>G</th>
                    <th>G</th>
                    <th>GG</th>
                    <th>XXG</th>
                    <th>XXG</th>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças. Para ver como
                medir basta clicar no ícone de interrogação.
              </h6>
            </div>

            <div
              class={`x-size-type ${category == "Blazer" ? "is--active" : ""}`}
              data-type="Blazer"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Blazer
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>48</th>
                    <th>50</th>
                    <th>52</th>
                    <th>54</th>
                    <th>56</th>
                    <th>58</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/casacos_comp.png?v=636792092277870000"
                          />
                          <p>Comprimento</p>
                          <p>
                            Nas costas, medida da parte inferior da gola até a
                            barra da jaqueta.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>74,5</th>
                    <th>75</th>
                    <th>75,5</th>
                    <th>76</th>
                    <th>76,5</th>
                    <th>77</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Tórax</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/casacos_torax.png?v=636792092297570000"
                          />
                          <p>Tórax</p>
                          <p>
                            Com os botões fechados e o paletó apoiado, medir
                            ligeiramente abaixo da axila (2cm) até o outro lado.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>51</th>
                    <th>53</th>
                    <th>55</th>
                    <th>57</th>
                    <th>59</th>
                    <th>61</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Ombro a Ombro</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/medidas-camisas-ombro.png?v=636764724125700000"
                          />
                          <p>Barra</p>
                          <p>Medida reta de um ombro ao outro.</p>
                        </div>
                      </span>
                    </td>
                    <th>47</th>
                    <th>48</th>
                    <th>49</th>
                    <th>50</th>
                    <th>51</th>
                    <th>52</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Manga Longa</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/casacos_manga.png?v=636792092287570000"
                          />
                          <p>Manga Longa</p>
                          <p>Medida do começo do ombro até o final do punho.</p>
                        </div>
                      </span>
                    </td>
                    <th>63,5</th>
                    <th>64,5</th>
                    <th>65,5</th>
                    <th>66,5</th>
                    <th>67,5</th>
                    <th>68,5</th>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças. Para ver como
                medir basta clicar no ícone de interrogação.
              </h6>
            </div>

            <div
              class={`x-size-type ${category == "Tricots" ? "is--active" : ""}`}
              data-type="Tricots"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Tricots
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>P</th>
                    <th>M</th>
                    <th>G</th>
                    <th>GG</th>
                    <th>XXG</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/tricots_comp.png?v=636792092447800000"
                          />
                          <p>Comprimento</p>
                          <p>
                            Nas costas, medida da parte inferior da gola até a
                            barra do tricot.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>70</th>
                    <th>72</th>
                    <th>74</th>
                    <th>76</th>
                    <th>78</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Tórax</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/tricots_torax.png?v=636792092467500000"
                          />
                          <p>Tórax</p>
                          <p>
                            Ligeiramente abaixo da axila (2 cm), medida até o
                            outro lado.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>53</th>
                    <th>55</th>
                    <th>57</th>
                    <th>59</th>
                    <th>61</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Manga Longa</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/tricots_manga.png?v=636792092457500000"
                          />
                          <p>Manga Longa</p>
                          <p>
                            Medida do começo do ombro e até o final do punho.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>63</th>
                    <th>64</th>
                    <th>65</th>
                    <th>66</th>
                    <th>67</th>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças. Para ver como
                medir basta clicar no ícone de interrogação.
              </h6>
            </div>

            <div
              class={`x-size-type ${
                category == "Shorts e Sungas" ? "is--active" : ""
              }`}
              data-type="Shorts e Sungas"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Shorts
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>P</th>
                    <th>M</th>
                    <th>G</th>
                    <th>GG</th>
                    <th>XGG</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Cintura</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/short_cint.png?v=636792092417900000"
                          />
                          <p>Cintura</p>
                          <p>Medida da parte de trás da cintura.</p>
                        </div>
                      </span>
                    </td>
                    <th>40</th>
                    <th>42</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/short_comp.png?v=636792092427770000"
                          />
                          <p>Comprimento</p>
                          <p>Medida de toda a lateral.</p>
                        </div>
                      </span>
                    </td>
                    <th>40,5</th>
                    <th>42</th>
                    <th>43,5</th>
                    <th>45</th>
                    <th>46,5</th>
                  </tr>
                </tbody>
              </table>
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Boardshorts
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>38</th>
                    <th>40</th>
                    <th>42</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>50</th>
                    <th>52</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Cintura</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/boardshort_cint.png?v=636792092137700000"
                          />
                          <p>Cintura</p>
                          <p>
                            Com o boardshort esticado, medida da parte de trás
                            da cintura.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>40</th>
                    <th>42</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>50</th>
                    <th>52</th>
                    <th>54</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Comprimento</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/boardshort_comp.png?v=636792092147870000"
                          />
                          <p>Comprimento</p>
                          <p>Medida de toda a lateral.</p>
                        </div>
                      </span>
                    </td>
                    <th>52</th>
                    <th>52,5</th>
                    <th>53</th>
                    <th>53,5</th>
                    <th>54</th>
                    <th>54,5</th>
                    <th>55</th>
                    <th>55,5</th>
                  </tr>
                </tbody>
              </table>
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Sungas
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>P</th>
                    <th>M</th>
                    <th>G</th>
                    <th>GG</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Tamanho</p>
                      <span class="x-size-table-wrapper__content-body-hover">
                        <p class="x-what-this">?</p>
                        <div class="x-hover">
                          <h4>Como medir</h4>
                          <img
                            loading="lazy"
                            src="https://aviator.vteximg.com.br/arquivos/sunga.png?v=636792092437930000"
                          />
                          <p>Cintura</p>
                          <p>
                            O tamanho da sunga segue a escala de medida da
                            calça.
                          </p>
                        </div>
                      </span>
                    </td>
                    <th>38</th>
                    <th>40-42</th>
                    <th>44-46</th>
                    <th>48-50</th>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças. Para ver como
                medir basta clicar no ícone de interrogação.
              </h6>
            </div>

            <div
              class={`x-size-type ${category == "Roupas" ? "is--active" : ""}`}
              data-type="Roupas"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Pijamas
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>P</th>
                    <th>M</th>
                    <th>G</th>
                    <th>GG</th>
                    <th>XXG</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Comprimento</p>
                    </td>
                    <th>68</th>
                    <th>70</th>
                    <th>72</th>
                    <th>73</th>
                    <th>75</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Tórax</p>
                    </td>
                    <th>53</th>
                    <th>56</th>
                    <th>59</th>
                    <th>62</th>
                    <th>65</th>
                  </tr>
                  <tr>
                    <td>
                      <p>Manga curta</p>
                    </td>
                    <th>22</th>
                    <th>23</th>
                    <th>24</th>
                    <th>25</th>
                    <th>26</th>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças. Para ver como
                medir basta clicar no ícone de interrogação.
              </h6>
            </div>

            <div
              class={`x-size-type ${
                category == "Calçados e Acessórios" ? "is--active" : ""
              }`}
              data-type="Calçados"
            >
              <table class="x-size-table-wrapper__content-table">
                <thead class="x-size-table-wrapper__content-header">
                  <tr>
                    <th class="x-prod-name" colSpan={9}>
                      <p class="x-size-table-wrapper__content-prod-name">
                        Calçados
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th>Tamanho</th>
                    <th>38</th>
                    <th>39</th>
                    <th>40</th>
                    <th>41</th>
                    <th>42</th>
                    <th>43</th>
                    <th>44</th>
                  </tr>
                </thead>
                <tbody class="x-size-table-wrapper__content-body">
                  <tr>
                    <td>
                      <p>Comprimento do pé</p>
                    </td>
                    <th>25,3</th>
                    <th>26</th>
                    <th>26,6</th>
                    <th>27,3</th>
                    <th>28</th>
                    <th>28,7</th>
                    <th>29,4</th>
                  </tr>
                </tbody>
              </table>
              <h6 class="x-size-table-wrapper__content-undertitle">
                *Podem haver pequenas variações entre as peças.
              </h6>
            </div>
          </div>
        </span>
      </div>
      <script id="sizebay-vfr-v4" src={asset("/thenorthface_prescript.js")}>
      </script>
    </>
  );
}

export default ProductSizeTable;
