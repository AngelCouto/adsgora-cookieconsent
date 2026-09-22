(function () {
  'use strict';

  const cfg = window.AdsgoraCookieConsentConfig;
  const CC = window.CookieConsent;

  if (!cfg || !CC) return;


  // ==========================================================
  // ORESTBIDA CSS
  // ==========================================================

  const CSS =
    'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css';


  // ==========================================================
  // TRADUCCIONES
  // ==========================================================

  const i18n = {

    es: {
      title: 'Utilizamos cookies',
      description:
        'Utilizamos cookies necesarias y, con tu consentimiento, cookies de funcionalidad, analítica y publicidad.',
      accept: 'Aceptar todas',
      reject: 'Rechazar',
      configure: 'Configurar',
      preferences: 'Preferencias de cookies',
      preferencesDescription:
        'Puedes elegir qué categorías de cookies permites.',
      save: 'Guardar preferencias',
      necessary: 'Necesarias',
      necessaryDesc:
        'Necesarias para el funcionamiento básico del sitio web. No pueden desactivarse.',
      functionality: 'Funcionalidad',
      functionalityDesc:
        'Permiten recordar preferencias y mejorar las funciones del sitio web.',
      analytics: 'Analítica',
      analyticsDesc:
        'Nos ayudan a comprender el uso del sitio web y medir su rendimiento.',
      advertising: 'Publicidad',
      advertisingDesc:
        'Permiten medir campañas publicitarias y personalizar anuncios.'
    },

    en: {
      title: 'We use cookies',
      description:
        'We use necessary cookies and, with your consent, functionality, analytics and advertising cookies.',
      accept: 'Accept all',
      reject: 'Reject',
      configure: 'Configure',
      preferences: 'Cookie preferences',
      preferencesDescription:
        'You can choose which cookie categories you allow.',
      save: 'Save preferences',
      necessary: 'Necessary',
      necessaryDesc:
        'Required for the basic operation of the website. They cannot be disabled.',
      functionality: 'Functionality',
      functionalityDesc:
        'Allow the website to remember preferences and improve its functionality.',
      analytics: 'Analytics',
      analyticsDesc:
        'Help us understand how the website is used and measure its performance.',
      advertising: 'Advertising',
      advertisingDesc:
        'Allow advertising campaigns to be measured and ads to be personalized.'
    },

    gl: {
      title: 'Utilizamos cookies',
      description:
        'Utilizamos cookies necesarias e, co teu consentimento, cookies de funcionalidade, analítica e publicidade.',
      accept: 'Aceptar todas',
      reject: 'Rexeitar',
      configure: 'Configurar',
      preferences: 'Preferencias de cookies',
      preferencesDescription:
        'Podes elixir que categorías de cookies permites.',
      save: 'Gardar preferencias',
      necessary: 'Necesarias',
      necessaryDesc:
        'Necesarias para o funcionamento básico do sitio web. Non se poden desactivar.',
      functionality: 'Funcionalidade',
      functionalityDesc:
        'Permiten lembrar preferencias e mellorar as funcións do sitio web.',
      analytics: 'Analítica',
      analyticsDesc:
        'Axúdannos a comprender o uso do sitio web e medir o seu rendemento.',
      advertising: 'Publicidade',
      advertisingDesc:
        'Permiten medir campañas publicitarias e personalizar anuncios.'
    }

  };


  // ==========================================================
  // IDIOMA
  // ==========================================================

  const supportedLanguages = ['es', 'en', 'gl'];

  const getBrowserLanguage = function () {

    const browserLanguage =
      (navigator.language || navigator.userLanguage || '')
        .toLowerCase()
        .split('-')[0];

    return supportedLanguages.indexOf(browserLanguage) >= 0
      ? browserLanguage
      : null;
  };


  const languageConfig =
    cfg.language || {};

  let lang;


  if (languageConfig.mode === 'auto') {

    lang =
      getBrowserLanguage() ||
      languageConfig.fallback ||
      'es';

  } else {

    lang =
      languageConfig.mode ||
      languageConfig.fallback ||
      'es';

  }


  if (supportedLanguages.indexOf(lang) === -1) {
    lang = 'es';
  }


  // ==========================================================
  // TEXTOS
  // ==========================================================

  const baseTexts =
    i18n[lang] || i18n.es;

  const textConfig =
    cfg.texts || {};

  const customText =
    textConfig.mode === 'custom';


  const texts = {

    title:
      customText && textConfig.bannerTitle
        ? textConfig.bannerTitle
        : baseTexts.title,

    description:
      customText && textConfig.bannerDescription
        ? textConfig.bannerDescription
        : baseTexts.description,

    accept:
      customText && textConfig.accept
        ? textConfig.accept
        : baseTexts.accept,

    reject:
      customText && textConfig.reject
        ? textConfig.reject
        : baseTexts.reject,

    configure:
      customText && textConfig.preferences
        ? textConfig.preferences
        : baseTexts.configure,

    preferences:
      customText && textConfig.preferencesTitle
        ? textConfig.preferencesTitle
        : baseTexts.preferences,

    preferencesDescription:
      customText && textConfig.preferencesDescription
        ? textConfig.preferencesDescription
        : baseTexts.preferencesDescription,

    save:
      customText && textConfig.save
        ? textConfig.save
        : baseTexts.save

  };


  // ==========================================================
  // CARGAR CSS DE ORESTBIDA
  // ==========================================================

  const existingCSS =
    document.querySelector(
      'link[href="' + CSS + '"]'
    );


  if (!existingCSS) {

    const link =
      document.createElement('link');

    link.rel = 'stylesheet';
    link.href = CSS;

    document.head.appendChild(link);

  }


  // ==========================================================
  // DISEÑO
  // ==========================================================

  const design =
    cfg.design || {};


  // Ancho escritorio configurable desde GTM.
  // Protegemos también el valor por si llega vacío o incorrecto.

  let bannerWidth =
    Number(design.bannerWidth);

  if (
    !bannerWidth ||
    bannerWidth < 30 ||
    bannerWidth > 100
  ) {
    bannerWidth = 60;
  }


  const acceptColor =
    design.acceptButtonColor ||
    '#2563EB';

  const rejectColor =
    design.rejectButtonColor ||
    '#30363D';

  const settingsColor =
    design.settingsButtonColor ||
    '#E9EEF2';


  const style =
    document.createElement('style');


  style.id =
    'adsgora-cookieconsent-style';


  style.textContent = `

    /* ======================================================
       MODAL GENERAL
       ====================================================== */

    #cc-main .cm {
      box-sizing: border-box;
      border-radius: 12px;
      overflow: hidden;

      box-shadow:
        0 10px 35px rgba(0, 0, 0, 0.18);
    }


    #cc-main .pm {
      box-sizing: border-box;
      border-radius: 12px;

      box-shadow:
        0 10px 35px rgba(0, 0, 0, 0.18);
    }


    /* ======================================================
       ENLACES
       ====================================================== */

    #cc-main .cm__desc a,
    #cc-main .pm a {
      text-decoration: underline;
    }


    /* ======================================================
       BOTONES
       ====================================================== */

    #cc-main .cm__btn {
      border-radius: 7px;

      transition:
        opacity 0.15s ease,
        transform 0.15s ease;
    }


    #cc-main .cm__btn:hover {
      opacity: 0.92;
    }


    /* Aceptar */

    #cc-main .cm__btn[data-role="all"] {
      background: ${acceptColor};
      border-color: ${acceptColor};
      color: #fff;
    }


    /* Rechazar */

    #cc-main .cm__btn[data-role="necessary"] {
      background: ${rejectColor};
      border-color: ${rejectColor};
      color: #fff;
    }


    /* Configurar */

    #cc-main .cm__btn[data-role="show"] {
      background: ${settingsColor};
      border-color: ${settingsColor};
      color: #202124;
    }


    /* ======================================================
       ESCRITORIO
       ====================================================== */

    @media (min-width: 1025px) {

      /*
       * Banner centrado.
       * El ancho procede del campo bannerWidth de GTM.
       */

      #cc-main .cm {
        width: ${bannerWidth}vw;
        max-width: 1100px;

        left: 50%;
        right: auto;

        bottom: 16px;

        transform: translateX(-50%);
      }


      /*
       * Evitamos que Cloud distribuya un grupo de botones
       * en cada extremo del banner.
       */

      #cc-main .cm__btns {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        width: 100%;
        gap: 8px;
      }


      #cc-main .cm__btn-group {
        display: flex;
        flex-direction: row;
        align-items: center;

        width: auto;
        gap: 8px;
      }


      /*
       * Orden solicitado:
       *
       * CONFIGURAR → RECHAZAR → ACEPTAR
       *
       * El DOM de Orestbida tiene:
       *
       * Grupo 1:
       *   Aceptar
       *   Rechazar
       *
       * Grupo 2:
       *   Configurar
       *
       * Reordenamos únicamente mediante CSS.
       */

      #cc-main .cm__btns
      > .cm__btn-group:last-child {
        order: 1;
      }


      #cc-main .cm__btns
      > .cm__btn-group:first-child {
        order: 2;
      }


      #cc-main .cm__btn[data-role="necessary"] {
        order: 1;
      }


      #cc-main .cm__btn[data-role="all"] {
        order: 2;
      }

    }


    /* ======================================================
       TABLET
       ====================================================== */

    @media (min-width: 601px) and (max-width: 1024px) {

      #cc-main .cm {
        width: calc(100vw - 48px);
        max-width: 850px;

        left: 50%;
        right: auto;

        bottom: 16px;

        transform: translateX(-50%);
      }


      #cc-main .cm__btns {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        width: 100%;
        gap: 8px;
      }


      #cc-main .cm__btn-group {
        display: flex;
        flex-direction: row;
        align-items: center;

        width: auto;
        gap: 8px;
      }


      /* Configurar */

      #cc-main .cm__btns
      > .cm__btn-group:last-child {
        order: 1;
      }


      /* Rechazar + Aceptar */

      #cc-main .cm__btns
      > .cm__btn-group:first-child {
        order: 2;
      }


      #cc-main .cm__btn[data-role="necessary"] {
        order: 1;
      }


      #cc-main .cm__btn[data-role="all"] {
        order: 2;
      }

    }


    /* ======================================================
       MÓVIL
       ====================================================== */

    @media (max-width: 600px) {

      /*
       * 12px de margen a cada lado.
       * 16px de margen inferior.
       */

      #cc-main .cm {
        width: calc(100vw - 24px);
        max-width: calc(100vw - 24px);

        left: 12px;
        right: 12px;

        bottom: 16px;

        transform: none;
      }


      /*
       * Los tres botones ocupan todo el ancho y
       * quedan apilados.
       */

      #cc-main .cm__btns {
        display: flex;
        flex-direction: column;

        width: 100%;
        gap: 8px;
      }


      #cc-main .cm__btn-group {
        display: contents;
      }


      #cc-main .cm__btn {
        width: 100%;
      }


      /*
       * Orden:
       *
       * Configurar
       * Rechazar
       * Aceptar
       */

      #cc-main .cm__btn[data-role="show"] {
        order: 1;
      }


      #cc-main .cm__btn[data-role="necessary"] {
        order: 2;
      }


      #cc-main .cm__btn[data-role="all"] {
        order: 3;
      }


      #cc-main .pm {
        max-width: calc(100vw - 24px);
      }

    }

  `;


  const oldStyle =
    document.getElementById(
      'adsgora-cookieconsent-style'
    );


  if (oldStyle) {
    oldStyle.remove();
  }


  document.head.appendChild(style);


  // ==========================================================
  // GOOGLE CONSENT MODE
  // ==========================================================

  const updateGTM =
    function () {

      if (
        typeof window.AdsgoraCookieConsentUpdate !==
        'function'
      ) {
        return;
      }


      const categories = [];


      if (
        CC.acceptedCategory('functionality')
      ) {
        categories.push('functionality');
      }


      if (
        CC.acceptedCategory('analytics')
      ) {
        categories.push('analytics');
      }


      if (
        CC.acceptedCategory('advertising')
      ) {
        categories.push('advertising');
      }


      window.AdsgoraCookieConsentUpdate(
        categories
      );

    };


  // ==========================================================
  // BOTÓN PERMANENTE DE PREFERENCIAS
  // ==========================================================

  const showPreferencesButton =
    function () {

      const buttonConfig =
        cfg.preferencesTab || {};


      if (!buttonConfig.enabled) {
        return;
      }


      if (
        document.getElementById(
          'adsgora-cookie-preferences'
        )
      ) {
        return;
      }


      const button =
        document.createElement('button');


      button.id =
        'adsgora-cookie-preferences';

      button.type =
        'button';


      button.innerHTML =
        buttonConfig.text || '🍪';


      button.setAttribute(
        'aria-label',
        texts.preferences
      );


      button.style.position =
        'fixed';

      button.style.bottom =
        '16px';

      button.style.width =
        '44px';

      button.style.height =
        '44px';

      button.style.border =
        '0';

      button.style.borderRadius =
        '50%';

      button.style.cursor =
        'pointer';

      button.style.zIndex =
        '2147483646';

      button.style.display =
        'flex';

      button.style.alignItems =
        'center';

      button.style.justifyContent =
        'center';

      button.style.fontSize =
        '20px';

      button.style.lineHeight =
        '1';

      button.style.background =
        '#ffffff';

      button.style.boxShadow =
        '0 3px 14px rgba(0,0,0,.20)';


      if (
        buttonConfig.position ===
        'bottom-left'
      ) {

        button.style.left =
          '16px';

      } else {

        button.style.right =
          '16px';

      }


      button.addEventListener(
        'click',
        function () {

          CC.showPreferences();

        }
      );


      document.body.appendChild(
        button
      );

    };


  // ==========================================================
  // POLÍTICA DE COOKIES
  // ==========================================================

  const policy =
    cfg.policy || {};


  let description =
    texts.description;


  if (policy.url) {

    const policyText =
      policy.text ||
      'Política de cookies';


    description +=
      '<br><br>' +
      '<a href="' +
      policy.url +
      '" target="_blank" rel="noopener">' +
      policyText +
      '</a>';

  }


  // ==========================================================
  // COOKIE
  // ==========================================================

  const cookieConfig =
    cfg.cookie || {};


  const acceptExpiration =
    Number(
      cookieConfig.acceptExpiration ||
      730
    );


  const rejectExpiration =
    Number(
      cookieConfig.rejectExpiration ||
      7
    );


  // ==========================================================
  // COOKIECONSENT
  // ==========================================================

  CC.run({

    cookie: {

      name:
        cookieConfig.name ||
        'cc_cookie',


      expiresAfterDays:
        function (cookie) {

          if (
            cookie &&
            cookie.acceptType ===
            'necessary'
          ) {

            return rejectExpiration;

          }

          return acceptExpiration;

        }

    },


    revision:
      Number(
        cookieConfig.revision || 1
      ),


    // ========================================================
    // LAYOUT
    // ========================================================

    guiOptions: {

      consentModal: {

        layout:
          'cloud inline',

        position:
          'bottom center',

        equalWeightButtons:
          false,

        flipButtons:
          false

      },


      preferencesModal: {

        layout:
          'box',

        position:
          'right'

      }

    },


    // ========================================================
    // CATEGORÍAS
    // ========================================================

    categories: {

      necessary: {

        enabled:
          true,

        readOnly:
          true

      },


      functionality: {},


      analytics: {},


      advertising: {}

    },


    // ========================================================
    // IDIOMA
    // ========================================================

    language: {

      default:
        lang,


      translations: {

        [lang]: {

          consentModal: {

            title:
              texts.title,

            description:
              description,

            acceptAllBtn:
              texts.accept,

            acceptNecessaryBtn:
              texts.reject,

            showPreferencesBtn:
              texts.configure

          },


          preferencesModal: {

            title:
              texts.preferences,

            acceptAllBtn:
              texts.accept,

            acceptNecessaryBtn:
              texts.reject,

            savePreferencesBtn:
              texts.save,

            closeIconLabel:
              'Cerrar',


            sections: [

              {

                title:
                  texts.preferences,

                description:
                  texts.preferencesDescription

              },


              {

                title:
                  baseTexts.necessary,

                description:
                  baseTexts.necessaryDesc,

                linkedCategory:
                  'necessary'

              },


              {

                title:
                  baseTexts.functionality,

                description:
                  baseTexts.functionalityDesc,

                linkedCategory:
                  'functionality'

              },


              {

                title:
                  baseTexts.analytics,

                description:
                  baseTexts.analyticsDesc,

                linkedCategory:
                  'analytics'

              },


              {

                title:
                  baseTexts.advertising,

                description:
                  baseTexts.advertisingDesc,

                linkedCategory:
                  'advertising'

              }

            ]

          }

        }

      }

    },


    // ========================================================
    // CALLBACKS
    // ========================================================

    onFirstConsent:
      function () {

        updateGTM();

      },


    onConsent:
      function () {

        updateGTM();

        showPreferencesButton();

      },


    onChange:
      function () {

        updateGTM();

      }

  });


  // ==========================================================
  // API PÚBLICA
  // ==========================================================

  window.AdsgoraCookieConsent = {

    showPreferences:
      function () {

        CC.showPreferences();

      }

  };


})();
