'use client';

import React, { useState } from 'react';
import { KanbanBoardProvider } from '@core/hooks/use-kanban-board';
import KanbanForm from './kanban-form';
import TaskDetailsModal from './task-details-modal';

// Force a reload of the main component when a task is created/updated
let updateSignal = 0;
let forceUpdateCallback: (() => void) | null = null;

export function registerForceUpdate(callback: () => void) {
  forceUpdateCallback = callback;
}

// Helper to trigger update
export function triggerBoardUpdate() {
  if (forceUpdateCallback) {
    forceUpdateCallback();
  }
}

// Wrapped KanbanForm component with provider for modals
export function KanbanFormModal(props: any) {
  return (
    <KanbanBoardProvider>
      <KanbanForm {...props} onComplete={() => triggerBoardUpdate()} />
    </KanbanBoardProvider>
  );
}

// Wrapped TaskDetailsModal component with provider for modals
export function TaskDetailsModalWrapped(props: any) {
  return (
    <KanbanBoardProvider>
      <TaskDetailsModal {...props} />
    </KanbanBoardProvider>
  );
}
