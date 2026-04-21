# instalar a dependência do axios

npm install axios

# para desinstalar um pacote 

npm uninstall nome do pacote


instalando o tailwindcss 4.0


1º npm install tailwindcss @tailwindcss/vite

2º 

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})


3º no arquivo index.css que precisa estar importanod no main.jsx

@import "tailwindcss";

