# Gestión de Tareas Seek

Aplicación de gestión de tareas construida con Next.js.

## Empezando

Sigue estas instrucciones para configurar y ejecutar el proyecto en tu máquina local.

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu sistema.

### Instalación

1. Instala las dependencias del proyecto ejecutando:

```bash
npm install
# o
yarn install
# o
pnpm install
```

### Configuración de Variables de Entorno

Para que la autenticación funcione correctamente, debes configurar las variables de entorno.

1. Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `package.json`).
2. Copia y pega el siguiente contenido dentro del archivo `.env`:

```env
NEXTAUTH_SECRET=secret
NEXTAUTH_URL=http://localhost:3000
```

> **Nota:** `NEXTAUTH_SECRET` se utiliza para firmar los tokens de sesión.

### Ejecutar el Servidor de Desarrollo

Una vez completada la configuración, inicia el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Credenciales de Prueba

Para acceder a la aplicación, utiliza las siguientes credenciales:

- **Usuario:** `admin`
- **Contraseña:** `123456`

## Tecnologías Principales

- [Next.js](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [NextAuth.js](https://next-auth.js.org/) - Autenticación
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [Shadcn UI](https://ui.shadcn.com/) - Componentes de UI
- [Zustand](https://zustand.docs.pmnd.rs/) - Gestión de estado
- [React Hook Form](https://react-hook-form.com/) - Manejo de formularios
- [Zod](https://zod.dev/) - Validación de esquemas
