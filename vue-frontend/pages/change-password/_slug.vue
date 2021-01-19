<template>
  <c-box max-w="400px" mx="auto" p="32px">
    <div class="heading">
      <c-heading as="h1" fontSize="48px" :text-align="'center'"
        >Reset password</c-heading
      >
    </div>
    <form>
      <c-form-control is-required my="8px">
        <c-form-label for="password">Password:</c-form-label>
        <c-input-group size="lg">
          <c-input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model="password"
            variant="filled"
            size="lg"
          />
          <c-input-right-element width="4.5rem" mr="8px">
            <c-button size="md" m="8" @click="showPassword = !showPassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </c-button>
          </c-input-right-element>
        </c-input-group>
      </c-form-control>
      <c-button
        @click="resetPassword"
        backgroundColor="indigo.300"
        color="white"
        my="16px"
        size="lg"
        variant="solid"
        width="100%"
        >Reset password</c-button
      >
    </form>
  </c-box>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
    }
  },
  mounted() {
    console.log(this.$route)
  },
}
</script>

<style></style>
