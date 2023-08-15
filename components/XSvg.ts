import { defineComponent, h } from "vue";

// Define an interface for the props
interface SvgProps {
  value: keyof typeof svg;
  class?: string;
}

const svg = {
  users: `
  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
  <path d="M68-160q-13 0-21.5-8.5T38-190v-64q0-35 18-63.5t50-42.5q73-32 131.5-46T358-420q62 
  0 120 14t131 46q32 14 50.5 42.5T678-254v64q0 13-8.5 21.5T648-160H68Zm648 0q10-2 
  16-10.5t6-21.5v-62q0-63-32-103.5T622-423q69 8 130 23.5t99 35.5q33 19 52 47t19 63v64q0
  13-8.5 21.5T892-160H716ZM358-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 
  108q0 66-42 108t-108 42Zm360-150q0 66-42 108t-108 42q-11 0-24.5-1.5T519-488q24-25 36.5-61.5T568-631q0-45-12.5-79.5T519-774q11-3 
  24.5-5t24.5-2q66 0 108 42t42 108ZM98-220h520v-34q0-16-9.5-31T585-306q-72-32-121-43t-106-11q-57 0-106.5 
  11T130-306q-14 6-23 21t-9 31v34Zm260-321q39 0 64.5-25.5T448-631q0-39-25.5-64.5T358-721q-39 0-64.5 
  25.5T268-631q0 39 25.5 64.5T358-541Zm0-90Zm0 271Z"/></svg>`,
  dashboard: `
  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M510-600v-210q0-12.75 8.625-21.375T540-840h270q12.75 0 21.375 8.625T840-810v210q0 12.75-8.625 21.375T810-570H540q-12.75 0-21.375-8.625T510-600ZM120-480v-330q0-12.75 8.625-21.375T150-840h270q12.75 0 21.375 8.625T450-810v330q0 12.75-8.625 21.375T420-450H150q-12.75 0-21.375-8.625T120-480Zm390 330v-330q0-12.75 8.625-21.375T540-510h270q12.75 0 21.375 8.625T840-480v330q0 12.75-8.625 21.375T810-120H540q-12.75 0-21.375-8.625T510-150Zm-390 0v-210q0-12.75 8.625-21.375T150-390h270q12.75 0 21.375 8.625T450-360v210q0 12.75-8.625 21.375T420-120H150q-12.75 0-21.375-8.625T120-150Zm60-360h210v-270H180v270Zm390 330h210v-270H570v270Zm0-450h210v-150H570v150ZM180-180h210v-150H180v150Zm210-330Zm180-120Zm0 180ZM390-330Z"/></svg>
  `,
};
export default defineComponent({
  props: {
    value: String as SvgProps["value"],
    class: String,
  },
  setup(props: SvgProps) {
    return () => {
      return h("div", {
        class: "inline-flex items-center justify-center " + props.class,
        innerHTML: svg[props.value].replace(/\s+/g, " "),
      });
    };
  },
});