# Weather App TS

Weather App TS es una aplicación para consultar los datos climáticos de cualquier ciudad del mundo. Permite visualizar el pronóstico actual, diario y horario, y ofrece opciones de personalización como el cambio de unidades de temperatura y el idioma de la interfaz.

## Características

- Consulta el clima actual, pronóstico diario y horario de cualquier ciudad.
- Cambia entre grados Celsius (°C) y Fahrenheit (°F).
- Interfaz multilenguaje: español e inglés.
- Todos los componentes y la interfaz de usuario han sido construidos a mano, sin frameworks de UI externos.
- Búsqueda de ciudades con autocompletado.
- Soporte para geolocalización.

## Instalación

1. Clona el repositorio:

   ````bash
   git clone https://github.com/tu-usuario/weather-app-ts.git
   cd weather-app-ts```

   ````

2. Instala las dependencias:

   ````bash
   npm install```

   ````

3. Configurar las variables de entorno:
   - Copia el archivo .env.example a .env y agrega tus claves de API.
4. Ejecuta la aplicación:
   ````bash
   npm start```
   ````

## Uso

1. Busca una ciudad en el campo de búsqueda para ver su clima.
2. Cambia entre grados Celsius y Fahrenheit en la configuración.
3. Selecciona el idioma en la configuración.

## Tecnologías utilizadas

- React + TypeScript
- Zustand para gestión de estado
- React Query para manejo de datos remotos
- TailwindCSS para estilos
- i18next para internacionalización
- API de OpenWeatherMap y WeatherAPI
