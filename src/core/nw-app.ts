import { Application } from 'express';

export interface INwApp {
  start(port: number): void;
  stop(): void;
  getApp(): Application;
}
