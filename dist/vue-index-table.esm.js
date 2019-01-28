//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
    name: "Index",
    props: {
        title: {type: String, default: null},
        breadcrumbs: {type: Array, default: function () { return []; }},
        subtitle: {type: String, default: null},
        toolbar: {type: Array, default: null},
        data: {type: Array, default: null},
        columns: {type: Array, default: null},
        actionsColumn: {type: String, default: null},
        buttons: {type: Array, default: function () { return []; }},
        hasCard: {type: Boolean, default: null},
        options: {type: Object, default: null}
    },
    data: function data() {
        var defaultOptions = {
            perPage: 5,
            pagination: {
                chunk: 5,
                dropdown: false,
            },
            texts: {
                filter: '',
                count: '',
                limit: ''
            },
            //skin: 'table table-striped',
            sortIcon: {
                base: 'fa text-muted ml-1',
                up: 'fa-chevron-up ml-1',
                down: 'fa-chevron-down ml-1',
                is: 'fa-sort ml-1',
            }
        };
        var options = this.options ? Object.assign(this.options, defaultOptions) : defaultOptions;

        return {
            settings: options,
            modal: {}
        }
    },
    methods: {
        showModal: function showModal(button, id) {
            if (button.modal) {
                this.modal = {
                    variant: button.variant,
                    title: button.modal.title,
                    text: button.modal.text,
                    id: id,
                    form: {
                        method: button.modal.method,
                        url: button.modal.url.replace(':id', id)
                    },
                    accept: button.modal.accept ? button.modal.accept : "Accept",
                    cancel: button.modal.cancel ? button.modal.cancel : "Cancel"
                };
                this.$refs.modal.show();
            }
        },
        cancel: function cancel() {
            this.$refs.modal.hide();
        },
        accept: function accept() {
            var this$1 = this;

            axios({
                method: this.modal.form.method,
                url: this.modal.form.url,
            }).then(function () {
                var index = this$1.data.findIndex(function (row) { return row.id == this$1.modal.id; });
                this$1.data.splice(index, 1);
            }).catch(function (err) {
                console.error(err);
            });
            this.$refs.modal.hide();
        }
    }
}

/* script */
            var __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "dynamic-tables" },
    [
      _vm.breadcrumbs.length
        ? _c(
            "b-breadcrumb",
            _vm._l(_vm.breadcrumbs, function(breadcrumb) {
              return _c("b-breadcrumb-item", { key: breadcrumb.text }, [
                _c("a", { attrs: { href: breadcrumb.url } }, [
                  _c("i", { class: breadcrumb.icon }),
                  _vm._v(
                    _vm._s(breadcrumb.icon ? " " : "") +
                      _vm._s(breadcrumb.text) +
                      "\n            "
                  )
                ])
              ])
            }),
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c("h2", { staticClass: "page-title" }, [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c(
        "b-card",
        {
          class: { "no-card": _vm.hasCard },
          attrs: {
            title: _vm.subtitle,
            collapse: "",
            close: "",
            customHeader: ""
          }
        },
        [
          _c(
            "b-button-group",
            { staticClass: "pull-right float-right" },
            _vm._l(_vm.toolbar, function(button) {
              return _c(
                "b-button",
                {
                  key: button.text,
                  staticClass:
                    "btn-rounded-f width-100 mb-xs mr-xs btn-rounded",
                  attrs: { variant: button.variant, href: button.url },
                  on: { click: button.tap }
                },
                [
                  button.icon ? _c("i", { class: button.icon }) : _vm._e(),
                  _vm._v(
                    _vm._s(button.icon ? " " : "") +
                      _vm._s(button.text) +
                      "\n            "
                  )
                ]
              )
            }),
            1
          ),
          _vm._v(" "),
          _c("v-client-table", {
            attrs: {
              data: _vm.data,
              columns: _vm.columns,
              options: _vm.settings
            },
            scopedSlots: _vm._u([
              {
                key: _vm.actionsColumn,
                fn: function(props) {
                  return _c(
                    "div",
                    {},
                    [
                      _vm.buttons.length == 0
                        ? _vm._t("buttons", null, {
                            row: props.row,
                            id: props.row.id,
                            index: props.index
                          })
                        : _c(
                            "b-button-group",
                            { staticClass: "m-auto", attrs: { size: "sm" } },
                            _vm._l(_vm.buttons, function(button) {
                              return button.visible == null ||
                                button.visible(props.row)
                                ? _c(
                                    "b-button",
                                    {
                                      directives: [
                                        {
                                          name: "b-modal",
                                          rawName: "v-b-modal",
                                          value: button.name,
                                          expression: "button.name"
                                        }
                                      ],
                                      key: button.text,
                                      staticClass:
                                        "btn-rounded-f pull-right btn-rounded",
                                      attrs: {
                                        variant: button.variant,
                                        href: button.url
                                          ? button.url.replace(
                                              ":id",
                                              props.row.id
                                            )
                                          : null
                                      },
                                      on: {
                                        click: function($event) {
                                          _vm.showModal(button, props.row.id);
                                        }
                                      }
                                    },
                                    [_c("i", { class: button.icon })]
                                  )
                                : _vm._e()
                            }),
                            1
                          )
                    ],
                    2
                  )
                }
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "b-modal",
            {
              ref: "modal",
              attrs: {
                id: _vm.modal.name,
                variant: _vm.modal.variant,
                "header-text-variant": _vm.modal.variant,
                title: _vm.modal.title,
                "body-class": "bg-white"
              }
            },
            [
              _vm._v(
                "\n            " + _vm._s(_vm.modal.text) + "\n            "
              ),
              _c(
                "div",
                {
                  staticClass: "w-100",
                  attrs: { slot: "modal-footer" },
                  slot: "modal-footer"
                },
                [
                  _c(
                    "b-btn",
                    {
                      staticClass: "float-right",
                      attrs: { variant: _vm.modal.variant },
                      on: {
                        click: function($event) {
                          _vm.accept();
                        }
                      }
                    },
                    [_vm._v(_vm._s(this.modal.accept) + "\n                ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-btn",
                    {
                      staticClass: "float-right mr-1",
                      on: {
                        click: function($event) {
                          _vm.cancel();
                        }
                      }
                    },
                    [_vm._v(_vm._s(this.modal.cancel))]
                  )
                ],
                1
              )
            ]
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-6c3615a0_0", { source: ".no-card[data-v-6c3615a0] {\n  border: 0;\n  background-color: transparent;\n}\n\n/*# sourceMappingURL=Index.vue.map */", map: {"version":3,"sources":["/home/guss/Code/Vue/vue-index-table/src/Index.vue","Index.vue"],"names":[],"mappings":"AAgIA;EACA,UAAA;EACA,8BAAA;CACA;;AC/HA,qCAAqC","file":"Index.vue","sourcesContent":[null,".no-card {\n  border: 0;\n  background-color: transparent; }\n\n/*# sourceMappingURL=Index.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-6c3615a0";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/home/guss/Code/Vue/vue-index-table/src/Index.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Index = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  )

/* eslint-disable */

function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('IndexTable', Index);
}

var plugin = {
    install: install,
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default Index;
export { install };
