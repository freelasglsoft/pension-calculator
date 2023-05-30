<template>
  <v-text-field
    ref="inputRef"
    :label="label"
    v-model="formattedValue"
    hide-details
    variant="underlined"
  />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { computed, watch } from "vue";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: Number,
    label: String
  },
  setup(props) {
    const {
      inputRef,
      formattedValue,
      numberValue,
      setValue,
    } = useCurrencyInput({ currency: 'BRL' });

    const errorMessage = computed(() =>
      numberValue.value <= 100 ? "Value must be greater than 100" : undefined
    );

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    return { inputRef, formattedValue, errorMessage };
  },
};
</script>
