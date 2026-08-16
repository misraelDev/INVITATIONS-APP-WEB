# Comandos del proyecto

## Requisitos

- Node.js 20 o superior
- PowerShell

## Inicio rápido

Abre PowerShell en la raíz del proyecto y copia y pega todo este bloque:

```powershell
npm install --global pnpm@10
pnpm install
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

Para detener el servidor, presiona `Ctrl + C`.

`npm install --global pnpm@10` instala pnpm en la carpeta de usuario y evita el
error de permisos que puede producir `corepack enable` en Windows. Solo es
necesario ejecutarlo la primera vez.

## Comandos individuales

### Instalar pnpm

Si el comando `pnpm` no existe:

```powershell
npm install --global pnpm@10
pnpm --version
```

### Instalar dependencias

Desde la raíz del proyecto:

```powershell
pnpm install
```

### Iniciar en desarrollo

```powershell
pnpm dev
```

## Compilar para producción

```powershell
pnpm build
```

## Iniciar la compilación de producción

Ejecuta primero `pnpm build` y después:

```powershell
pnpm start
```

## Validar el código

```powershell
pnpm lint
pnpm exec tsc --noEmit
```
