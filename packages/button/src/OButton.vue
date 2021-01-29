<script lang="ts">
import { defineComponent, PropType } from "vue";

type Variant = "default" | "outlined" | "text";
type Color = "primary" | "secondary";
type Size = "extra-small" | "small" | "medium" | "large" | "extra-large";

export default defineComponent({
  props: {
    color: {
      type: String as PropType<Color>,
      default: "primary",
    },
    variant: {
      type: String as PropType<Variant>,
      default: "default",
    },
    size: {
      type: String as PropType<Size>,
      default: "large",
    },
  },

  setup(props) {
    return {
      styleVars: {
        "--current-font-color": "white",
        "--current-background-color": "#3366FF",
      },
      classes: {
        button: true,
        [`button--variant-${props.variant}`]: true,
        [`button--size-${props.size}`]: true,
      },
    };
  },
});
</script>

<template>
  <button :class="classes" :style="styleVars">
    <slot />
  </button>
</template>

<style scoped>
.button {
  background-color: var(--current-background-color);
  border: none;
  border-radius: 4px;
  color: var(--current-font-color);
  display: inline-flex;
  transition: 0.3s all ease;
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 0.375rem rgba(143, 155, 179, 0.16);
  /* 0 0 0 0.375rem rgba(143, 155, 179, 0.16) */
}

.button--size-extra-small {
  font-size: 0.625rem;
  padding: 0.375em 0.875em;
}

.button--size-small {
  font-size: 0.75rem;
  padding: 0.5em 0.875em;
}

.button--size-medium {
  font-size: 0.875rem;
  padding: 0.75em 0.875em;
}

.button--size-large {
  font-size: 1rem;
  padding: 0.875em;
}

.button--size-extra-large {
  font-size: 1.125rem;
  padding: 1em 0.875rem;
}

.button--variant-outlined {
  background-color: var(--current-background-color);
}

.button--variant-text {
  background-color: transparent;
}
</style>
