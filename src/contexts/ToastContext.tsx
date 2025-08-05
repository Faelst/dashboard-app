'use client';

import { ToastContainer, Slide, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const defaultToastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 3_000,
  draggable: true,
  pauseOnHover: true,
  hideProgressBar: false,
  closeOnClick: true,
  theme: 'dark', // <- matches dark UI
  transition: Slide,
};

export const ToastProvider = () => (
  <ToastContainer newestOnTop toastClassName="!rounded-xl !shadow-lg" {...defaultToastConfig} />
);

export const showError = (msg: string, opts?: ToastOptions) =>
  toast.error(msg, { ...defaultToastConfig, ...opts });

export const showSuccess = (msg: string, opts?: ToastOptions) =>
  toast.success(msg, { ...defaultToastConfig, ...opts });

export const showInfo = (msg: string, opts?: ToastOptions) =>
  toast.info(msg, { ...defaultToastConfig, ...opts });