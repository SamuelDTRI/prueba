# Proyecto de Gestión de Sucursales (Prueba Tecnica Desarrollador Front-End)

Esta es una aplicación web que permite gestionar y visualizar las sucursales de una empresa. El proyecto está diseñado como una solución práctica y moderna, con un enfoque en la funcionalidad y la experiencia del usuario.

---

## **¿Qué hace esta aplicación?**

1. **Vista Pública**:

   - Los usuarios pueden explorar una lista de sucursales, filtrarlas por país, departamento y ciudad, y buscar por palabras clave.
   - Incluye una página de información de la empresa.

2. **Inicio de Sesión**:

   - Los administradores pueden iniciar sesión para acceder a herramientas de gestión.

3. **Panel de Administración**:

   - Los administradores pueden **crear**, **editar**, **listar** y **eliminar** sucursales.
   - La autenticación protege las rutas de administración.

4. **Página 404**:
   - Un diseño moderno para manejar rutas inexistentes.

---

## **Estructura del proyecto**

src/
├── components/ # Componentes reutilizables como Navbar, Filters, Cards
├── views/ # Vistas principales (PublicView, LoginView, AdminView, NotFoundView)
├── redux/ # Configuración de Redux (store y slices)
├── services/ # Archivo para manejar las peticiones HTTP (Axios)
├── App.jsx # Configuración de rutas principales
├── index.css # Estilos globales con TailwindCSS

## **¿Cómo ejecutar este proyecto?**

### **1. Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

## **Instala dependencias**
npm install

## **Ejecuta el proyecto**
npm run dev

## *IMPORTANTE: Usa las credenciales correctas diseñadas para esta prueba, si no formas parte de el equipo de desarrollo o desconoces esta prueba abstenerse de intentar. muchas gracias.*

```
