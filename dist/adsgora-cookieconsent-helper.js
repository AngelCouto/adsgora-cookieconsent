(function () {
  'use strict';

  const cfg = window.AdsgoraCookieConsentConfig;
  const CC = window.CookieConsent;

  if (!cfg || !CC) return;

  const CSS =
    'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css';


  // =========================================================
  // TRADUCCIONES
  // =========================================================

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
        'Permiten medir campañas y ofrecer publicidad más relevante.',
      policy: 'Política de cookies',
      close: 'Cerrar'
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
        'Remember preferences and improve website functionality.',
      analytics: 'Analytics',
      analyticsDesc:
        'Help us understand website usage and measure its performance.',
      advertising: 'Advertising',
      advertisingDesc:
        'Help measure campaigns and provide more relevant advertising.',
      policy: 'Cookie policy',
      close: 'Close'
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
        'Podes escoller que categorías de cookies permites.',
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
        'Permiten medir campañas e ofrecer publicidade máis relevante.',
      policy: 'Política de cookies',
      close: 'Pechar'
    }
  };


  // =========================================================
  // IDIOMA
  // =========================================================

  const fallback =
    cfg.language && cfg.language.fallback
      ? cfg.language.fallback
      : 'es';

  let lang =
    cfg.language && cfg.language.mode
      ? cfg.language.mode
      : 'auto';

  if (lang === 'auto') {
    lang = (navigator.language || fallback)
      .toLowerCase()
      .split('-')[0];
  }

  if (!i18n[lang]) lang = fallback;
  if (!i18n[lang]) lang = 'es';

  const t = i18n[lang];


  // =========================================================
  // TEXTOS
  // =========================================================

  const useCustomTexts =
    cfg.texts && cfg.texts.mode === 'custom';

  function customText(value, standard) {
    return (
      useCustomTexts &&
      typeof value === 'string' &&
      value.length > 0
    )
      ? value
      : standard;
  }

  const text = {
    title:
      customText(cfg.texts && cfg.texts.bannerTitle, t.title),

    description:
      customText(
        cfg.texts && cfg.texts.bannerDescription,
        t.description
      ),

    accept:
      customText(cfg.texts && cfg.texts.accept, t.accept),

    reject:
      customText(cfg.texts && cfg.texts.reject, t.reject),

    configure:
      customText(
        cfg.texts && cfg.texts.preferences,
        t.configure
      ),

    preferences:
      customText(
        cfg.texts && cfg.texts.preferencesTitle,
        t.preferences
      ),

    preferencesDescription:
      customText(
        cfg.texts && cfg.texts.preferencesDescription,
        t.preferencesDescription
      ),

    save:
      customText(cfg.texts && cfg.texts.save, t.save)
  };


  // =========================================================
  // CSS ORESTBIDA
  // =========================================================

  if (!document.querySelector('link[data-adsgora-cc]')) {
    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = CSS;
    link.dataset.adsgoraCc = '1';

    document.head.appendChild(link);
  }


  // =========================================================
  // DISEÑO
  // =========================================================

  const design = cfg.design || {};

  let bannerWidth = Number(design.bannerWidth);

  if (
    !bannerWidth ||
    bannerWidth < 30 ||
    bannerWidth > 100
  ) {
    bannerWidth = 60;
  }

  const acceptColor =
    design.acceptButtonColor || '#2563EB';

  const rejectColor =
    design.rejectButtonColor || '#30363D';

  const settingsColor =
    design.settingsButtonColor || '#E9EEF2';


  // =========================================================
  // CSS PERSONALIZADO
  // =========================================================

  if (!document.getElementById('adsgora-cc-style')) {
    const style = document.createElement('style');

    style.id = 'adsgora-cc-style';

    style.textContent = `

      /*
       * ESCRITORIO
       *
       * El porcentaje configurado solamente afecta
       * al escritorio.
       */

      #cc-main .cm.cm--bar.cm--bottom {
        width: ${bannerWidth}vw !important;
        max-width: min(1100px, calc(100% - 40px)) !important;
        min-width: 0 !important;

        left: 50% !important;
        right: auto !important;
        bottom: 20px !important;

        transform: translateX(-50%) !important;

        margin: 0 !important;
        box-sizing: border-box !important;

        border-radius: 12px !important;

        box-shadow:
          0 8px 30px rgba(0, 0, 0, .16) !important;

        overflow: hidden;
      }


      /*
       * POLÍTICA DE COOKIES
       */

      #cc-main .cm__desc a,
      #cc-main .pm__section-desc a {
        text-decoration: underline;
        text-underline-offset: 2px;
        font-weight: 500;
      }


      /*
       * BOTONES
       *
       * No modificamos el orden de Orestbida.
       */

      #cc-main .cm__btns {
        gap: 10px !important;
      }

      #cc-main .cm__btn-group {
        gap: 10px !important;
      }

      #cc-main .cm__btn {
        border-radius: 7px !important;

        transition:
          opacity .15s ease,
          transform .15s ease;
      }

      #cc-main .cm__btn:hover {
        opacity: .90;
      }


      /*
       * ACEPTAR
       */

      #cc-main .cm__btn[data-role="all"] {
        background: ${acceptColor} !important;
        color: #fff !important;
      }


      /*
       * RECHAZAR
       */

      #cc-main .cm__btn[data-role="necessary"] {
        background: ${rejectColor} !important;
        color: #fff !important;
      }


      /*
       * CONFIGURAR
       *
       * Es el botón del segundo grupo de Orestbida.
       */

      #cc-main
      .cm__btns
      > .cm__btn-group:last-child
      .cm__btn {
        background: ${settingsColor} !important;
        color: #222 !important;
      }


      /*
       * TABLET
       */

      @media (max-width: 900px) {

        #cc-main .cm.cm--bar.cm--bottom {
          width: 85% !important;
          max-width: calc(100% - 40px) !important;

          left: 50% !important;
          right: auto !important;
          bottom: 20px !important;

          transform: translateX(-50%) !important;

          margin: 0 !important;
        }
      }


      /*
       * MÓVIL
       *
       * El porcentaje configurado en GTM se ignora.
       * Dejamos siempre 16px a cada lado.
       */

      @media (max-width: 600px) {

        #cc-main .cm.cm--bar.cm--bottom {
          width: calc(100% - 32px) !important;
          max-width: calc(100% - 32px) !important;

          left: 50% !important;
          right: auto !important;
          bottom: 16px !important;

          transform: translateX(-50%) !important;

          margin: 0 !important;

          border-radius: 10px !important;
        }


        /*
         * Botones apilados manteniendo
         * el orden original de Orestbida.
         */

        #cc-main .cm__btns {
          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 8px !important;
        }

        #cc-main .cm__btn-group {
          width: 100% !important;

          display: flex !important;
          flex-direction: column !important;

          gap: 8px !important;

          margin: 0 !important;
        }

        #cc-main .cm__btn {
          width: 100% !important;
        }
      }
    `;

    document.head.appendChild(style);
  }


  // =========================================================
  // ACTUALIZAR CONSENT MODE
  // =========================================================

  function updateGTM() {
    if (
      typeof window.AdsgoraCookieConsentUpdate !==
      'function'
    ) {
      return;
    }

    const categories = [];

    [
      'functionality',
      'analytics',
      'advertising'
    ].forEach(function (category) {

      if (CC.acceptedCategory(category)) {
        categories.push(category);
      }
    });

    window.AdsgoraCookieConsentUpdate(categories);
  }


  // =========================================================
  // ACCESO PERMANENTE A PREFERENCIAS
  // =========================================================

  function showPreferencesButton() {
    if (
      !cfg.preferencesTab ||
      !cfg.preferencesTab.enabled
    ) {
      return;
    }

    if (
      document.getElementById('adsgora-cc-settings')
    ) {
      return;
    }

    const button =
      document.createElement('button');

    button.id =
      'adsgora-cc-settings';

    button.type =
      'button';

    button.textContent =
      cfg.preferencesTab.text || '🍪';

    Object.assign(button.style, {
      position: 'fixed',
      bottom: '16px',
      width: '44px',
      height: '44px',
      padding: '0',
      border: '1px solid rgba(0,0,0,.12)',
      borderRadius: '50%',
      background: '#fff',
      color: '#222',
      cursor: 'pointer',
      zIndex: '2147483646',
      boxShadow: '0 3px 12px rgba(0,0,0,.18)',
      fontSize: '20px',
      lineHeight: '42px',
      textAlign: 'center'
    });

    const position =
      cfg.preferencesTab.position === 'bottom-left'
        ? 'left'
        : 'right';

    button.style[position] = '16px';

    button.onclick = function () {
      CC.showPreferences();
    };

    document.body.appendChild(button);
  }


  // =========================================================
  // POLÍTICA DE COOKIES
  // =========================================================

  const policyUrl =
    cfg.policy && cfg.policy.url
      ? cfg.policy.url
      : '#';

  const policyText =
    cfg.policy && cfg.policy.text
      ? cfg.policy.text
      : t.policy;

  const policy =
    '<a href="' +
    policyUrl +
    '" target="_blank" rel="noopener">' +
    policyText +
    '</a>';


  // =========================================================
  // COOKIECONSENT
  // =========================================================

  CC.run({

    cookie: {
      name:
        cfg.cookie.name,

      expiresAfterDays:
        function (cookie) {

          return (
            cookie &&
            cookie.acceptType === 'necessary'
          )
            ? Number(cfg.cookie.rejectExpiration)
            : Number(cfg.cookie.acceptExpiration);
        }
    },


    revision:
      Number(cfg.cookie.revision),


    guiOptions: {

      consentModal: {
        layout: 'bar',
        position: 'bottom center',
        equalWeightButtons: false
      },

      preferencesModal: {
        layout: 'box',
        position: 'right'
      }
    },


    categories: {

      necessary: {
        enabled: true,
        readOnly: true
      },

      functionality: {},

      analytics: {},

      advertising: {}
    },


    language: {

      default:
        lang,

      translations: {

        [lang]: {

          consentModal: {

            title:
              text.title,

            description:
              text.description +
              '<br><br>' +
              policy,

            acceptAllBtn:
              text.accept,

            acceptNecessaryBtn:
              text.reject,

            showPreferencesBtn:
              text.configure
          },


          preferencesModal: {

            title:
              text.preferences,

            acceptAllBtn:
              text.accept,

            acceptNecessaryBtn:
              text.reject,

            savePreferencesBtn:
              text.save,

            closeIconLabel:
              t.close,

            sections: [

              {
                description:
                  text.preferencesDescription +
                  '<br><br>' +
                  policy
              },

              {
                title:
                  t.necessary,

                description:
                  t.necessaryDesc,

                linkedCategory:
                  'necessary'
              },

              {
                title:
                  t.functionality,

                description:
                  t.functionalityDesc,

                linkedCategory:
                  'functionality'
              },

              {
                title:
                  t.analytics,

                description:
                  t.analyticsDesc,

                linkedCategory:
                  'analytics'
              },

              {
                title:
                  t.advertising,

                description:
                  t.advertisingDesc,

                linkedCategory:
                  'advertising'
              }
            ]
          }
        }
      }
    },


    // =======================================================
    // EVENTOS
    // =======================================================

    onFirstConsent: function () {
      updateGTM();
    },

    onConsent: function () {
      updateGTM();
      showPreferencesButton();
    },

    onChange: function () {
      updateGTM();
    }
  });


  // =========================================================
  // API
  // =========================================================

  window.AdsgoraCookieConsent = {
    showPreferences: function () {
      CC.showPreferences();
    }
  };

})();
