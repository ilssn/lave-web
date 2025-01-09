import {
  VIDEO_AUDIO_OPTION,
  VIDEO_CAMERA_OPTION,
  VIDEO_LOOP_OPTION,
  VIDEO_MODEL_OPTION,
  VIDEO_STYLE_OPTION,
  VIDEO_TEMPLATE_OPTION,
  VIDEO_TIME_OPTION,
  VIDEO_TYPE_OPTION,
  VIDU_RESOLUTION_OPTION,
  VIDU_SCENE_OPTION,
  VIDU_STYLE_OPTION,
  VIDU_TIME_OPTION,
  VIDU_TYPE_OPTION,
} from "./options";

export type AuthFormProps = {
  id: number;
  name: string;
  label?: string;
  placeholder?: string;
  type: "input" | "checkbox";
  inputType?: "text" | "password";
  selectOptions?: { value: string; label: string; id: number }[];
};

export const SIGN_IN_FORM: AuthFormProps[] = [
  {
    id: 1,
    name: "code",
    type: "input",
    inputType: "password",
    placeholder: "auth:form.input_code",
    label: "",
  },
  {
    id: 2,
    name: "remember",
    type: "checkbox",
    label: "auth:form.remember_code",
  },
];

export type VideoFormProps = {
  id: number;
  name: string;
  label?: string;
  placeholder?: string;
  type: "select" | "input" | "textarea" | "checkbox" | "upload";
  inputType?: "text" | "email" | "password" | "number" | "checkbox";
  textareaRows?: number;
  selectOptions?: { value: string; label: string; id: number }[];
};

export const VIDEO_FORM: VideoFormProps[] = [
  {
    id: 1,
    name: "model",
    label: "v-gen:form.model.title",
    placeholder: "v-gen:form.model.desc",
    type: "select",
    selectOptions: VIDEO_MODEL_OPTION,
  },
  {
    id: 2,
    name: "prompt",
    label: "v-gen:form.prompt.title",
    placeholder: "v-gen:form.prompt.desc",
    type: "textarea",
    textareaRows: 3,
  },
  {
    id: 3,
    name: "firstFile",
    label: "v-gen:form.first_frame.title",
    placeholder: "v-gen:form.first_frame.desc",
    type: "upload",
  },
  {
    id: 4,
    name: "lastFile",
    label: "v-gen:form.last_frame.title",
    placeholder: "v-gen:form.last_frame.desc",
    type: "upload",
  },
  {
    id: 5,
    name: "thirdFile",
    label: "v-gen:form.third_frame.title",
    placeholder: "v-gen:form.third_frame.desc",
    type: "upload",
  },
  {
    id: 6,
    name: "type",
    label: "v-gen:form.type.title",
    placeholder: "v-gen:form.type.desc",
    type: "select",
    selectOptions: VIDEO_TYPE_OPTION,
  },
  {
    id: 7,
    name: "time",
    label: "v-gen:form.time.title",
    placeholder: "v-gen:form.time.desc",
    type: "select",
    selectOptions: VIDEO_TIME_OPTION,
  },
  {
    id: 8,
    name: "loop",
    label: "v-gen:form.loop.title",
    placeholder: "v-gen:form.loop.desc",
    type: "select",
    selectOptions: VIDEO_LOOP_OPTION,
  },
  {
    id: 9,
    name: "audio",
    label: "v-gen:form.audio.title",
    placeholder: "v-gen:form.audio.desc",
    type: "select",
    selectOptions: VIDEO_AUDIO_OPTION,
  },
  {
    id: 10,
    name: "camera",
    label: "v-gen:form.camera.title",
    placeholder: "v-gen:form.camera.desc",
    type: "select",
    selectOptions: VIDEO_CAMERA_OPTION,
  },
  {
    id: 11,
    name: "style",
    label: "v-gen:form.style.title",
    placeholder: "v-gen:form.style.desc",
    type: "select",
    selectOptions: VIDEO_STYLE_OPTION,
  },
  {
    id: 12,
    name: "template",
    label: "v-gen:form.template.title",
    placeholder: "v-gen:form.template.desc",
    type: "select",
    selectOptions: VIDEO_TEMPLATE_OPTION,
  },
  {
    id: 13,
    name: "viduType",
    label: "v-gen:form.vidu_type.title",
    placeholder: "v-gen:form.vidu_type.desc",
    type: "select",
    selectOptions: VIDU_TYPE_OPTION,
  },
  {
    id: 14,
    name: "viduStyle",
    label: "v-gen:form.vidu_style.title",
    placeholder: "v-gen:form.vidu_style.desc",
    type: "select",
    selectOptions: VIDU_STYLE_OPTION,
  },
  {
    id: 15,
    name: "viduTime",
    label: "v-gen:form.vidu_time.title",
    placeholder: "v-gen:form.vidu_time.desc",
    type: "select",
    selectOptions: VIDU_TIME_OPTION,
  },
  {
    id: 16,
    name: "viduResolution",
    label: "v-gen:form.vidu_resolution.title",
    placeholder: "v-gen:form.vidu_resolution.desc",
    type: "select",
    selectOptions: VIDU_RESOLUTION_OPTION,
  },
  {
    id: 17,
    name: "viduScene",
    label: "v-gen:form.vidu_scene.title",
    placeholder: "v-gen:form.vidu_scene.desc",
    type: "select",
    selectOptions: VIDU_SCENE_OPTION,
  },
];
