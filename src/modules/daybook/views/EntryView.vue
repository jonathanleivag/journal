<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-5 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-5">{{ month }}</span>
        <span class="mx-2 fw-light">{{ yearDay }}</span>
      </div>
      <div>
        <input
          v-show="false"
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          accept="image/png, image/jpeg, image/jpg"
        />
        <button
          class="btn btn-danger mx-2"
          v-if="entry.id"
          @click="onDeleteEntry"
        >
          Borrar <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary" @click="onSelectImage">
          Subir foto <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿Qué sucedió hoy?"></textarea>
    </div>
    <Fab icon="fas fa-save" @on:click="saveEntry" />

    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />

    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
import Swal from "sweetalert2";
import uploadImage from "../helpers/uploadImage";

export default {
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    this.loadEntry();
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }

      this.entry = entry;
    },
    async saveEntry() {
      new Swal({
        title: "Espera por favor",
        allowOutsideClick: false,
      });

      Swal.showLoading();

      const picture = await uploadImage(this.file);

      this.entry.picture = picture;

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: "entry", params: { id } });
      }

      Swal.fire("Guardado...", "Entrada guardad con éxito", "success");
      this.file = null;
    },
    async onDeleteEntry() {
      const { isConfirmed } = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez borrado, no se puede recuperar",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });

      if (isConfirmed) {
        new Swal({
          title: "Espera por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });
        Swal.fire("Eliminado...", "", "success");
      }
    },
    onSelectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }
      this.file = file;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
    },
  },
  data() {
    return {
      entry: { text: "" },
      localImage: null,
      file: null,
    };
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style scoped lang="scss">
textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
