window.SizebayPrescript = () => ({
  getPermalink() {
    let product = "https://www.thenorthface.com.br" + window.location.pathname
    product.replace('%C3%B1', 'n')
    return product
  },
  
  getIntegration() {
    let appUrl = `https://vfr-v3-production.sizebay.technology/V4/implantation/index.js`

    let app = document.createElement('script')
    app.id = 'szb-vfr__base'
    app.setAttribute('src', appUrl)
    document.querySelector('head').appendChild(app)

  },
  getAnchor() {
    return {
      web: '.seletor-sku',
      mobile: '.seletor-sku'
    }
  },
  getTenantId() {
    return 941
  },
  getButtons() {
    return {
      order: [
        { name: 'vfr', text: 'PROVADOR VIRTUAL' },
        { name: 'chart', text: "TABELA DE MEDIDAS" }
      ],
      position: 'after',
      class: 'vfr__button--clean'
    }
  },
  getLanguage() {
    return 'br'
  }
})

const createCustomStyle = () => {
  const styles = [
    'https://static.sizebay.technology/941/styles_v4.css',
    'https://static.sizebay.technology/font/stores/fontRuler/styles.css'
  ]
  for (let iterator of styles) {
    let linkElem = document.createElement('link')

    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('type', 'text/css')
    linkElem.setAttribute('href', iterator)

    document.querySelector('body').appendChild(linkElem)
  }
}

const createPipe = () => {
  var elementBtnFittingRoom = document.querySelector('#szb-vfr-button')

  var createPipe = document.createElement('div')

  createPipe.setAttribute('class', 'szb-vfr-pipe')

  elementBtnFittingRoom.after(createPipe)
}


;(() => {
  const { SizebayPrescript } = window

  createCustomStyle()
  SizebayPrescript().getIntegration()

  let permalink = SizebayPrescript().getPermalink()
  let tenantId = SizebayPrescript().getTenantId()
  let buttons = SizebayPrescript().getButtons()
  let anchor = SizebayPrescript().getAnchor()
  let lang = SizebayPrescript().getLanguage()
  let tick = 1000
  let bool = true
  
  let payload = {
    permalink,
    tenantId,
    buttons,
    anchor,
    lang
  }

  

  const loaded = setInterval(() => {
    if (document.querySelectorAll('.vfr__container').length && bool) {
      window.Sizebay.Implantation(payload)
      bool = false
      console.log('PRESCRIPT : VERSÃƒO 1.7')
    }

    if (
      document.querySelectorAll('#szb-vfr-button').length == 0 &&
      document.querySelectorAll('#szb-chart-button').length > 0
    ) {
      clearInterval(loaded)
    }

    if (
      document.querySelectorAll('#szb-vfr-button').length > 0 &&
      document.querySelectorAll('#szb-chart-button').length > 0
    ) {
      createPipe()
      
      clearInterval(loaded)
    }
  }, tick)
})()