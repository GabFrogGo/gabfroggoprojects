<template>
  <div class="makebody">
    <h1>Editor de Bloques</h1>
    <button @click="addBlock">Añadir Bloque</button>

    <!-- Recorremos los bloques existentes -->
    <div v-for="(block, blockIndex) in blocks" :key="blockIndex" class="blockcontainer">
      <div>
        <input v-model="block.name" placeholder="Nombre del Bloque" />
      </div>

      <!-- Recorremos los objetos dentro de cada bloque -->
      <fieldset v-for="(obj, objIndex) in block.objects" :key="objIndex" class="objectcontainer">
        <legend>{{ block.name }} {{ obj.index }}</legend>

        <div class="ocdesign">
          <div class="ocinteractive">
            <div>
              <button @click="deleteObjectByKey(blockIndex, obj)">
                Eliminar Objeto por Clave
              </button>
            </div>

            <!-- Ahora accedemos correctamente a 'entries' dentro de cada objeto -->
            <div v-for="(entry, entryIndex) in obj.entries" :key="entryIndex" class="entrycontainer">
              <div class="inputcontainer">
                <div>
                  <input v-model="entry.key" placeholder="Clave" />
                </div>

                <!-- Tipos de entradas, dependiendo del tipo seleccionado -->
                <div v-if="entry.type === 'string'">
                  <input v-model="entry.value" placeholder="Texto" />
                </div>

                <div v-if="entry.type === 'number'">
                  <input
                    type="text"
                    v-model="entry.value"
                    @input="validateNumber($event, blockIndex, objIndex, entryIndex)"
                    placeholder="Número"
                  />
                </div>

                <div v-if="entry.type === 'date'">
                  <input type="date" v-model="entry.value" />
                </div>

                <div v-if="entry.type === 'tel'">
                  <input
                    type="text"
                    v-model="entry.value"
                    @input="validateTelephone(blockIndex, objIndex, entryIndex)"
                    placeholder="Teléfono"
                  />
                </div>
              </div>

              <div class="blockoptions">
                <!-- Eliminar entrada por clave dinámica -->
                <button @click="deleteEntryByKey(blockIndex, objIndex, entry.key)">
                  Eliminar Entrada por Clave
                </button>

                <!-- Selector de tipo de entrada -->
                <div class="type-buttons">
                  <label>Tipo:</label>
                  <select
                    @change="setType(blockIndex, objIndex, entryIndex, $event.target.value)"
                    v-model="entry.type"
                  >
                    <option value="string">Texto</option>
                    <option value="number">Número</option>
                    <option value="date">Fecha</option>
                    <option value="tel">Teléfono</option>
                  </select>
                </div>
              </div>
            </div>
            <button @click="addEntry(blockIndex, objIndex)">Añadir Entrada</button>
          </div>

          <div class="ocvisual">
            <legend>QR de: {{ block.name }} {{ obj.index }}</legend>
            <!-- Generar QR solo para el objeto actual -->
            <vue-qrcode
              v-if="obj.qrVisible"
              :value="getObjectQRData(obj)"
              :options="{ width: 200 }"
              :color="{ dark: '#000000ff', light: '#ffffffff' }"
              tag="canvas"
              class="qr-canvas"
              type='image/png'
              error-correction-level="M"
            />
          </div>
        </div>
      </fieldset>

      <div class="blockoptions">
        <!-- Botón para generar QR solo para el bloque actual -->
        <button v-if="hasEntries(blockIndex)" @click="generateQRs(blockIndex)">Generate QR Codes</button>
        <button @click="addObject(blockIndex)">Añadir Objeto</button>
        <button @click="deleteBlock(blockIndex)">Eliminar Bloque</button>
        <button @click="downloadAllQRs">Descargar Todos</button>
      </div>
    </div>
  </div>
</template>

<script setup>

useHead({
    title: 'QList - Make',
    meta: [
        { name: 'description', content: 'Con "Make" puedes generar códigos QR tipo "JSON" de forma dinámica y sencilla' }
    ],
})

import { ref } from "vue";
import VueQrcode from "vue-qrcode";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// Ref para almacenar los bloques
const blocks = ref([]);

// Función para cambiar el tipo de una entrada
const setType = (blockIndex, objIndex, entryIndex, newType) => {
  blocks.value[blockIndex].objects[objIndex].entries[entryIndex].type = newType;
  blocks.value[blockIndex].objects[objIndex].entries[entryIndex].value = ""; // Reiniciar el valor cuando se cambia el tipo
};

// Función para añadir un bloque
const addBlock = () => {
  blocks.value.push({
    name: "",
    objects: [],
  });
};

// Generar códigos QR solo para el objeto específico dentro del bloque actual
const generateQRs = (blockIndex) => {
  const currentBlock = blocks.value[blockIndex];
  currentBlock.objects.forEach((obj) => {
    obj.qrVisible = true; // Mostrar el QR solo para este objeto
  });
};

// Obtener los datos para generar el QR del objeto
const getObjectQRData = (obj) => {
  let formattedObject = {};
  obj.entries.forEach(entry => {
    let parsedValue = entry.value;

    // Convertir a su tipo correspondiente
    if (entry.type === "number") {
      parsedValue = Number(entry.value); // Convertir a número
    } else if (entry.type === "boolean") {
      parsedValue = entry.value === "true"; // Convertir a booleano
    }

    formattedObject[entry.key] = parsedValue;
  });
  return JSON.stringify(formattedObject);
};

// Función para eliminar un bloque
const deleteBlock = (blockIndex) => {
  var pendingResult = window.confirm('¿Quieres eliminar este bloque?');
  if (pendingResult) {
    blocks.value.splice(blockIndex, 1);
  }
};

// Función para añadir un objeto a un bloque
const addObject = (blockIndex) => {
  const newObject = {
    index: blocks.value[blockIndex].objects.length + 1,
    entries: [],
    qrVisible: false, // Cada objeto tiene su propio estado de visibilidad del QR
  };
  blocks.value[blockIndex].objects.push(newObject);
};

// Función para eliminar un objeto específico
const deleteObjectByKey = (blockIndex, obj) => {
  var pendingResult = window.confirm('¿Quieres eliminar este objeto?');
  if (pendingResult) {
    const objectToDeleteIndex = blocks.value[blockIndex].objects.findIndex(
      (object) => object.index === obj.index
    );
    if (objectToDeleteIndex !== -1) {
      blocks.value[blockIndex].objects.splice(objectToDeleteIndex, 1);
    }

    // Reasignar los índices de los objetos restantes
    blocks.value[blockIndex].objects.forEach((object, index) => {
      object.index = index + 1;
    });
  }
};

// Función para añadir una entrada (clave-valor) a un objeto
const addEntry = (blockIndex, objIndex) => {
  blocks.value[blockIndex].objects[objIndex].entries.push({
    key: "",
    value: "",
    type: "string",
  });
};

// Función para eliminar una entrada específica por clave dentro de un objeto
const deleteEntryByKey = (blockIndex, objIndex, keyToDelete) => {
  var pendingResult = window.confirm('¿Quieres eliminar esta entrada?');
  if (pendingResult) {
    const entryIndex = blocks.value[blockIndex].objects[objIndex].entries.findIndex(
      (entry) => entry.key === entry.key
      // (entry) => entry.key === keyToDelete
    );
    if (entryIndex !== -1) {
      blocks.value[blockIndex].objects[objIndex].entries.splice(entryIndex, 1);
    }
  }
};

// Validación de números (solo permite dígitos)
const validateNumber = (event, blockIndex, objIndex, entryIndex) => {
  const value = event.target.value;
  const validNumber = value.replace(/[^0-9.+-]/g, ""); // Remover caracteres no numéricos
  blocks.value[blockIndex].objects[objIndex].entries[entryIndex].value = validNumber;
};

// Validación de teléfonos (solo permite números y guiones)
const validateTelephone = (blockIndex, objIndex, entryIndex) => {
  const value = blocks.value[blockIndex].objects[objIndex].entries[entryIndex].value;
  const validTel = value.replace(/[^0-9+()-\s]/g, ""); // Remover caracteres no numéricos y guiones
  blocks.value[blockIndex].objects[objIndex].entries[entryIndex].value = validTel;
};

const hasEntries = (blockIndex) => {
  return blocks.value[blockIndex].objects.some(obj => obj.entries.length > 0);
};

const downloadAllQRs = async () => {
  try {
    const zip = new JSZip();
    // Buscar todas las imágenes con la clase 'qr-canvas'
    const imgs = document.querySelectorAll('.qr-canvas');

    if (imgs.length === 0) {
      alert("¡No hay códigos QR!. Generalos primero.");
      return;
    }

    Array.from(imgs).forEach((img, index) => {
      // Verificamos que el src esté presente
      const imgData = img.src.split(",")[1]; // Obtenemos la data URL base64
      zip.file(`QR_${index + 1}.png`, imgData, { base64: true });
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "QList_Codes.zip");
  } catch (error) {
    console.error("Download error:", error);
    alert("Error al descargar los códigos QR");
  }
};
</script>

<style lang="css">
  @import url(../assets/css/make.css);
</style>