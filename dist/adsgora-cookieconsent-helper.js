(function () {
    'use strict';

    const cfg = window.AdsgoraCookieConsentConfig;
    const CC = window.CookieConsent;

    if (!cfg || !CC) return;

    const CSS =
    'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css';

    /* ---------------------------------------------------------
     * IDIOMAS
     * --------------------------------------------------------- */

    const i18n = {
        es: {
            title: 'Utilizamos cookies',
            description: 'Utilizamos cookies necesarias y, con tu consentimiento, cookies de funcionalidad, analítica y publicidad.',
            accept: 'Aceptar todas',
            reject: 'Rechazar',
            configure: 'Configurar',
            preferences: 'Preferencias de cookies',
            preferencesDescription: 'Puedes elegir qué categorías de cookies permites.',
            save: 'Guardar preferencias',
            necessary: 'Necesarias',
            necessaryDesc: 'Necesarias para el funcionamiento básico del sitio web. No pueden desactivarse.',
            functionality: 'Funcionalidad',
            functionalityDesc: 'Permiten recordar preferencias y mejorar las funciones del sitio web.',
            analytics: 'Analítica',
            analyticsDesc: 'Nos ayudan a comprender el uso del sitio web y medir su rendimiento.',
            advertising: 'Publicidad',
            advertisingDesc: 'Permiten medir campañas y ofrecer publicidad más relevante.',
            policy: 'Política de cookies',
            close: 'Cerrar'
        },

        en: {
            title: 'We use cookies',
            description: 'We use necessary cookies and, with your consent, functionality, analytics and advertising cookies.',
            accept: 'Accept all',
            reject: 'Reject',
            configure: 'Configure',
            preferences: 'Cookie preferences',
            preferencesDescription: 'You can choose which cookie categories you allow.',
            save: 'Save preferences',
            necessary: 'Necessary',
            necessaryDesc: 'Required for the basic operation of the website. They cannot be disabled.',
            functionality: 'Functionality',
            functionalityDesc: 'Remember preferences and improve website functionality.',
            analytics: 'Analytics',
            analyticsDesc: 'Help us understand website usage and measure its performance.',
            advertising: 'Advertising',
            advertisingDesc: 'Help measure campaigns and provide more relevant advertising.',
            policy: 'Cookie policy',
            close: 'Close'
        },

        gl: {
            title: 'Utilizamos cookies',
            description: 'Utilizamos cookies necesarias e, co teu consentimento, cookies de funcionalidade, analítica e publicidade.',
            accept: 'Aceptar todas',
            reject: 'Rexeitar',
            configure: 'Configurar',
            preferences: 'Preferencias de cookies',
            preferencesDescription: 'Podes escoller que categorías de cookies permites.',
            save: 'Gardar preferencias',
            necessary: 'Necesarias',
            necessaryDesc: 'Necesarias para o funcionamento básico do sitio web. Non se poden desactivar.',
            functionality: 'Funcionalidade',
            functionalityDesc: 'Permiten lembrar preferencias e mellorar as funcións do sitio web.',
            analytics: 'Analítica',
            analyticsDesc: 'Axúdannos a comprender o uso do sitio web e medir o seu rendemento.',
            advertising: 'Publicidade',
            advertisingDesc: 'Permiten medir campañas e ofrecer publicidade máis relevante.',
            policy: 'Política de cookies',
            close: 'Pechar'
        }
    };

    /* ---------------------------------------------------------
     * IDIOMA ACTUAL
     * --------------------------------------------------------- */

    const fallback = cfg.language.fallback || 'es';

    let lang = cfg.language.mode;

    if (!lang || lang === 'auto') {
        lang = (navigator.language || fallback)
        .toLowerCase()
        .split('-')[0];
    }

    if (!i18n[lang]) lang = fallback;
    if (!i18n[lang]) lang = 'es';

    const t = i18n[lang];

    /*
     * Los textos configurados desde GTM sustituyen los
     * predeterminados del idioma seleccionado.
     */
    const text = {
        title: cfg.texts.bannerTitle || t.title,
        description: cfg.texts.bannerDescription || t.description,
        accept: cfg.texts.accept || t.accept,
        reject: cfg.texts.reject || t.reject,
        configure: cfg.texts.preferences || t.configure,
        preferences: cfg.texts.preferencesTitle || t.preferences,
        preferencesDescription:
        cfg.texts.preferencesDescription || t.preferencesDescription,
        save: cfg.texts.save || t.save
    };

    /* ---------------------------------------------------------
     * CSS ORESTBIDA
     * --------------------------------------------------------- */

    if (!document.querySelector('link[data-adsgora-cc]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CSS;
        link.dataset.adsgoraCc = '1';
        document.head.appendChild(link);
    }

    /* ---------------------------------------------------------
     * COMUNICAR CONSENTIMIENTO A GTM
     * --------------------------------------------------------- */

    function updateGTM() {
        if (typeof window.AdsgoraCookieConsentUpdate !== 'function') return;

        const categories = [];

        ['functionality', 'analytics', 'advertising'].forEach(function (category) {
            if (CC.acceptedCategory(category)) {
                categories.push(category);
            }
        });

        window.AdsgoraCookieConsentUpdate(categories);
    }

    /* ---------------------------------------------------------
     * BOTÓN PERMANENTE 🍪 COOKIES
     * --------------------------------------------------------- */

    function showPreferencesButton() {
        if (!cfg.preferencesTab.enabled) return;
        if (document.getElementById('adsgora-cc-settings')) return;

        const button = document.createElement('button');

        button.id = 'adsgora-cc-settings';
        button.type = 'button';
        button.textContent = cfg.preferencesTab.text || '🍪 Cookies';

        Object.assign(button.style, {
            position: 'fixed',
            bottom: '16px',
            padding: '9px 14px',
            border: '1px solid #ddd',
            borderRadius: '20px',
            background: '#fff',
            color: '#222',
            cursor: 'pointer',
            zIndex: '2147483646',
            boxShadow: '0 2px 8px rgba(0,0,0,.15)'
        });

        button.style[
            cfg.preferencesTab.position === 'bottom-left' ? 'left' : 'right'
        ] = '16px';

        button.onclick = function () {
            CC.showPreferences();
        };

        document.body.appendChild(button);
    }

    /* ---------------------------------------------------------
     * POLÍTICA DE COOKIES
     * --------------------------------------------------------- */

    const policy =
    '<a href="' + cfg.policy.url +
    '" target="_blank" rel="noopener">' +
    (cfg.policy.text || t.policy) +
    '</a>';

    /* ---------------------------------------------------------
     * COOKIECONSENT
     * --------------------------------------------------------- */

    CC.run({
        cookie: {
            name: cfg.cookie.name || 'cc_cookie',

            expiresAfterDays: function (cookie) {
                return cookie && cookie.acceptType === 'necessary'
                ? Number(cfg.cookie.rejectExpiration || 30)
                : Number(cfg.cookie.acceptExpiration || 730);
            }
        },

        revision: Number(cfg.cookie.revision || 1),

           guiOptions: {
               consentModal: {
                   layout: 'bar',
                   position: 'bottom center',
                   equalWeightButtons: true
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
               default: lang,

                   translations: {
                       [lang]: {
                           consentModal: {
                               title: text.title,

                               description:
                               text.description + '<br><br>' + policy,

                               acceptAllBtn: text.accept,
                               acceptNecessaryBtn: text.reject,
                               showPreferencesBtn: text.configure
                           },

                           preferencesModal: {
                               title: text.preferences,
                               acceptAllBtn: text.accept,
                               acceptNecessaryBtn: text.reject,
                               savePreferencesBtn: text.save,
                               closeIconLabel: t.close,

                               sections: [
                                   {
                                       description:
                                       text.preferencesDescription +
                                       '<br><br>' +
                                       policy
                                   },

                                   {
                                       title: t.necessary,
                                       description: t.necessaryDesc,
                                       linkedCategory: 'necessary'
                                   },

                                   {
                                       title: t.functionality,
                                       description: t.functionalityDesc,
                                       linkedCategory: 'functionality'
                                   },

                                   {
                                       title: t.analytics,
                                       description: t.analyticsDesc,
                                       linkedCategory: 'analytics'
                                   },

                                   {
                                       title: t.advertising,
                                       description: t.advertisingDesc,
                                       linkedCategory: 'advertising'
                                   }
                               ]
                           }
                       }
                   }
           },

           onFirstConsent: updateGTM,

           onConsent: function () {
               updateGTM();
               showPreferencesButton();
           },

           onChange: updateGTM
    });

    /* API pública para GTM */
    window.AdsgoraCookieConsent = {
        init: function () {},
 showPreferences: function () {
     CC.showPreferences();
 }
    };

})();
