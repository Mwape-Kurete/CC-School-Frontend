/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

//telling TypeScript how to handle .vue (this was causing errors for me)
//removing the implicitly has an 'any' type that I was getting
