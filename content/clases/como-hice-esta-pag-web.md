---
title: ¿Cómo hice esta página web?
date: 2026-02-14
tema: desarrollo-web
---

**Importante:** El contenido que estás apunto de leer no fue creado con IA. Pero la página, sí. Además, estoy asumiendo que no tienes conocimientos de programación web, pero que al menos has usado algún lenguaje de programación.

En fin, todo feedback es bienvenido (aunque probablemente sea más bullying que nada jajaja).

## 1. Motivación
Hace algunos años que trabajo en informática, principalmente en analítica de datos y gestión de proyectos. Pero nunca había logrado desplegar una app web desde cero.

Dado que imparto clases, sabía que mi primera aplicación debía ser para docencia.

Tengo la creencia de que todo conocimiento que sirva a otros debe compartirse.

Este es mi intento de hacer eso.

## 2. Proceso
Trato de ser coherente con las clases que me toca impartir (Gestión de Proyectos, por ejemplo).

Es por esto que, como todo proyecto informático, es necesario seguir algún estándar / proceso estructurado.

Por lo tanto, el proceso seguido es el siguiente:

1. [Definición del problema](#3-definición-del-problema)
2. [Definición de la solución](#4-definición-de-la-solución)
3. [Desarrollo de la solución](#5-desarrollo-de-la-solución)
4. [Pruebas y despliegue en local](#6-pruebas-y-despliegue-en-local)
5. [Despliegue (con Vercel)](#7-despliegue-con-vercel)

## 3. Definición del problema

Problemas que me motivaron a crear esta app web:
- **Es posible mejorar la experiencia de usuario respecto de cómo administro actualmente la información de mis clases**: suelo manejar bastante información de mis asignaturas. Creo apuntes, comparto notas, busco links. Pero, creo que depender de compartir una carpeta en OneDrive tiene limitaciones para mi, tales como...
    - *Lo poco intuitivo de un sistema de archivos*: El usuario debe entrar en una carpeta y adivinar en qué carpeta está cada documento, por muy "auto-explicativos" que sean los nombres. En una web se puede generar una navegación más fluida.
    - *Gestionar permisos (una lata, y me puedo equivocar)*. En una web tengo control absoluto y debo pensar qué ve cada usuario (lo que me obliga a ser ordenado).
- **Contenido interactivo**: en una carpeta compartida o apuntes impresos no es factible complementar con video o audio. Hasta se puede agregar cuestionarios.
- **Motivación personal**: Nunca había hecho una app web, por lo que debía hacer una sobre algo que me llamase la atención (docencia).


## 4. Definición de la solución

Dado el problema, la solución definida fue crear una app web que permita navegar por asignatura (en esta app, llamadas "temas") apuntes y material que haya generado. 

Los requisitos son:
- El sistema debe permitir la creación de temas.
- El sistema debe permitir la creación y actualización de los apuntes.
- Los apuntes deben ser editables con Markdown.
- El hosting de la solución debe ser gratuito.
- Para este proyecto, se debe usar Next.js, Tailwind CSS y React.

El último requisito hace referencia a 3 tecnologías. Estas fueron escogidas por:

1. Next.js: es el framework más común que se utiliza en vibe-coding. Entiendo que esto es así dado que tiene una sistema de rutas muy intuitivo. En Next.js, si creas una carpeta llamada ```/clases```, automáticamente se crea la URL ```tu-sitio.com/clases```. Es una estructura visual e intuitiva que las personas y la IA pueden entender fácilmente. 
2. Tailwind CSS: También presenta beneficios a la hora de usar IA. Tailwind usa "clases de utilidad". En lugar de archivos separados, escribes el estilo directamente en el componente (ej. ```<div className="bg-blue-500 shadow-md p-4">```). Cuando le pides a Cursor "haz que esta tarjeta sea azul y tenga sombra", la IA no tiene que navegar entre múltiples archivos para ver dónde está el CSS. Lo cambia ahí mismo en la misma línea.
3. React: es la tecnología web más popular de la última década (lea: [Uso de React](https://www.weblineindia.com/es/blog/reactjs-web-development-for-modern-websites/)), esto implica que la IA fue entrenada viendo mucho código de esta librería.

## 5. Desarrollo de la solución

### 5.1. Preparación del ambiente

Para partir: definir en que OS trabajar y con qué IDE.

Trabajo en Windows, por lo que me siento cómodo con las apps de Windows. Sin embargo, más del 90% de los servidores en la nube funcionan con Linux ([Linux y su adopción](https://techolivops.com/linux-y-tecnologia-el-sistema-operativo-que-revoluciono-la-informatica/)), por lo que programar en este sistema aumenta las probabilidades que tu código funcionará en local exactamente igual que cuando lo subas a la web.

Dado lo anterior, me quedé con lo mejor de los 2 mundos, programar en Linux desde mi computador con Windows. Esto se resuelve con Windows Subsystem for Linux (WSL). 

*Importante: los siguientes pasos toman en cuenta que tu usuario es Administrador el PC, en otro caso no funcionará* 

#### 5.1.1. Instalar WSL y Ubuntu

1. **Abrir PowerShell como Administrador:** En el menú Inicio de Windows, escribe "PowerShell", haz clic derecho sobre el resultado y selecciona "Ejecutar como administrador".
2. **Ejecuta el comando para instalar:** 
    ```powershell
    wsl --install

    ```
3. **Configura tu usuario de Linux:** se abrirá una ventana de terminal de Ubuntu (si no se abre, búscala en el menú Inicio como "Ubuntu"). Te pedirá que crees un nombre de usuario y una password.


#### 5.1.2. Instalar Cursor (u otro AI-Native IDE de tu preferencia)

1. **Descarga el IDE:** Ve a la página ([Cursor | Download](https://cursor.com/download)) y descarga el instalador para Windows.
2. **Configura Cursor con tu usuario y contraseña**. La app que estás viendo la hice con la suscripción Pro, de $20USD/mes. *Sobre los modelos usados*: La app es simple, por lo que utilicé principalmente Composer 1.5 (modelo propietario de Cursor), pero para un cambio complejo utilicé Opus 4.6 de Claude. Me conviene utilizar principalmente el modelo Composer 1.5 ya que es más económico y evito llegar al límite en el uso de agentes.
2. **Abre Cursor y ve a Extensiones:** En la barra lateral izquierda, verás un ícono de unos cuadrados.
3. **Instala la extensión "WSL":** En el buscador de extensiones, escribe **WSL**. Busca la que está publicada por **Microsoft** y haz clic en "Instalar".

#### 5.1.3. Crear carpeta de proyecto

Aquí empecé a utilizar Linux. Lo primero es ingresar a la terminal.

1. **Abre la terminal de Ubuntu**: desde el menú Inicio de Windows busca "Ubuntu". Abre la aplicación
2. **Crea una carpeta para el proyecto:** Escribe lo siguiente y presiona *Enter*:
    ```bash
    mkdir proyecto
    ```

3. **Entra a esa carpeta:**
    ```bash
    cd mis-proyectos
    ```

4. **Abre Cursor desde Linux:** Escribe este comando (la palabra *code*, un espacio, y un punto):
    ```bash
    cursor .
    ```

Ahora, es necesario entender qué es NodeJS y npm

#### 5.1.4. Definición: ¿Qué es NodeJS, npm y package.json?

Node JS un entorno de ejecución de JavaScript. Es aquello que nos permite ejecutar JavaScript en nuestro computador, emulando el motor de Google Chrome (lea [Qué es NodeJS](https://www.mytaskpanel.com/node-js-y-express-js-el-stack-javascript-para-desarrollo-back-end-veloz/))

Por otra parte, Node JS cuenta con un gestor de paquetes llamado ```npm```, algo parecido a una App Store, que permite instalar librerías en tu proyecto.

Finalmente, se debe trabajar con un archivo llamado ```package.json```, este contiene los metadatos del proyecto (nombre, versión, etc.), las librerías que se necesitan (descargadas mediante npm) y comandos para compilar / probar la aplicación. Gracias a este archivo el LLM que estás utilizando puede "entender" cómo está construido el proyecto. 


#### 5.1.5. Crear estructura del proyecto (Next.js, utilizando NodeJS)

Cuando se instala NodeJS se instala npm también. En WSL no debe instalarse ya que vienen en el sistema.

Lo que se debe hacer es crear la estructura de proyecto con Next.js, lo que automáticamente generará a ```package.json``` con Next.js, React y descargará lo necesario con ```npm```.

El comando de terminal es el siguiente:

```bash
npx create-next-app@latest nombre-proyecto
```

Durante la ejecución el asistente suele preguntar opciones como:
- TypeScript → Responder: Sí
- ESLint → Responder: Sí
- Tailwind CSS → Responder: Sí
- App Router → Responder: Sí

### 5.2. Prompt y vibe-coding

Al tener nuestro ambiente configurado y nuestro IDE instalado ya es posible iniciar.

El proceso de vibe-coding que utilicé se muestra a continuación.

#### 5.2.1. Genera un prompt para que la IA te aconseje a realizar vibe-coding

En la capacitación que tomé, siempre establecen que el proceso de desarrollo debe ser de lo general a lo particular.

Esto significa que los primeros pasos son referentes a la estructura del proyecto, los frameworks y la manera de almacenar / consultar los datos.

El prompt que hice fue el siguiente:

```text
Considera que eres un desarrollador con 10 años de experiencia.

Describe la metodología que aplicarías para generar sitios web usando vibe coding, tomando como base next.js y utilizando Cursor para este fin.

La página web tiene por objetivo ser un blog para mostrar clases que he hecho en el tiempo sobre gestión de proyectos informáticos.

La idea es que el hosting del blog sea gratuito, por lo que recomienda plataformas para hacerlo (no tengo problema con compartir los derechos sobre las clases, por el minuto). 
```

Si bien, existen varios marcos mnemotécnicos de prompt engineering, en mi experiencia me ha ido bien con lo siguiente: 

1. Rol (cómo la IA debe actuar): desarrollador con experiencia.
2. Objetivo (qué debe hacer): describe la metodología que aplicarías para generar sitios web
3. Formato (cómo debe entregar el resultado): usando vibe coding, tomando como base next.js y utilizando Cursor para este fin.
4. Contexto (otros relevantes, tales como los requisitos del proyecto): La página web tiene por objetivo ser un blog para mostrar clases que he hecho en el tiempo sobre gestión de proyectos informáticos... hosting del blog gratuito... etc.

#### 5.2.2. Aplica el proceso que el LLM te recomienda.

En esta parte, te comparto el resultado del prompt. 

Se debe ejecutar los pasos utilizando el IDE (en mi caso, Cursor) utilizando modo Agente cuando sea necesario. ***Nota***: si quieres saber más del plan de implementación te recomiendo utilizar el modo "Plan" y revisar los pasos, tomando nota de qué hará el agente en la posterior implementación.

##### 5.2.2.1. Antes de empezar: Cómo usar el chat de Cursor

Ya habiendo abierto el IDE, a la derecha aparecerá el chat

![Chat de cursor](/desarrollo-web/como-hice-esta-pag-web/cursor-chat.png)

> Chat de Cursor, configurado como agente y usando Composer 1.5

Una vez abierto el chat, se debe pegar el prompt y ejecutar el proceso.

![Prompt en el chat de Cursor](/desarrollo-web/como-hice-esta-pag-web/cursor-chat-usage.png)

> Prompt en el chat de Cursor. Dando clic en el botón destacado, el agente comenzará a ejecutar el proceso.

**Importante**: cada paso que ejecute el agente podría requerir tu aprobación. Recomiendo configurar el agente como "Ask every time" o como "Use allowlist", y ***nunca*** como "Run Everything" (ejecutar todo sin preguntar), principalmente ya que para el aprendizaje es bueno ver qué hace el agente. Puedes configurar esto en Settings > Agent > Auto-Run

Al finalizar de aplicar el proceso, será necesario que des tu aprobación final a los cambios. Dado que esta aplicación está creada como hobby, entonces da clic en "Keep All".

Ahora sí... las respuestas del LLM.

---
##### 5.2.2.2. Intro

Como IA, no tengo años biológicos, pero tengo acceso a las mejores prácticas y arquitecturas que usan los desarrolladores senior hoy en día. Si adoptamos esa mentalidad pragmática y de "10 años de experiencia", te diré que la combinación de **Next.js + Cursor + Vibe Coding** es posiblemente la forma más rápida y moderna de levantar tu proyecto.

El "vibe coding" (escribir código interactuando en lenguaje natural con una IA y dejando que ella haga el trabajo pesado) es increíble, pero si no le das una buena estructura, tu código terminará siendo un desastre inMantenible (lo que los devs llamamos "código espagueti").

Aquí tienes la metodología profesional para aplicar *vibe coding* sin perder el control de tu arquitectura, ideal para tu blog de gestión de proyectos.


##### 5.2.2.3. Recomendación de Hosting Gratuito

Dado que no te importa que tu código sea público (lo cual es genial para aportar a la comunidad), tu mejor combinación es **GitHub + Vercel**.

* **GitHub:** Alojarás tu código fuente allí de forma pública y gratuita.
* **Vercel:** Es la empresa creadora de Next.js. Tienen un plan "Hobby" 100% gratuito de por vida para proyectos personales. Se conecta directamente a tu repositorio de GitHub: cada vez que guardes un cambio, Vercel actualizará tu página web automáticamente en segundos.


##### 5.2.2.4. Metodología de Vibe Coding con Cursor y Next.js

Para un blog de clases, no necesitas una base de datos compleja. Usaremos **Markdown (o MDX)** para que escribas tus clases como si fueran documentos de texto, y Next.js los convertirá en páginas web.

##### 5.2.2.5. Preparar las "Reglas del Juego" (`.cursorrules`)

El secreto de un buen *vibe coding* es el contexto. Antes de pedirle a Cursor que programe, debes decirle *cómo* programar.

* Crea un archivo llamado `.cursorrules` en la raíz de tu proyecto.
* Usa este archivo para decirle a la IA: "Usa Next.js 14/15 con App Router, Tailwind CSS para los estilos, y crea componentes funcionales limpios. El contenido del blog vendrá de archivos Markdown locales".
* *Nota: Al tener esto, la IA de Cursor no adivinará, seguirá tu estándar.*

##### 5.2.2.6. El Andamiaje (Setup Inicial)

Aunque uses *vibe coding*, el primer paso se hace en la terminal.

* Abre la terminal en Cursor (presionando `Ctrl + \` o `Ctrl + Ñ` dependiendo de tu teclado) y escribe:
`npx create-next-app@latest mi-blog-clases`
* Dile que sí a TypeScript, Tailwind y App Router.

##### 5.2.2.7. El Bucle de Vibe Coding (El método "Macro a Micro")

Aquí es donde ocurre la magia. Un dev experimentado no le pide a la IA "hazme un blog completo". Se lo pide por partes:

* **Paso A: Estructura de datos (Chat - `Ctrl + L`).**
Abre el chat de Cursor y dile: *"Quiero tener una carpeta `/content/clases` donde guardaré archivos .md. Crea una función de utilidad (utility function) en TypeScript que lea esta carpeta, extraiga el título, la fecha y el contenido de los archivos markdown usando el paquete `gray-matter`"*.
* **Paso B: Interfaz General (Generación en archivo - `Ctrl + K`).**
Ve a la página principal (`page.tsx`) y usa el atajo de generación en línea. Escribe: *"Crea una landing page profesional y minimalista que presente mi perfil como profesor de gestión de proyectos informáticos, y debajo muestra una grilla con las últimas clases cargadas leyendo la función de utilidad que creamos"*.
* **Paso C: La vista de la clase.**
Crea una ruta dinámica (ej. `/clases/[slug]/page.tsx`) y pídele a Cursor: *"Genera la vista de detalle de la clase. Toma el contenido Markdown, procésalo y muéstralo con buena tipografía para lectura larga. Agrega un botón de 'Volver'"*.

##### 5.2.2.8. Iteración por "Vibes" (Estilos y Ajustes)

Una vez que funciona, entras en modo *vibe*. En lugar de buscar cómo centrar un div en Tailwind, seleccionas el bloque de código en Cursor, presionas `Ctrl + K` y le dices:

* *"Haz que esta tarjeta se vea más moderna, añade un poco de sombra y haz que el título sea azul oscuro".*
* *"Cambia este diseño para que sea responsive y en móviles se vea en una sola columna".*

##### 5.2.2.9. Despliegue (Deploy)

1. Subes tu código a GitHub (Cursor tiene herramientas visuales para esto si no dominas los comandos de Git).
2. Entras a Vercel.com, inicias sesión con tu GitHub, seleccionas tu repositorio y le das a "Deploy". Tu blog estará vivo en internet.

---

##### 5.2.2.10. Tu Siguiente Paso


El éxito de esto depende de arrancar con un buen contexto para que Cursor no se equivoque.

¿Te gustaría que te redacte el contenido exacto del archivo **`.cursorrules`** y el **primer *prompt*** que debes pegarle a la IA para que te genere toda la base del blog en un solo movimiento?

## 6. Pruebas y despliegue en local

Un vez aplicado cada uno de los pasos en el chat de Cursor, es necesario probar la aplicación.

Para esto, se debe ejecutar el comando:

```bash
npm run dev
```

Esto iniciará la aplicación en modo desarrollo.

Es probable que la aplicación no opere como lo esperábamos. Al igual que en otros proyectos, es necesario revisar logs de error y ajustar el código.

Para esto podemos usar [Iteración por "Vibes"](#5-2-2-8-iteración-por-vibes-estilos-y-ajustes) para ajustar el código.

## 7. Despliegue (con Vercel)

Finalmente, una vez que la aplicación esté funcionando como lo esperábamos, es necesario desplegarla.

Lo primero es crear un repositorio en GitHub. Crear una cuenta es simple y se puede conectar el proyecto con Cursor de forma visual aquí:

![GitHub](/desarrollo-web/como-hice-esta-pag-web/github-repo.png)

Luego, da clic en "Initialize Repository". Esto solicitará que inicies sesión en GitHub.

### 7.1. ¿Qué es Git y GitHub?

Git es un sistema de control de versiones que permite a los desarrolladores rastrear cambios en su código a lo largo del tiempo. GitHub es una plataforma que permite alojar repositorios Git de forma remota, lo que permite a los desarrolladores colaborar en proyectos de forma sencilla.

### 7.2. Desplegar el proyecto a GitHub

De aquí en adelante, se puede usar el comando de terminal para subir el proyecto a GitHub:
```bash
git add . # Agrega todos los archivos al staging area
git commit -m "Primer commit" # Crea un commit con el mensaje "Primer commit"
git push origin main # Sube el commit a GitHub
```

### 7.3. ¿Qué es Vercel?

Vercel es una plataforma de hosting para proyectos web. Permite alojar proyectos de Next.js de forma sencilla y gratuita.

Además, es la empresa creadora de Next.js.

Vercel cuenta con un plan "Hobby", gratuito para proyectos personales.

### 7.4. Desplegar el proyecto a Vercel

Al igual que en el paso anterior, se debe crear una cuenta en Vercel y conectar el proyecto con GitHub. Vercel cuenta con un plan "Hobby", gratuito para proyectos personales.

- **Regístrate con GitHub**: Elige la opción "Continue with GitHub". Esto enlazará tu repositorio de código con tu cuenta de hosting automáticamente.

- **Crea el proyecto**: En tu panel principal de Vercel, haz clic en el botón negro "Add New..." y luego selecciona "Project".

- **Importa tu repositorio**: Vercel te mostrará una lista de tus repositorios de GitHub. Busca el que acabas de crear desde Cursor (ej. mi-blog-clases) y haz clic en el botón "Import".

- **Despliega (Deploy)**: Vercel analizará tu código y detectará automáticamente que es un proyecto de Next.js. La configuración por defecto es perfecta. Simplemente haz clic en el botón "Deploy".

Vercel se demora un par de minutos en compilar y desplegar. En esta etapa es posible que haya errores, pero Vercel cuenta con un Dashboard excelente, que permite identificar los problemas. Toma los logs y corrige el problema con tu LLM de preferencia.