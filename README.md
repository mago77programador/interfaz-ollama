# Interfaz Ollama para interactuar con modelos instalados en local

Interfaz web simple para interactuar con los modelos disponibles localmente a través de la api de Ollama.

## Requisitos Previos

- Ollama instalado y ejecutándose
- Algún modelo disponible en la web de ollama descargado (https://ollama.com/models)
- Navegador web moderno

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/mago77programador/interfaz-ollama.git
   ```

2. Navegar al directorio del proyecto:
   ```bash
   cd interfaz-ollama
   ```

3. Asegurarse de que Ollama está ejecutándose:  

#### Windows
Puedes utilizar el comando `tasklist` para buscar procesos en ejecución. Abre el Símbolo del sistema (CMD) y ejecuta:
```cmd
tasklist | findstr /I "ollama"
```
Este comando buscará cualquier proceso que contenga "ollama" en su nombre.

#### Linux
En Linux, puedes usar el comando `ps` combinado con `grep` para buscar procesos. Abre la terminal y ejecuta:
```sh
ps aux | grep -i "ollama"
```
Esto listará los procesos que contienen "ollama".

#### macOS
En macOS, el proceso es similar al de Linux. Abre la Terminal y ejecuta:
```sh
ps aux | grep -i "ollama"
```
Esto también te mostrará los procesos que contienen "ollama".

Estos comandos te permitirán verificar si Ollama está en ejecución directamente desde la consola.

4. Abrir `index.html` en el navegador.

## Uso
1. Seleccionar el modelo a emplear en el selector de modelos.
2. Escribir el prompt en el área de texto.
3. Hacer clic en "Submit".
4. Ver la respuesta generada:
   - La sección "Reasoning" mostrará el contenido entre las etiquetas `<think>` y `</think>` en el caso de que utilices un modelo razonador de DeepSeek (por ejemplo deepseek-r1:8b).
   - La sección "Response" mostrará la respuesta generada por el modelo.

## Estructura del Proyecto

- index.html: Contiene la estructura HTML de la interfaz.
- style.css: Contiene los estilos CSS para la interfaz.
- script.js: Contiene la lógica JavaScript para interactuar con la API de Ollama.
- README.md: Este archivo, contiene la documentación del proyecto.

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- API Ollama

## Notas

- Debes seleccionar un modelo y asegurarte que lo tienes instalado previamente.
- La aplicación se comunica con la API de OLLama en `http://localhost:11434`.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.