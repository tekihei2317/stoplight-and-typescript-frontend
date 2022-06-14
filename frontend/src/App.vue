<script setup lang="ts">
import axios from "axios";
import { reactive } from "vue";
import { GetTasksTaskId200Response, PutTasksTaskIdRequest } from "./api";
import { RequestToForm } from "./utils/form";

const taskId = 1;
const endpoint = `http://localhost:3100/tasks/${taskId}`;

type EditTaskForm = RequestToForm<PutTasksTaskIdRequest>;

const editForm = reactive<EditTaskForm>({
  name: null,
  description: null,
  status_id: null,
});

axios.get<GetTasksTaskId200Response>(endpoint).then((response) => {
  editForm.name = response.data.name;
  editForm.description = response.data.description;
  editForm.status_id = response.data.status_id;
});

const onSubmit = () => {
  axios.put(endpoint, editForm).then(() => {
    alert("タスクを更新しました");
  });
};
</script>

<template>
  <div>
    {{ editForm }}
    <h2>タスク編集</h2>
    <form
      style="display: flex; flex-direction: column"
      @submit.prevent="onSubmit"
    >
      <label>
        <span style="width: 80px; display: inline-block">タスク名</span>
        <input v-model="editForm.name" />
      </label>
      <label>
        <span style="width: 80px; display: inline-block">詳細</span>
        <input v-model="editForm.description" />
      </label>
      <label>
        <span style="width: 80px; display: inline-block">ステータス</span>
        <select v-model.number="editForm.status_id">
          <option value="1">OPEN</option>
          <option value="2">PENDING</option>
          <option value="3">IN PROGRESS</option>
          <option value="4">DONE</option>
        </select>
      </label>
      <div style="margin-top: 16px">
        <button>更新する</button>
      </div>
    </form>
  </div>
</template>

<style></style>
