import {
  defineCustomElement as VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
} from 'vue';

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getNearestElementParent = (el: any) => {
  while (el?.nodeType !== 1 /* ELEMENT */) {
    el = el.parentElement;
  }
  return el;
};

export const defineCustomElement = (
  component: any,
  { plugins = [] as any[] } = {}
) =>
  VueDefineCustomElement({
    render: () => h(component),
    setup() {
      const app = createApp(component);

      plugins.forEach(app.use);

      app.mixin({
        mounted() {
          const insertStyles = (styles: any) => {
            if (styles?.length) {
              this.__style = document.createElement('style');
              this.__style.innerText = styles.join().replace(/\n/g, '');
              getNearestElementParent(this.$el).prepend(this.__style);
            }
          };

          insertStyles(this.$?.type.styles);
        },
        unmounted() {
          this.__style?.remove();
        },
      });

      const inst = getCurrentInstance();
      if (inst) {
        Object.assign(inst.appContext || {}, app._context);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Object.assign(inst.provides as any, app._context.provides);
      }
    },
  });
