import { NuxtApp } from "#app";
import { Emitter } from "mitt";
import { IWorkspace } from "./models";

export type ApplicationEvents = {
  "workspace:open": IWorkspace | undefined;
  "prompt:use": string | undefined;
};

export type IMitt = Emitter<ApplicationEvents>;

export type NuxtAppWithEvent = {
  $event?: IMitt["emit"];
  $listen?: IMitt["on"];
} & NuxtApp;

export type Steps = {
  headline: string;
  description: string;
  completed: boolean;
  action: Function;
};
