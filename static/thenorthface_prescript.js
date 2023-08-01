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
      return 963
    },
    getButtons() {
      return {
        order: [
          { name: 'vfr', text: 'PROVADOR VIRTUAL' },
          { name: 'chart', text: null }
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
    let styles = [
      './styles_V4.css',
      './stylesFonts_V4.css'
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
  
  const createNewButton = () => {
    var button = document.createElement('BUTTON')
    button.setAttribute('type', 'button')
    button.setAttribute('id', 'szb_aviator_size_chart')
    button.setAttribute('class', 'vfr__button--clean')
    button.setAttribute('onclick', 'aviatorChart()')
    button.setAttribute('style', 'backgorund-color: #000000; text-transform: uppercase; text-decoration: none')
    button.onclick = function () {
      document.querySelector('.x-size-table-wrapper').classList.add('is--active')
    }
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ruler-3" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.875 8c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75z" /><path d="M9 8v2" /><path d="M6 8v3" /><path d="M12 8v3" /><path d="M18 8v3" /><path d="M15 8v2" /></svg>';
    document.querySelector('.szb-vfr-btns').append(button)
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
        //createPipe()
        createNewButton()
        clearInterval(loaded)
      }
  
      if (
        document.querySelectorAll('#szb-vfr-button').length > 0 &&
        document.querySelectorAll('#szb-chart-button').length > 0
      ) {
        createPipe()
        createNewButton()
        clearInterval(loaded)
      }
    }, tick)
  })()