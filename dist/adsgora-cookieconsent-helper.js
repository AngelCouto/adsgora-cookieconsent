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


  // ==========================================================
  // IDIOMA
  // ==========================================================

  const fallback =
    cfg.language && cfg.language.fallback
      ? cfg.language.fallback
      : 'es';

  let lang =
    cfg.language && cfg.language.mode
      ? cfg.language.mode
      : 'auto';


  if (lang === 'auto') {

    lang =
      (navigator.language || fallback)
        .toLowerCase()
        .split('-')[0];
  }


  if (!i18n[lang]) {
    lang = fallback;
  }

  if (!i18n[lang]) {
    lang = 'es';
  }


  const t = i18n[lang];


  // ==========================================================
  // TEXTOS
  // ==========================================================

  const useCustomTexts =
    cfg.texts &&
    cfg.texts.mode === 'custom';


  const customText = function (value, standard) {

    if (
      useCustomTexts &&
      typeof value === 'string' &&
      value.length > 0
    ) {
      return value;
    }

    return standard;
  };


  const text = {

    title:
      customText(
        cfg.texts && cfg.texts.bannerTitle,
        t.title
      ),

    description:
      customText(
        cfg.texts && cfg.texts.bannerDescription,
        t.description
      ),

    accept:
      customText(
        cfg.texts && cfg.texts.accept,
        t.accept
      ),

    reject:
      customText(
        cfg.texts && cfg.texts.reject,
        t.reject
      ),

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
      customText(
        cfg.texts && cfg.texts.save,
        t.save
      )
  };


  // ==========================================================
  // CARGAR CSS ORIGINAL
  // ==========================================================

  if (!document.querySelector('link[data-adsgora-cc]')) {

    const link =
      document.createElement('link');

    link.rel =
      'stylesheet';

    link.href =
      CSS;

    link.dataset.adsgoraCc =
      '1';

    document.head.appendChild(link);
  }


  // ==========================================================
  // DISEÑO
  // ==========================================================

  const design =
    cfg.design || {};

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


  // ==========================================================
  // CSS PERSONALIZADO
  // ==========================================================

  if (!document.getElementById('adsgora-cc-style')) {

    const style =
      document.createElement('style');

    style.id =
      'adsgora-cc-style';

    style.textContent = `

      /* ==============================================
         CONTENEDOR
         ============================================== */

      #cc-main .cm {
        width: ${bannerWidth}vw;
        max-width: 1100px;
        min-width: 600px;

        left: 50%;
        right: auto;
        bottom: 20px;

        transform: translateX(-50%);

        border-radius: 12px;
        box-shadow:
          0 8px 30px rgba(0, 0, 0, .16);

        overflow: hidden;
      }


      /* ==============================================
         POLÍTICA DE COOKIES
         ============================================== */

      #cc-main .cm__desc a,
      #cc-main .pm__section-desc a {
        text-decoration: underline;
        text-underline-offset: 2px;
        font-weight: 500;
      }


      /* ==============================================
         BOTONES
         ============================================== */

      #cc-main .cm__btns {
        display: flex;
        align-items: center;
        gap: 10px;
      }


      /*
       * Orestbida genera los botones en este orden DOM:
       *
       * Aceptar
       * Rechazar
       * Configurar
       *
       * Flexbox permite mostrar:
       *
       * Configurar | espacio | Rechazar | Aceptar
       */


      #cc-main .cm__btn[data-role="show-preferences"] {
        order: 1;
        margin-right: auto;

        background:
          ${settingsColor};

        color:
          #222;
      }


      #cc-main .cm__btn[data-role="necessary"] {
        order: 2;

        background:
          ${rejectColor};

        color:
          #fff;
      }


      #cc-main .cm__btn[data-role="all"] {
        order: 3;

        background:
          ${acceptColor};

        color:
          #fff;
      }


      #cc-main .cm__btn {
        border-radius: 7px;
        transition:
          opacity .15s ease,
          transform .15s ease;
      }


      #cc-main .cm__btn:hover {
        opacity: .90;
      }


      /* ==============================================
         TABLET
         ============================================== */

      @media (max-width: 900px) {

        #cc-main .cm {
          width: 85vw;
          min-width: 0;
          max-width: none;
        }
      }


      /* ==============================================
         MÓVIL
         ============================================== */

      @media (max-width: 600px) {

        #cc-main .cm {
          width: calc(100vw - 24px);
          min-width: 0;
          max-width: none;

          bottom: 12px;

          border-radius: 10px;
        }


        #cc-main .cm__btns {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }


        /*
         * En móvil priorizamos:
         *
         * Aceptar
         * Rechazar
         * Configurar
         */

        #cc-main .cm__btn[data-role="all"] {
          order: 1;
        }


        #cc-main .cm__btn[data-role="necessary"] {
          order: 2;
        }


        #cc-main .cm__btn[data-role="show-preferences"] {
          order: 3;
          margin-right: 0;
        }


        #cc-main .cm__btn {
          width: 100%;
        }
      }
    `;

    document.head.appendChild(style);
  }


  // ==========================================================
  // ACTUALIZAR GTM / CONSENT MODE
  // ==========================================================

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

      if (
        CC.acceptedCategory(category)
      ) {
        categories.push(category);
      }
    });


    window.AdsgoraCookieConsentUpdate(
      categories
    );
  }


  // ==========================================================
  // BOTÓN PERMANENTE DE PREFERENCIAS
  // ==========================================================

  function showPreferencesButton() {

    if (
      !cfg.preferencesTab ||
      !cfg.preferencesTab.enabled
    ) {
      return;
    }


    if (
      document.getElementById(
        'adsgora-cc-settings'
      )
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


    Object.assign(
      button.style,
      {
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
        boxShadow:
          '0 3px 12px rgba(0,0,0,.18)',
        fontSize: '20px',
        lineHeight: '42px',
        textAlign: 'center'
      }
    );


    const position =
      cfg.preferencesTab.position ===
      'bottom-left'
        ? 'left'
        : 'right';


    button.style[position] =
      '16px';


    button.onclick =
      function () {

        CC.showPreferences();
      };


    document.body.appendChild(
      button
    );
  }


  // ==========================================================
  // POLÍTICA DE COOKIES
  // ==========================================================

  const policyUrl =
    cfg.policy && cfg.policy.url
      ? cfg.policy.url
      : '#';


  const policyText =
    cfg.policy &&
    cfg.policy.text
      ? cfg.policy.text
      : t.policy;


  const policy =
    '<a href="' +
    policyUrl +
    '" target="_blank" rel="noopener">' +
    policyText +
    '</a>';


  // ==========================================================
  // COOKIECONSENT
  // ==========================================================

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
            ? Number(
                cfg.cookie.rejectExpiration
              )
            : Number(
                cfg.cookie.acceptExpiration
              );
        }
    },


    revision:
      Number(
        cfg.cookie.revision
      ),


    // ========================================================
    // PRESENTACIÓN
    // ========================================================

    guiOptions: {

      consentModal: {

        layout:
          'bar',

        position:
          'bottom center',

        equalWeightButtons:
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
        enabled: true,
        readOnly: true
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


    // ========================================================
    // EVENTOS
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
