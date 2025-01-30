<template>
  <div class="block-editor">
    <div class="input-section">
      <label>{{ block.name || 'Unnamed Block' }}</label>
      
      <!-- Renderizar input según el tipo seleccionado -->
      <div v-if="block.type === 'string'">
        <input v-model="block.value" placeholder="Text" />
      </div>

      <div v-if="block.type === 'number'">
        <input 
          type="text" 
          v-model="block.value" 
          @input="validateNumber" 
          placeholder="Number" 
        />
      </div>

      <div v-if="block.type === 'date'">
        <input type="date" v-model="block.value" />
      </div>

      <div v-if="block.type === 'tel'">
        <input 
          type="text" 
          v-model="block.value" 
          @input="validateTelephone" 
          placeholder="Telephone" 
        />
      </div>

      <!-- Renderización de arrays anidados -->
      <div v-if="block.type === 'array'">
        <button @click="addArrayItem">Add to Array</button>
        <div v-for="(item, itemIndex) in block.value" :key="itemIndex" class="array-item">
          <label>Array Item {{ itemIndex + 1 }}:</label>
          <!-- Renderizar cada item como un bloque anidado -->
          <BlockEditor :block="item" @remove="removeArrayItem(itemIndex)" />
        </div>
      </div>

      <!-- Renderización de objetos anidados -->
      <div v-if="block.type === 'object'">
        <button @click="addObjectItem">Add to Object</button>
        <div v-for="(key, keyValue) in block.value" :key="key" class="object-item">
          <label>{{ key }}:</label>
          <!-- Renderizar cada key/value como un bloque anidado -->
          <BlockEditor :block="keyValue" @remove="removeObjectItem(key)" />
        </div>
      </div>
    </div>

    <div class="action-section">
      <button @click="removeBlock">Delete Block</button>
      <div class="type-buttons">
        <label>Type:</label>
        <select v-model="block.type" @change="setType">
          <option value="null">None</option>
          <option value="string">Text</option>
          <option value="number">Number</option>
          <option value="array">Array</option>
          <option value="object">Object</option>
          <option value="date">Date</option>
          <option value="tel">Phone</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  block: Object
});

const emit = defineEmits(['remove']);

// Función para eliminar el bloque actual
const removeBlock = () => {
  emit('remove');
};

// Función para cambiar el tipo del bloque
const setType = () => {
  if (props.block.type === 'array') {
    props.block.value = [];
  } else if (props.block.type === 'object') {
    props.block.value = {};
  } else if (props.block.type === 'number' || props.block.type === 'tel' || props.block.type === 'date') {
    props.block.value = '';
  } else if (props.block.type === 'null') {
    props.block.value = null;
  } else {
    props.block.value = '';
  }
};

// Función para añadir un item a un array
const addArrayItem = () => {
  props.block.value.push(createNewBlock());
};

// Función para eliminar un item de un array
const removeArrayItem = (itemIndex) => {
  props.block.value.splice(itemIndex, 1);
};

// Función para añadir un item a un objeto
const addObjectItem = () => {
  props.block.value[`newKey${Date.now()}`] = createNewBlock();
};

// Función para eliminar un item de un objeto
const removeObjectItem = (key) => {
  delete props.block.value[key];
};

// Función para crear un nuevo bloque vacío
const createNewBlock = () => ({
  name: '',
  type: null,
  value: null,
});

// Validar números permitiendo signos + y -
const validateNumber = (event) => {
  props.block.value = event.target.value.replace(/[^0-9.+-]/g, '');
};

// Validar teléfono con formato de número internacional
const validateTelephone = () => {
  props.block.value = props.block.value.replace(/[^0-9+()-\s]/g, '');
};
</script>